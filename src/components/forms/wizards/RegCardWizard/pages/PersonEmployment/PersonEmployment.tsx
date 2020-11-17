import React from 'react';
import {Col, Row} from 'antd';

import Employment from './sections/Employment/Employment';
import Hazard from './sections/Hazard/Hazard';

const PersonEmployment: React.FC = () => {
  return (
    <form className={'wizard-step employment-form'}>
      <Row>
        <Col span={24}>
          <Employment />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Hazard />
        </Col>
      </Row>
    </form>
  );
};

export default PersonEmployment;
