import '@/pages/login/index.scss'
import bg from '@/assets/bg.jpg'
import lgbg from '@/assets/lgbg.jpg'
import logo from '@/assets/logo.png'
import { Button,  Form, Input,message } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import {login} from '@/api/user'
import { setToken } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface FieldType{
  username?:string,
  password?:string,
}

function Login(){
  //获取登录表单数据【antd固定】
  const [form] = Form.useForm()
  // const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isloading,setLoading] = useState(false)

  function handleLogin(){
    setLoading(true)
    form.validateFields().then(async (res)=>{
        const data = await login(res)
        // 登录成功
        setLoading(false)
        message.success(data.message)
        dispatch(setToken(data.data.access_token))
        sessionStorage.setItem('username',data.data.username)
        navigate("/",{replace:true})
    }).catch((e)=>{
      // console.log(e)
      setLoading(false)
      message.error(e.message)
    })

  }
  

  return <>
    <div className='login' style={{backgroundImage:`url(${bg})`}}>
      <div className='lgbg' style={{backgroundImage:`url(${lgbg})`}}>
        <div className='part'>
          <div className="title">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <h1>智慧园区管理平台</h1>
          </div>
          <Form form={form}>
            <Form.Item<FieldType>
              name="username"
              rules={[
                { required: true, message: '用户名不能为空' },
                { pattern:/^[a-zA-Z][a-zA-Z0-9]{3,8}$/,message:'用户名为字母+数字组成，且不能以数字开头'},
                { min:4,max:9, message: '用户名由4-9位字母+数字组成'}]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="admin/user" 
                autoComplete="current-username"/>
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: '密码不能为空' },
                { pattern:/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,10}$/,message:'密码由字母/数字/特殊字符组成的6-10位字符'},
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="123456" 
                onKeyDown={(e)=>{if(e.key==='Enter') handleLogin()}} 
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                style={{width:'100%'}} 
                onClick={handleLogin}
                loading={isloading}
                >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  </>
}

export default Login