import React, { useEffect, useState } from 'react';
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

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // 移动端自动收起
  useEffect(() => {
    if (isMobile()) {
      setCollapsed(true);
    }
  }, []);

  // 监听窗口变化，移动端自动收起
  useEffect(() => {
    function handleResize() {
      if (isMobile()) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="md" trigger={null}>
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
        {/* 收起/展开按钮 */}
        <div style={{ textAlign: 'center', padding: 8 }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 18,
            }}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? '展开菜单' : '收起菜单'}
          >
            {collapsed ? '☰' : '«'}
          </button>
        </div>
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
