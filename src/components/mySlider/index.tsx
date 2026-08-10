import { Menu } from 'antd';
import icons from './iconList';
import { useEffect, useState } from 'react';
// import type { MenuProps } from 'antd';
import { getMenu } from '@/api/user';
import "./index.scss"
import logo from '@/assets/logo.png'

// type MenuItem = Required<MenuProps>['items'][number];

function MySlider(){
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems,setMenuItems] = useState<any>([])

  useEffect(()=>{
    getMenuItems()
  },[])
  async function getMenuItems(){
    // 发请求获得菜单
    const {data} = await getMenu()
    //处理返回的数据
    const mappedMenuItems = handleMenuItems(data)
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
            />
  </div>
}

export default MySlider