import React, { useEffect } from 'react';
import { Col, Layout, Row } from 'antd/lib';
import AppHeaderBar from './components/elements/AppHeaderBar/AppHeaderBar';
import AppRouter from './router/router';
import SideMenu from './components/elements/SideMenu/SideMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import useInitialFetch from './reduxStore/hooks/initialFetch';

function App() {
  const initialFetch = useInitialFetch();

  useEffect(() => {
    initialFetch();
  }, []);

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
