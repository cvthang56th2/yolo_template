// import { Schema } from 'mongoose'

const schema = {
    name: {
        type: String
    },
    image: String,
    thumb: String,
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'archive']
    },
    createdAt: {
        type: Date,
        default: new Date
    }
}

const options = {
    collection: 'rooms',
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

export { schema, options }