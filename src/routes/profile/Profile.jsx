import './Profile.scss';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { AiOutlineShoppingCart } from "react-icons/ai"; 
import {SIDEBAR} from "../../static/links";

import { Button, Layout, Menu, Typography } from 'antd';
const {  Sider, Content } = Layout;

const { Title } = Typography;

const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='profile'>
      <Layout>
        <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
          <Title level={5} style={{ textAlign: 'center', padding: '20px 25px', color: '#fff', margin: 0, flex: 1, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: "nowrap", overflow: "hidden" }}> <AiOutlineShoppingCart style={{ fontSize: 30 }} /> </Title>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{paddingInline: 10}}
            items={SIDEBAR}
          />
        </Sider>
        <Layout>
          <Header headerType='profile' setCollapsed={setCollapsed} collapsed={collapsed}/> 
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            <Outlet />
          </Content>  
        </Layout>
      </Layout>
    </div>
  )
}

export default Profile