const {Schema, model, Types} = require('mongoose')

const shema = new Schema({
   link: { type: String, required: true },
   name: { type: String, required: true },
   previewImg: { type: String, required: true },
   status: { type: String, default: 'unwatched'},
   date: {type: Date,  default: Date.now},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Video', shema)
