import React from 'react';
import { Col, Layout, Menu, Row } from 'antd';
import AppHeaderBar from './components/elements/AppHeaderBar/AppHeaderBar';
import AppRouter from './router/router';
import SideMenu from './components/elements/SideMenu/SideMenu';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Layout.Header>
          <AppHeaderBar />
        </Layout.Header>
        <Layout.Content className="app-content">
          <Row style={{ height: '100%' }}>
            <Col span={1}>
              <SideMenu />
            </Col>
            <Col span={23}>
              <AppRouter />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
