import fs from 'fs'
import path from 'path'
import async from 'async'
import Promise from 'bluebird'
import archiver from 'archiver'
import { exec } from 'child_process'
const { COPYFILE_EXCL } = fs.constants

const move = (oldPath = '', newPath = '') => {
  fs.renameSync(oldPath, newPath)
  return newPath
}

const exist = filePath => fs.existsSync(filePath)

const extract = (filePath, unzipPath) => {
  return new Promise((resolve, reject) => {
    let cmd
    if (process.platform === 'win32') {
      // Work on powershell on windows
      cmd = `powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory('${filePath}', '${unzipPath}'); }"`
    } else {
      cmd = `unzip ${filePath} -d ${unzipPath}`
    }

    exec(cmd, { maxBuffer: 1000000 * 1024 }, (err, stdout, stderr) => {
      // console.log('stdout: ', stdout)
      // console.log('stderr: ', stderr)

      if (err) {
        // console.log(err)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const getContent = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        reject(err)
      }

      resolve(content)
    })
  })
}

const deleteFile = filePath => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, err => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    } else {
      resolve()
    }
  })
}

const deleteDirectory = (dir) => {
  return new Promise((resolve, reject) => {
    let cmd
    if (process.platform === 'win32') {
      // Work on windows
      cmd = `rmdir ${dir} /s /q`
    } else {
      cmd = `rm -rf ${dir}`
    }

    exec(cmd, { maxBuffer: 1000000 * 1024 }, (err, stdout, stderr) => {
      // console.log('stdout: ', stdout)
      // console.log('stderr: ', stderr)

      if (err) {
        // console.log(err)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const deleteDirectories = (dirs) => {
  return new Promise((resolve, reject) => {
    async.each(dirs, (dir, callback) => {
      deleteDirectory(dir)
        .then(done => {
          callback()
        })
        .catch(err => {
          callback(err)
        })
    }, err => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const copySync = (filePath, copyFilePath, replace = false) => {
  // COPYFILE_EXCL the operation will fail if copyFilePath exists
  return fs.copyFileSync(filePath, copyFilePath, replace ? 0 : COPYFILE_EXCL)
}

const copyAsync = (filePath, copyFilePath, replace = false) => {
  return new Promise((resolve, reject) => {
    fs.copyFile(filePath, copyFilePath, replace ? 0 : COPYFILE_EXCL, err => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

const ensureDirExists = directory => {
  return !directory
    .replace(process.cwd(), '')
    .split(/\\|\//)
    .reduce(({ fullPath, notEnsure }, part, index, paths) => {
      if (part) {
        fullPath = path.join(fullPath, part)
      }
      return {
        fullPath,
        notEnsure: !fs.existsSync(fullPath) && fs.mkdirSync(fullPath)
      }
    }, { fullPath: process.cwd(), notEnsure: false })
    .notEnsure
}

const zipFile = (destination = '', files = []) => {
  return new Promise((resolve, reject) => {
    // create a file to stream archive data to.
    let output = fs.createWriteStream(destination)
    let archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    })

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes')
      console.log('archiver has been finalized and the output file descriptor has closed.')
      return resolve({ path: destination, size: archive.pointer() })
    })

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', () => {
      console.log('End create zip: ', destination)
      console.log('Data has been drained')
    })

    output.on('finish', () => {
      console.log('Finish create zip: ', destination)
    })

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', err => {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        return reject(err)
      }
    })

    // good practice to catch this error explicitly
    archive.on('error', err => {
      return reject(err)
    })

    // pipe archive data to the file
    archive.pipe(output)

    // append a file from stream
    // let file1 = __dirname + '/file1.txt'
    // archive.append(fs.createReadStream(file1), { name: 'file1.txt' })

    // append a file from string
    // archive.append('string cheese!', { name: 'file2.txt' })

    // append a file from buffer
    // let buffer3 = Buffer.from('buff it!');
    // archive.append(buffer3, { name: 'file3.txt' })

    // append a file
    if (Array.isArray(files) && files.length) {
      try {
        for (let filePath of files) {
          if (exist(filePath)) {
            archive.file(filePath, { name: filePath.split(/\/|\\/).pop() })
          } else {
            return reject(new Error(`${filePath} not found.`))
          }
        }
      } catch (error) {
        return reject(error)
      }
    } else {
      return reject(new Error('List file empty, cannot make zip'))
    }

    // append files from a sub-directory and naming it `new-subdir` within the archive
    // archive.directory('subdir/', 'new-subdir')

    // append files from a sub-directory, putting its contents at the root of archive
    // archive.directory('subdir/', false)

    // append files from a glob pattern
    // archive.glob('subdir/*.txt')

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize()
  })
}

export default {
  move,
  exist,
  extract,
  copySync,
  copyAsync,
  getContent,
  delete: deleteFile,
  deleteFile,
  ensureDirExists,
  deleteDirectory,
  deleteDirectories,
  zipFile
}