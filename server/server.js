const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('@koa/cors');
const static = require('koa-static');
const path = require('path');


const app = new Koa();
const router = new Router();




app.use(cors({
    origin: function (ctx) {
        return ctx.header.origin 
    },
    credentials:true
  }));

app.context.db = require('./config/db');


app.use(koaBody());
app.use(static(
  path.resolve(__dirname, '../static')
))

router.use(async (ctx, next) => {
  
    try {
      await next();
    } catch (e) {
      console.log(e);
      ctx.throw('服务器错误', 500);
    }
  })

// 路由

router.get('/tagLiat', async ctx => {
    let data = await ctx.db.query(`select * from tag`);
    ctx.body={
        err: 0,
        data: data
    } 
});

router.get('/getContainer', async ctx => {
    let {tag_name} = ctx.request.query;
    tag_name = tag_name || '前端';
    let data = await ctx.db.query(`select * from container where tag_name= '${tag_name}'`);
    ctx.body={
        err: 0,
        data: data
    } 
});

router.get('/getContainerOne', async ctx => {
  let {id} = ctx.request.query;
  id = id;
  let data = await ctx.db.query(`select * from container where id= '${id}'`);
  ctx.body={
      err: 0,
      data: data
  } 
});



app.use(router.routes());

app.listen(3000, () => {
    console.log('server is running at 3000');
});