
import { DownOutlined,UserOutlined,PoweroffOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { removeToken } from '@/store/userSlice';
import { useDispatch } from 'react-redux';

const items: MenuProps['items'] = [
  {
    label: (
      <a>
        个人中心
      </a>
    ),
    key: '0',
    icon:<UserOutlined />
  },
  {
    label: (
      <a >
        退出登录
      </a>
    ),
    key: '1',
    icon:<PoweroffOutlined />
  }
];

function MyHeader(){

  const username = sessionStorage.getItem("username")
  const dispatch = useDispatch()

  const onClick:MenuProps['onClick'] = ({key})=>{
    // console.log(e.key)
    if(key==='0'){
      //跳转到个人中心
      console.log('跳转到个人中心')
    }else{
      //退出登录
      dispatch(removeToken())
    }
  }
  return <>
    <Dropdown menu={{ items,onClick }} >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          欢迎您，{username}
          <DownOutlined />
        </Space>
      </a>
  </Dropdown>
  </>
}

export default MyHeader