import React, { Suspense, useEffect } from 'react';
import { Col, Layout, Row, Spin } from 'antd/lib';
import { HashRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useInitialFetch from './reduxStore/hooks/initialFetch';

import AppHeaderBar from './components/elements/AppHeaderBar/AppHeaderBar';
import AppRouter from './router/AppRouter';
import SideMenu from './components/elements/SideMenu/SideMenu';
import { RootState } from './reduxStore/store';

const App = () => {
  const initialFetch = useInitialFetch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <Router>
      <Layout>
        {token && (
          <Layout.Header>
            <AppHeaderBar />
          </Layout.Header>
        )}
        <Layout.Content className="app-content">
          <Row style={{ height: '100%' }}>
            {token && (
              <Col span={1}>
                <SideMenu />
              </Col>
            )}
            <Col span={23}>
              {/*todo add smooth fallback*/}
              {!token ? (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <Spin />
                </div>
              ) : (
                <Suspense fallback={''}>
                  <AppRouter />
                </Suspense>
              )}
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Router>
  );
};

export default App;
