import { Menu } from 'antd';
import icons from './iconList';
import { useEffect, useState } from 'react';
// import type { MenuProps } from 'antd';
import "./index.scss"
import logo from '@/assets/logo.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// type MenuItem = Required<MenuProps>['items'][number];

function MySlider(){
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems,setMenuItems] = useState<any>([])
  const {asyncRouterList} = useSelector((state:any)=>state.authSlice)
  const navigate = useNavigate()
  // 处理子路由菜单自动展开
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 动态获取当前路由
  const location = useLocation()
  // console.log(location.pathname)
  // console.log(asyncRouterList)

  useEffect(()=>{
    getMenuItems()
  },[asyncRouterList])

  useEffect(()=>{
    const path = location.pathname
    //字符串.lastIndexOf(searchValue[, fromIndex]) 从字符串的末尾往前查找，返回指定字符 / 子串最后一次出现的下标索引；找不到返回 -1
    const lastSlashIndex = path.lastIndexOf('/')
    // 避免 /dashboard 这种只有一层路由截取为空
    if(lastSlashIndex > 0){
      //substring(startIndex, endIndex)从下标 0 开始，截取到 lastSlashIndex（不包含这个下标），得到路径的目录部分
      const parentKey = path.substring(0, lastSlashIndex)
      setOpenKeys([parentKey])
    }else{
      // 一级路由，无子菜单，清空openKeys
      setOpenKeys([])
    }
  },[location.pathname])

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
  function onOpenChange(key:string[]){
    // console.log(key)
    setOpenKeys(key)
  }

  return <div className="navLeft">
          <div className='logo'>
            <img src={logo} alt="logo"  />
            <h1>朋远智慧园区</h1>
          </div>
          <Menu
              // defaultSelectedKeys={['/dashboard']}
              // defaultOpenKeys={['/users']}
              selectedKeys={[location.pathname]}
              mode="inline"
              theme="dark"
              //openKeys当前展开的 SubMenu 菜单项 key 数组
              openKeys={openKeys}
              inlineCollapsed={collapsed}
              items={menuItems}
              //onOpenChange:SubMenu 展开/关闭的回调
              onOpenChange={onOpenChange}
              onClick={onClick}
            />
  </div>
}

export default MySlider