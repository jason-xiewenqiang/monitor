/**
 * @description register mock data right here
*/
import Mock from 'mockjs'
// 设置拦截请求的响应时间 ajax 请求；
Mock.setup({
    timeout:'200-600'
});

// 是否拦截 Ajax 请求
// Mock.prototype.match = false
// mock 一组角色数据；
const genRoles=()=>({
        code:0,
        data:['super','admin','nomal'],
        message:'成功'
    })

const getSwiperInfo=()=>({
        code:0,
        data:[{
            name:'vue-next',
            itemSrc:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c588b8ab65a74d59aa379801136df4e0~tplv-k3u1fbpfcp-watermark.image',
            targetLink:'https://github.com/vuejs/docs-next-zh-cn'
          },{
            name:'vitejs',
            itemSrc:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7351d2dcd7846158604ac8bd57222b5~tplv-k3u1fbpfcp-watermark.image',
            targetLink:'https://github.com/vitejs'

          },
          {
            name:'element-plus',
            itemSrc:'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a7fd198df44cca9c0dc10a8047bbef~tplv-k3u1fbpfcp-watermark.image',
            targetLink:'https://github.com/element-plus/element-plus'

          },
           {
            name:'tslang',
            itemSrc:'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/610fc57450884ceaae9578689663fe2f~tplv-k3u1fbpfcp-watermark.image',
            targetLink:'https://github.com/Microsoft/TypeScript'

          },
          ],
          message:'成功'
    })

Mock.mock('/api/auth/login','post',(option) => {
    const {account,password} = JSON.parse(option.body);

    if(account==='admin'&&password==='admin'){
        return {
            code:0,
            data:{
                userName:account
            },
            message:'成功'
        }
    }
        return {
            code:1,
            data:null,
            message:'账户或者密码错误'
        }



});
Mock.mock('/api/setting/basicInfo','post',(option)=>{
    const {email,nickname,desc,mobile} = JSON.parse(option.body);
    return {
        code:0,
        data:{
            email,nickname,desc,mobile
        },
        message:'更新成功'
    }
});
Mock.mock('/api/personal/tags','get',()=>({
    code:0,
    data:{
        tags:['积极阳光', '专注', '认真负责','花痴']
    },
    message:'成功'
}));
Mock.mock('/api/data/world-population','get',()=>({
        code:0,
        data:{
            dataSets:[
                {category: "frontEnd",
                value: 13832220000,
                x: "Vue-next"},
                {category: "frontEnd",
                value: 13832210000,
                x: "Vuex"},
                {category: "frontEnd",
                value: 1383232300,
                x: "vue-router"},
                {category: "frontLib",
                value: 13832210000,
                x: "ElementPlus"},
                {category: "frontEnd",
                value: 1383232200,
                x: "react"},
                {category: "frontEnd",
                value: 13831322200,
                x: "antd"},
                {category: "frontEnd",
                value: 13831322200,
                x: "antv"},
                {category: "lowcode",
                value: 1383232400,
                x: "lowcode"},
                {category: "frontEnd",
                value: 1383232400,
                x: "micro-frontend"},
                {category: "frontEnd",
                value: 1383232400,
                x: "flutter"},
                {category: "frontEnd",
                value: 1383232300,
                x: "微信小程序"},
                {category: "frontEnd",
                value: 1383232000,
                x: "Taro"},
                {category: "frontEnd",
                value: 1383231000,
                x: "抖音小程序"},
                {category: "frontEnd",
                value: 1383236000,
                x: "快手小程序"},
                {category: "frontEnd",
                value: 138322000,
                x: "UniApp"},
                {category: "frontEnd",
                value: 138322000,
                x: "NodeJS"},
                {category: "frontEnd",
                value: 138322000,
                x: "Koa"},
                {category: "frontEnd",
                value: 130922000,
                x: "Vite"},
                {category: "frontEnd",
                value: 130922009,
                x: "VitePress"},
                {category: "frontEnd",
                value: 130989000,
                x: "TypeScript"},
                {category: "frontEnd",
                value: 130989003,
                x: "stylus"},
                {category: "frontEnd",
                value: 130989003,
                x: "less"},
                {category: "frontEnd",
                value: 130989003,
                x: "sass"},
                {category: "frontEnd",
                value: 130989010,
                x: "fidder"},
                {category: "frontEnd",
                value: 130989015,
                x: "G2"},
                {category: "frontEnd",
                value: 130989010,
                x: "mockjs"}

                ]
        },
        message:'更新成功'
    }));
Mock.mock('/api/personal/tasks','get',()=>({
        code:0,
        data:{
            tasks:[

                ['2021-05-19',[{task:"读书看报"}]],

                ['2021-05-20',[{task:"吃饭打屁"}]]
                ]
        },
        message:'更新成功'
    }));
Mock.mock('/api/auth/roles','get',genRoles);
Mock.mock('/api/home/swiperInfo','get',getSwiperInfo);


