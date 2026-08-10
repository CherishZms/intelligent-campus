
import store from '@/store'
import { message } from 'antd'
import Mock from 'mockjs'

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
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
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
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
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
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
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


// Mock.mock(/.*/, 'options', () => ({ code: 200 }))