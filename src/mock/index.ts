import {store} from '@/store'
import roomPic from "@/assets/roomPic.jpg"
import Mock from 'mockjs'
import "./repair"

Mock.setup({
  timeout:"200-600"
})
// function generateBearerToken(): string {
//   // 生成 16 字节随机数组
//   const arr = new Uint8Array(16);
//   crypto.getRandomValues(arr);

//   // 转成 16进制字符串
//   const randomHex = Array.from(arr)
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('');

//   return randomHex;
// }

/*
双token工作流程
1.用户登录成功 → 后台同时返回 access_token 和 refresh_token
2.前端每次请求业务接口，在 Header 中携带 access_token
3.当 access_token 过期（返回 401），前端自动用 refresh_token 调用刷新接口
4.后台验证 refresh_token 有效后，签发新的 access_token 返回
  若 refresh_token 也过期，则强制用户重新登录

*/


interface MockRequestOption {
  url: string
  type: string
  body: string // 原始是JSON字符串，需要JSON.parse
}
//用户登录接口
Mock.mock("/login","post",(option:MockRequestOption)=>{

  const userList = [
    {username:'admin',password:"123456"},
    {username:'user',password:"123456"},
  ]

  // 把字符串body解析成js对象
  const {username,password} = JSON.parse(option.body)

  const user = userList.find(item=>item.username===username )

  if(!user || user.password !==password){
    return {
      code:40001,
      message:"用户名或密码不正确"
    }
  }
  if(user.username==='admin' && user.password==='123456'){
      return {
        code:200,
        message:"登录成功",
        data:{
          username:username,
          // access_token:generateBearerToken(),
          // refresh_token:generateBearerToken()
          access_token:'MockTokenAdmin'
        }
    }
  }else if(user.username==='user' && user.password==='123456'){
    return {
        code:200,
        message:"登录成功",
        data:{
          username:username,
          // access_token:generateBearerToken(),
          // refresh_token:generateBearerToken()
          access_token:'MockTokenUser'
        }
    }
  }
  
  
})

const menuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            // {
            //     "icon": "UserAddOutlined",
            //     "label": "新增租户",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "财务管理",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "合同管理",
                "key": "/finance/contract",

            },
            {
                "icon": "FrownOutlined",
                "label": "合同详情",
                "key": "/finance/surrender",
            },
            {
                "icon": "FileTextOutlined",
                "label": "账单管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const userMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            // {
            //     "icon": "UserAddOutlined",
            //     "label": "新增租户",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const managerMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            // {
            //     "icon": "UserAddOutlined",
            //     "label": "新增租户",
            //     "key": "/users/add",
            // }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/personal",
    }
]

const customizeMenuList = [
    {
      "icon": "DashboardOutlined",
      "label": "工作台",
      "key": "/dashboard",
    },
    {
  
      "icon": "TeamOutlined",
      "label": "租户管理",
      "key": "/users",
      "children": [
        {
          "icon": "UnorderedListOutlined",
          "label": "租户列表",
          "key": "/users/list",
        },
      ]
    },
    {
      "icon": "LaptopOutlined",
      "label": "物业管理",
      "key": "/estate",
      "children": [
        {
          "icon": "InsertRowLeftOutlined",
          "label": "楼宇管理",
          "key": "/estate/tenement",
        },
       
      ]
    },
    {
      "icon": "ToolOutlined",
      "label": "报修管理",
      "key": "/repair"
    },
    {
      "icon": "ToolOutlined",
      "label": "设备管理",
      "key": "/equipment",
    },
    {
      "icon": "ThunderboltOutlined",
      "label": "能源消耗",
      "key": "/energy",
    },
    {
      "icon": "UserOutlined",
      "label": "个人中心",
      "key": "/personal",
    }
  ]

//用户获取动态菜单的接口
Mock.mock("/getMenu","get",()=>{
  const {token} =  store.getState().authSlice
  if(token==='MockTokenAdmin'){
    return {
      code:200,
      message:'获取动态路由成功',
      data:menuList
    }
  }else if(token==='MockTokenUser'){
    return {
      code:200,
      message:'获取动态路由成功',
      data:userMenuList
    }
  }else{
    return {
      code:401,
      message:'token失效，请重新登录'
    }
  }
})


//DashBoard获取数据
Mock.mock('/getDashBoardData',"get",()=>{
  return {
    code:200,
    message:'获取数据成功',
    data:[ 
            {
              name: '煤',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '气',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '油',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '电',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '热',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }

    ]
  }
})

//随机生成电话号码
Mock.Random.extend({
  phone:function(){
    const phonePrefixs = ['13','14','15','16','17','18','19']
    return this.pick(phonePrefixs) + Mock.mock(/\d{9}/)
  }
})

//获取用户列表数据
Mock.mock('/getUserList',"post",(option:any)=>{
  const {pageSize,page,companyName,contact,phone} = JSON.parse(option.body)
  const total = 287
  function getShowCount(){
     const count = Math.ceil(total / pageSize)
     if(page>count){
      return total
     }else if(page===count){
      return total % pageSize
     }else{
      return pageSize
     }
  }
  const showCount = getShowCount()

  return ({
    code:200,
    message:"获取用户列表成功",
    data:Mock.mock({
      [`list|${showCount}`]:[
        {
          "id":"@string('number',6)", //随机生成一个六位数字id
          "name":"@cname", //随机生成中文人名
          "status|1":["1","2","3"],
          "tel":"@phone",
          "business|1":['制造业',"互联网","新媒体","美业","新能源","物流","电商","建筑业"],
          "email":"@email",
          "creditCode":"@string('number',18)",
          "industryNum":"@string('number',15)",
          "organizationCode":"@string('upper',9)",
          "legalPerson":"@cname"
        }
      ],
      total:total
    })
  })
})


//根据id删除租户
Mock.mock('/deleteUser','post',(option:any)=>{
  const {body:id} = option
  return {
    code:200,
    message:'删除用户成功',
    data:`删除用户id为${id}`
  }
})

//批量根据id删除租户
Mock.mock('/deleteUsers','post',(option:any)=>{
  // console.log('前',typeof option.body) //string
  const data = JSON.parse(option.body)
  // const {body} = JSON.parse(option)
  // console.log('后',typeof data) //object
  // console.log(option)

  return {
    code:200,
    message:'批量删除用户成功',
    data:`删除用户id为${data}`
  }
})

//新增租户
Mock.mock('/addUser',"post",(option:any)=>{
  const data = JSON.parse(option.body)
  // 后端接收到参数后，判断id是否存在，存在返回修改成功，不存在返回新增成功
  return {
    code:200,
    message:`新增/修改租户成功！`,
    data:data
  }
})

//获取楼宇管理 ////查询楼宇接口
Mock.mock('/estateList',"post",(option:any)=>{
  // console.log(option)
  const reserse = JSON.parse(option.body)
  // console.log(reserse)
  return {
    code:200,
    message:"获取楼宇列表成功",
    data:Mock.mock({
      "list|16":[
        {
          "id":"@string('number',6)",
          "name|+1":["东座1期A栋","东座1期B栋","东座1期C栋","东座1期D栋","东座2期A栋","东座2期B栋","东座2期C栋","东座2期D栋","西座1期A栋","西座1期B栋","西座1期C栋","西座1期D栋","西座2期A栋","西座2期B栋","西座2期C栋","西座2期D栋"],
          "person":"@cname",
          "tel" : /1[3-9]\d{9}/,
          "status|1":["1","2","3"],
          "vacancyRate":"@integer(1,100)",
          "propertyFee":"@integer(1,100)"
        }
      ]
    }).list
  }
})

//删除楼宇
Mock.mock('/deleteEstate',"post",(option:any)=>{
  const {id,name} = JSON.parse(option.body)
  return {
    code:200,
    message:"删除楼宇成功",
    data:`楼宇id为：${id},名称为${name}`
  }
})

//修改楼宇
Mock.mock('/updataEstate',"post",(option:any)=>{
  // const {id,name,person,tel,status,vacancyRate,propertyFee} = JSON.parse(option.body)
  const obj = JSON.parse(option.body)
  // console.log(obj)
  //查数据库，id===id，有就修改数据=>替换对应id的所有数据
  return{
    code:200,
    message:"修改楼宇成功",
    data:`${obj}接收修改数据`
  }
})

//获取房间列表的接口
function generateRooms() {
    const rooms = [];
    for (let i = 0; i < 50; i++) {
        const floor = 1 + Math.floor(i / 6); // 每6个房间一层
        const roomNumber = floor * 100 + (101 + (i % 6)); // 计算房间号
        rooms.push({
            roomNumber,
            decorationType: Mock.Random.pick(['毛坯', '精装']),
            area: Mock.Random.integer(100, 500),
            unitPrice: Mock.Random.integer(1, 5),
            src:roomPic
        });
    }
    return rooms;
  }

//房间管理
Mock.mock('/roomList',"post",(option:any)=>{
  const {roomId} = JSON.parse(option.body)
  return {
    code:200,
    message:`获取房间管理数据成功，${roomId}`,
    data:{
      rooms:generateRooms()
    }
  }
})

export function getRandomDate(){
    // 生成 2026 年内的随机日期 + 随机时间
    const start = new Date('2026-01-01').getTime();
    const end = new Date('2026-8-17').getTime();
    const randomTime = start + Math.random() * (end - start);
    const date = new Date(randomTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+08:00`;
}

//获取车辆信息列表
Mock.mock('/getChargeRecordList', 'post', (option:any) => {
  const { pageSize = 10, page = 1 } = JSON.parse(option.body) || {};
  const total = 50; // 总记录数设为 50

  // 计算当前页应返回的条数
  function getShowCount() {
    const count = Math.ceil(total / pageSize);
    if (page > count) {
      return 0; // 超出页数返回空
    } else if (page === count) {
      const remainder = total % pageSize;
      return remainder === 0 ? pageSize : remainder;
    } else {
      return pageSize;
    }
  }
  const showCount = getShowCount();

  return {
    code: 200,
    message: '获取充电记录成功',
    data: Mock.mock({
      [`list|${showCount}`]: [
        {
          // 编号（6位数字）
          id: '@string("number", 6)',
          // 订单编号（13位数字）
          orderId: '@string("number", 13)',
          // 订单日期（仅日期，不带时间）
          orderDate: function() {
            // 生成 2026-01-01 到 2026-12-31 之间的随机日期
            const start = new Date('2026-01-01').getTime();
            const end = new Date('2026-8-17').getTime();
            const randomTime = start + Math.random() * (end - start);
            const date = new Date(randomTime);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          },
          // 车辆号码（模拟中国大陆车牌，正则生成）
          carNumber: /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-Z0-9]{5}/,
          // 车辆类型（枚举）
          carType: '@pick(["自有车辆", "租赁车辆", "公务用车", "合作车辆"])',
          // 充电开始时间（ISO 8601 带时区，真实企业推荐格式）
          chargingBeginTime: function() {
            // 生成 2026 年内的随机日期 + 随机时间
            const start = new Date('2026-01-01').getTime();
            const end = new Date('2026-8-17').getTime();
            const randomTime = start + Math.random() * (end - start);
            const date = new Date(randomTime);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+08:00`;
          },
          // 充电时长（单位：秒，模拟 10分钟～2小时）
          chargingDuringTime: '@integer(600, 7200)',
          // 充电量（单位：kWh，保留2位小数）
          chargingAmount: '@float(1, 100, 2, 2)',
          // 充电费用（单位：元，保留2位小数）
          changingFee: '@float(10, 200, 2, 2)',
        },
      ],
      total,
      pageSize,
      page,
    }),
  };
});


//获取车辆列表
Mock.mock('/getCarList', 'post', (option:any) => {
  const { pageSize = 10, page = 1 } = JSON.parse(option.body) || {};
  const total = 50; // 总记录数

  // 计算当前页实际返回条数
  function getShowCount() {
    const totalPages = Math.ceil(total / pageSize);
    if (page > totalPages) return 0;
    if (page === totalPages) {
      const remainder = total % pageSize;
      return remainder === 0 ? pageSize : remainder;
    }
    return pageSize;
  }
  const showCount = getShowCount();

  return {
    code: 200,
    message: '获取车辆信息成功',
    data: Mock.mock({
      [`list|${showCount}`]: [
        {
          // 编号（6位数字）
          id: '@string("number", 6)',
          // 车牌号（中国大陆车牌格式）
          carNumber: /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][A-Z0-9]{5}/,
          // 车主姓名（随机中文名）
          carOwner: '@cname',
          // 车主电话（11位手机号）
          carOwnerTel: /1[3-9]\d{9}/,
          // 租赁类型：1-月租，2-季租，3-年租
          rentType: '@pick(["1", "2", "3"])',
          // 剩余租期（天数，0~365）
          rentLastDate: '@integer(0, 365)',
          // 入场照片（汽车图片URL）
          carPic: function() {
            // 使用 Lorem Flickr 随机汽车图
            const seed = Math.random().toString(36).substring(7);
            return `https://loremflickr.com/320/240/car?random=${seed}`;
          },
        },
      ],
      total,
      pageSize,
      page,
    }),
  };
});

//删除院内车辆
Mock.mock('/deleteCar',"post",(option:any)=>{
  const {id,carNumber} = JSON.parse(option.body)
  return {
    code:200,
    message:"删除车辆成功",
    data:`车辆id为：${id},车牌号为${carNumber}`
  }
})

//修改院内车辆
Mock.mock('/updateCar',"post",(option:any)=>{
  const {
    id,
    carNumber,
    carOwner,
    carOwnerTel,
    rentType,
    rentLastDate,
    carPic
  } = JSON.parse(option.body)
  return {
    code:200,
    message:"修改车辆成功",
    data:`编号为：${id}，车牌号为：${carNumber}，车主姓名：${carOwner}，车主电话号码：${carOwnerTel}，租赁类型：${rentType}，剩余租期为：${rentLastDate}，入场图片为：${carPic}`
  }
})

//查询院内车辆
Mock.mock('/search',"post",(option:any)=>{
  const {search} = JSON.parse(option.body)
  return {
    code:200,
    message:"查询车辆成功",
    data:`查询参数为：${search}`
  }
})


//合同管理页面
//合同管理
  Mock.mock('/contractList', 'post', (option?: any) => {
  // const {page,pageSize}=JSON.parse(options?.body);
  // console.log("后端合同管理接到参数",JSON.parse(options.body))

  const { pageSize = 10, page = 1, } = JSON.parse(option.body) || {};
  
  // console.log(JSON.parse(option.body))
  const total = 54; // 总记录数

  // 计算当前页实际返回条数
   function getShowCount(){
     const count = Math.ceil(total / pageSize)
     if(page>count){
      return total
     }else if(page===count){
      return total % pageSize
     }else{
      return pageSize
     }
  }
  const showCount = getShowCount()

  return {
    code: 200,
    message: "成功",
    data: Mock.mock({
      [`list|${showCount}`]: [{
        'contractNo':'@string("number", 6)',
        'constractType|1': ['租赁合同','自定义合同','购买合同'],
        'constractName|1': ["房屋租赁合同通用模版","车位租赁合同通用模版","商业房产买卖合同"],  
        "constractBeginDate|1":['2024-01-01','2024-03-05','2024-04-01','2023-04-01','2022-04-01'],
        "constractEndDate|1":['2026-01-01','2026-03-05','2026-04-01','2026-06-01','2026-07-01','2026-08-01','2026-09-01'],
        'jia|1': ['万物科技有限公司','大鱼网络科技','六六信息技术有限公司'],  
        'yi': '天明物业有限公司', 
        'status|1': ["1","2","3","4"],  
      }],
      "total": 54
    })
    // 生成55条数据
  }
});