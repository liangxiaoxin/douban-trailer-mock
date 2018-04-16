import mongoose from 'mongoose'
// 表模型
const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  rate:Number,
  poster:String
})
module.exports = mongoose.model('MOVIE', movieSchema)