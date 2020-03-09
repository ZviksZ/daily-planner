const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   todos: [{type: Types.ObjectId, ref: 'Todo'}],
   videos: [{type: Types.ObjectId, ref: 'Video'}],
   english: [{type: Types.ObjectId, ref: 'English'}],
   projects: [{type: Types.ObjectId, ref: 'Project'}]
})

module.exports = model('User', schema)
