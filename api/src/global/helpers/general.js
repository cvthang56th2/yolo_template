/*
 * Author: vu.vo@carbon8.com
 * Project: mazi
 * File: api/app/global/helpers/util-enum.js
 */
import _ from 'lodash'
import moment from 'moment'

const tempDay = () => moment().format('MMM-DD-YYYY')
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
const isArray = arr => Array.isArray(arr)
const isObject = obj => obj instanceof Object && !Array.isArray(obj)
const ensureArray = (arr, defaultValue) => isArray(arr) ? arr : isArray(defaultValue) ? defaultValue : []
const ensureObject = (obj, defaultValue) => isObject(obj) ? obj : isObject(defaultValue) ? defaultValue : {}
const upperFirstLetter = string => String(string).charAt(0).toUpperCase() + String(string).slice(1)

function formatDate(date, format, timeZone) {
    if (['boolean', 'undefined'].indexOf(typeof date) === -1 && (!Number(date) || Number(date) > 24339600000)) {
        try {
            let tmpDate = String(timeZone).match(/utc/gmi) ? moment.utc(date) : new Date(date)

            if (date && String(tmpDate) !== 'Invalid Date') {
                format = format || 'MMM DD, YYYY'
                return String(timeZone).match(/utc/gmi) ? moment.utc(date).format(format) : moment(date).format(format)
            }
        } catch (error) {}
    }

    return date
}

function camelcaseToString(string) {
    return String(string)
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, str => {
            return str.toUpperCase()
        })
}

const uppercase = string => {
    if (typeof string === 'string') {
        return string.toUpperCase()
    }
    return string
}

const lowerCase = string => {
    if (typeof string === 'string') {
        return string.toLowerCase()
    }

    return string
}

const sortCallBack = (keyString, asc = true, type, getValueFunction) => {
    return function(item1, item2) {
        let compareValue1 = item1
        let compareValue2 = item2
        if (keyString) {
            let keys = keyString.split('.')
            for (let key of keys) {
                if (compareValue1 && (compareValue1[key] || typeof compareValue1[key] === 'boolean')) {
                    compareValue1 = compareValue1[key]
                }
                if (compareValue2 && (compareValue2[key] || typeof compareValue2[key] === 'boolean')) {
                    compareValue2 = compareValue2[key]
                }
            }
        }

        if (typeof getValueFunction === 'function') {
            compareValue1 = getValueFunction(compareValue1)
            compareValue2 = getValueFunction(compareValue2)
        }

        switch (type) {
            case 'number':
            case 'Number':
                compareValue1 = Number(compareValue1)
                compareValue2 = Number(compareValue2)
                break
            case 'string':
            case 'String':
                compareValue1 = lowerCase(compareValue1)
                compareValue2 = lowerCase(compareValue2)
                break
        }

        if (asc) {
            return compareValue1 > compareValue2 ? 1 : compareValue1 < compareValue2 ? -1 : 0
        }
        return compareValue1 < compareValue2 ? 1 : compareValue1 > compareValue2 ? -1 : 0
    }
}

const formatTime = timeStr => {
    try {
        let split = timeStr.split(':')
        let hours = Number(split.shift()) || 0
        if (hours > 12) {
            return hours - 12 + `:${split.pop()}` + ' PM'
        }
        return hours + `:${split.pop()}` + ` ${hours === 12 ? 'PM' : 'AM'}`
    } catch (error) {
        return timeStr
    }
}

function filterSeal(str) {
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
        // str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-")
        /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
        // str= str.replace(/-+-/g,"-") //thay thế 2- thành 1-
        // str = str.replace(/^\-+|\-+$/g, '')
        // cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str
}

function getAllArrayInObject(object, result = []) {
    if (Array.isArray(object)) {
        result = [...result, ...object]
    } else if (object instanceof Object) {
        for (let key in object) {
            result = getAllArrayInObject(object[key], result)
        }
    }

    return result
}

/**
 * Return age: Number
 * @param {Date} birthday
 */
const getAgeFromBirthDate = birthday => {
    let diff = moment.preciseDiff(moment(birthday).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), true)
    return diff.years
}

const getAgeText = birthday => {
    let diff = moment.preciseDiff(moment(birthday).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), true)

    if (diff.years > 0) {
        return diff.years + ` year${diff.years > 1 ? 's' : ''} old`
    }

    if (diff.months > 0) {
        return diff.months + ` month${diff.months > 1 ? 's' : ''} old`
    }

    if (diff.days > 0) {
        return diff.days + ` day${diff.days > 1 ? 's' : ''} old`
    }

    return ''
}

function stringMaxLength(string = '', max = 100) {
    if (typeof max !== 'number' || isNaN(max)) {
        throw new Error('Max length of string invalid')
    }

    if (typeof string === 'string') {
        return string.length <= max ? string : string.substring(0, max) + '...'
    }
}

const cleanFileName = fileName => String(fileName).replace(/[^\w\s]| /gm, '-')

export default {
    tempDay,
    sleep,
    ensureArray,
    ensureObject,
    upperFirstLetter,
    camelcaseToString,
    sortCallBack,
    uppercase,
    lowerCase,
    formatTime,
    formatDate,
    filterSeal,
    getAllArrayInObject,
    getAgeFromBirthDate,
    getAgeText,
    stringMaxLength,
    cleanFileName
}