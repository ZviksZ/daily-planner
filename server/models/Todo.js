const {Schema, model, Types} = require('mongoose')

const shema = new Schema({
   title: {
      type: String,
      required: true
   },
   completed: {
      type: Boolean,
      default: false
   },
   date: {type: Date,  default: Date.now},
   code: {type: String, required: true, unique: true},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Todo', shema)