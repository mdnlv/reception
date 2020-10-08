import React, { useEffect } from 'react';
import { Col, Layout, Row } from 'antd';
import AppHeaderBar from './components/elements/AppHeaderBar/AppHeaderBar';
import AppRouter from './router/router';
import SideMenu from './components/elements/SideMenu/SideMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  fetchRbAccountingSystem,
  fetchRbAttachTypes,
  fetchRbContactTypes,
  fetchRbDocumentTypes,
  fetchRbEventTypes,
  fetchRbInvalidDocumentsTypes,
  fetchRbInvalidReasons,
  fetchRbOrganisations,
  fetchRbPersons,
  fetchRbPolicyKind,
  fetchRbPolicyTypes,
} from './reduxStore/slices/rb/rbSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRbPersons());
    dispatch(fetchRbEventTypes());
    dispatch(fetchRbInvalidReasons());
    dispatch(fetchRbOrganisations());
    dispatch(fetchRbInvalidDocumentsTypes());
    dispatch(fetchRbAccountingSystem());
    dispatch(fetchRbAttachTypes());
    dispatch(fetchRbContactTypes());
    dispatch(fetchRbDocumentTypes());
    dispatch(fetchRbPolicyKind());
    dispatch(fetchRbPolicyTypes());
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
