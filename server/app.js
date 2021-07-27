const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
// const path = require('path');
// const body = require('koa-body');
const port = require('./config').port;
const registerRouter = require('./routers/index');

const app = new Koa();
// app.use(body({ multipart: true }));
app.use(cors());
app.use(bodyParser());
app.use(registerRouter());
app.listen(port);
console.log(`app server started by port: ${port}`);
