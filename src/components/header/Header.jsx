import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai"; 
import { Layout, Menu , Typography, Input, Button, Avatar } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { NAVIGATION } from '../../static/links';
import "./Header.scss";

const { Header } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

const suffix = (
    <AiOutlineSearch 
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
      />
  );

  const handleSearchProduct = (e) => {
    console.log(e)
  }

const HeaderComponent = ({headerType, setCollapsed, collapsed}) => {
  return (
    <>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: headerType === 'home' ? 50 : 0 }}>
        {
          headerType === 'profile' && <Button
          type="text"
          icon={collapsed ?  <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            color: "#fff"
          }}
        />
        }
        {
         headerType === 'home' && <Title level={3} style={{ color: '#fff', margin: 0, flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}><AiOutlineShoppingCart />  Sleepy Commerce</Title>
        }
        <Search
            placeholder="Search product"
            enterButton="Search"
            size="large"
            style={headerType === "home" ? {
              width: 600,
          } : {flex: 1, minWidth: 0}}
            suffix={suffix}
            onSearch={handleSearchProduct}
            />
            {headerType === "home" && <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={NAVIGATION}
                style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}
            />}
            {
              headerType === "profile" &&
              <Link style={{ marginLeft: 24 }}  to={"/auth"}>
              <Avatar
                style={{
                  backgroundColor: '#1677ff',
                }}
              >
                K
              </Avatar>
              <Text style={{ marginLeft: 8, color: '#fff' }}>Kyle</Text>
            </Link>
            }
        </Header>
        {headerType === "home" && <Outlet />}
  </>
  )
}

export default HeaderComponent