import React, { useState } from 'react';
import {Layout,theme} from 'antd';
import MySlider from '@/components/mySlider';
import MyHeader from '@/components/myHeader';
import MyBreadCrumb from '@/components/myBreadCrumb';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <MySlider />
      </Sider>
      <Layout>
        <Header style={{ padding: 0,background: colorBgContainer,textAlign:"right",paddingRight:'40px'}} >
          <MyHeader />
        </Header>
        <Content style={{ margin: '0 16px',height:'calc(100vh - 64px - 69px)',overflowY:'auto', overflowX:'hidden' }}>
          <MyBreadCrumb />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Intelligent Campus ©{new Date().getFullYear()} Created by Mindy
        </Footer>
      </Layout>
    </Layout>
  );
};


export default Home