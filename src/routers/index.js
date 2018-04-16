const router = require('koa-router')();
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/douban')
const db = mongoose.connection
db.once("open", function () {
  console.log("数据库连接成功");
})
db.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

db.on('disconnected', function () {
  console.log('数据库连接断开');
})
router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title222'
  };

  await ctx.render('index', {
  });
})
module.exports = router;
