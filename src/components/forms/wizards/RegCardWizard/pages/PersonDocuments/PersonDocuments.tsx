import React from 'react';
import { Col, Divider, Row } from 'antd';

import PersonalDocuments from './sections/PersonalDocuments/PersonalDocuments';
import PersonPolicy from "./sections/PersonPolicy/PersonPolicy";

const PersonDocuments: React.FC = () => {
  return (
    <form className={'wizard-step person-documents-page card-page'}>
      <Row>
        <Col span={24}>
          <PersonalDocuments />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <PersonPolicy />
        </Col>
      </Row>
    </form>
  );
};

export default PersonDocuments;
