const router = require('koa-router')();
const Movie = require('../models/movie')


router.get('/movie/:doubanId',async (ctx, next) =>  {
  let doubanId = Number(ctx.params.doubanId)
  console.log('doubanId',doubanId);
  let movie = await Movie.findOne({doubanId})
  ctx.body = movie
});
router.get('/list',async (ctx, next) =>  {
  let doubanId = Number(ctx.params.doubanId)
  console.log('doubanId',doubanId);
  let movieList = await Movie.find().limit(10)
  let copyList = movieList.map(({title,doubanId,rate,poster})=>{
    return {title,doubanId,rate,poster}
  })
  ctx.body = {
    msg:'ok',
    status:200,
    data:copyList
  }
});

module.exports = router;
