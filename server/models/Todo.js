const {Schema, model, Types} = require('mongoose')

const shema = new Schema({
   title: {
      type: String,
      required: true
   },
   date: {type: Date,  default: Date.now},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Todo', shema)