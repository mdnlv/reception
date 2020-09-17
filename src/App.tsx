import React, { useEffect } from 'react';
import { Col, Layout, Row } from 'antd';
import AppHeaderBar from './components/elements/AppHeaderBar/AppHeaderBar';
import AppRouter from './router/router';
import SideMenu from './components/elements/SideMenu/SideMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  fetchAccountingSystem,
  fetchAttachTypes,
  fetchEventTypes,
  fetchInvalidDocuments,
  fetchInvalidReasons,
  fetchOrganisations,
  fetchPersons,
} from './store/rb/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchEventTypes());
    dispatch(fetchInvalidDocuments());
    dispatch(fetchOrganisations());
    dispatch(fetchInvalidReasons());
    dispatch(fetchAccountingSystem());
    dispatch(fetchAttachTypes());
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
