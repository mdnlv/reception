import React from 'react';
import { Col, Row } from 'antd';
import Disability from './sections/Disability/Disability';
import PersonPrivileges from './sections/PersonPrivileges/PersonPrivileges';

const Privileges: React.FC = () => {
  return (
    <form className={'wizard-step privileges-form'}>
      <Row>
        <Col span={24}>
          <PersonPrivileges />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Disability />
        </Col>
      </Row>
    </form>
  );
};

export default Privileges;
