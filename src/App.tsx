import React, { Suspense, useEffect } from 'react';
import { Col, Layout, Row } from 'antd/lib';
import { HashRouter as Router } from 'react-router-dom';
import useInitialFetch from './reduxStore/hooks/initialFetch';
import { useSelector } from 'react-redux';
import { RootState } from './reduxStore/store';

import AppRouter from './router/AppRouter';

const App = () => {
  const initialFetch = useInitialFetch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    token && initialFetch();
  }, [token]);

  return (
    <Router>
      <Layout>
        <Layout.Content className="app-content">
          <Row style={{ height: '100%' }}>
            <Col span={23}>
              {/*todo add smooth fallback*/}
              <Suspense fallback={''}>
                <AppRouter />
              </Suspense>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Router>
  );
};

export default App;
