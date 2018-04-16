const router = require('koa-router')();
const Movie = require('../models/movie')


router.get('/movie/:doubanId',async (ctx, next) =>  {
  let doubanId = Number(ctx.params.doubanId)
  console.log('doubanId',doubanId);
  let movie = await Movie.findOne({doubanId})
  ctx.body = movie
});

module.exports = router;
