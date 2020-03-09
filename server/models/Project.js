const {Schema, model, Types} = require('mongoose')

const shema = new Schema({
   description: { type: String, required: true },
   technologies: { type: Array, required: true },
   demoLink: { type: String },
   gitLink: { type: String, required: true },
   date: {type: Date,  default: Date.now},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Project', shema)
