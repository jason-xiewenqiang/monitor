const router = require('koa-router')();   //路由

router
  .get('/api/test',async(ctx,next) => {
    ctx.body = 'hello world';
  })
  .post('/api/apples',async(ctx,next) => {
    ctx.body = 'apples';
  })
  .put('/api/apples/:id',async(ctx,next) => {
    ctx.body = 'apples';
  })
  .del('/api/apples',async(ctx,next) => {
    ctx.body = 'apples';
  })
module.exports = router;