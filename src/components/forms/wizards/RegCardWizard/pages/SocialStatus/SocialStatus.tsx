import React from 'react';
import { Col, Row } from 'antd';
import StatusDocs from './sections/StatusDocs/StatusDocs';
import Status from './sections/Status/Status';

const SocialStatus: React.FC = () => {
  return (
    <form className={'wizard-step social-status-form'}>
      <Row>
        <Col span={24}>
          <Status />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <StatusDocs />
        </Col>
      </Row>
    </form>
  );
};

export default SocialStatus;
