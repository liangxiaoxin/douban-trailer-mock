const mongoose = require('mongoose')
// 表模型
const movieSchema = new mongoose.Schema({
  "doubanId": Number,
  "title": String,
  "rate":Number,
  "poster":String
})
module.exports = mongoose.model('Movie', movieSchema)