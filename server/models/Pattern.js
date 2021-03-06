const {Schema, model, Types} = require('mongoose')

const shema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   date: {type: Date,  default: Date.now},
   code: {type: String, required: true, unique: true},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Pattern', shema)
