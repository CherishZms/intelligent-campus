
import Mock from 'mockjs'
Mock.setup({
  timeout:"200-600"
})
function generateBearerToken(): string {
  // 生成 16 字节随机数组
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);

  // 转成 16进制字符串
  const randomHex = Array.from(arr)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return randomHex;
}

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
  return {
    code:200,
    message:"登录成功",
    data:{
      username:username,
      access_token:generateBearerToken(),
      refresh_token:generateBearerToken()
    }
  }
  
})

// Mock.mock(/.*/, 'options', () => ({ code: 200 }))