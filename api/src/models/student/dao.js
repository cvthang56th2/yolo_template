import mongoose from 'mongoose'

module.exports = function(schema, options) {
    schema.statics.getPaginate = async function(query, dataInit) {
        const Model = this

        /* Filter */
        let queryArr = [
            { status: { $ne: 'archive' } }
        ]

        if (query.keyword && query.keyword.length > 0) {
            let re = new RegExp(query.keyword, 'i')
            queryArr.push({
                $or: [
                    { jobName: re }
                ]
            })
        }


        let options = {
            select: query.select || '',
            sort: { createdAt: -1 },
            // lean: true,
            page: dataInit.page || 1,
            limit: dataInit.itemsPerPage || 20,
            populate: query.populate || []
        }

        let pagination = await Model.paginate({ $and: queryArr }, options)
        if (pagination) {
            return {
                total: pagination.total,
                current_page: pagination.page,
                per_page: dataInit.itemsPerPage,
                last_page: pagination.pages,
                data: pagination.docs
            }
        }
    }
    schema.statics.getCountByStatus = async function(query = {}) {
        const Model = this
        let $and = []

        return {
            countAll: await Model.find({ status: { $ne: 'archive' }, $and }).countDocuments(),
            countArchive: await Model.find({ status: 'archive', $and }).countDocuments()
        }
    }
}