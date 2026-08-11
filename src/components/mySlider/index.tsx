import { Menu } from 'antd';
import icons from './iconList';
import { useEffect, useState } from 'react';
// import type { MenuProps } from 'antd';
import "./index.scss"
import logo from '@/assets/logo.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// type MenuItem = Required<MenuProps>['items'][number];

function MySlider(){
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems,setMenuItems] = useState<any>([])
  const {asyncRouterList} = useSelector((state:any)=>state.authSlice)
  const navigate = useNavigate()
  // console.log(asyncRouterList)

  useEffect(()=>{
    getMenuItems()
  },[asyncRouterList])
  function getMenuItems(){
    //处理返回的数据(菜单格式)
    const mappedMenuItems = handleMenuItems(asyncRouterList)
    // console.log(mappedMenuItems)
    setMenuItems(mappedMenuItems)
  }
  function handleMenuItems(data:any){
      return data.map((item:any)=>{
        return ({
          key:item.key,
          label:item.label,
          icon:icons[item.icon],
          children:item.children?handleMenuItems(item.children):null
        })
      })
  }
  function onClick({key}:{key:string}){
    navigate(key)
  }

  return <div className="navLeft">
          <div className='logo'>
            <img src={logo} alt="logo"  />
            <h1>朋远智慧园区</h1>
          </div>
          <Menu
              defaultSelectedKeys={['/dashboard']}
              // defaultOpenKeys={['/users']}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={menuItems}
              onClick={onClick}
            />
  </div>
}

export default MySlider