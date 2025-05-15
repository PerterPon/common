import React from 'react';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './App.css';
import AddHouse from './add-house';
import HouseList from './house-list';

const { Sider, Content } = Layout;

const menuItems = [
  {
    key: '/house-list',
    icon: <HomeOutlined />,
    label: 'House List',
  },
  {
    key: '/add-house',
    icon: <PlusOutlined />,
    label: 'Add House',
  },
];

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ height: 32, margin: 16, color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname === '/' ? '/house-list' : location.pathname]}
          items={menuItems}
          onClick={({ key }: { key: string }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24 }}>
          <Routes>
            <Route path="/house-list" element={<HouseList />} />
            <Route path="/add-house" element={<AddHouse />} />
            <Route path="/" element={<HouseList />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Router>
        <AppLayout />
      </Router>
    </ConfigProvider>
  );
}

export default App;
