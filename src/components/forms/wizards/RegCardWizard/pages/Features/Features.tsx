import React from 'react';
import { Col, Divider, Row } from 'antd';
import Allergy from './sections/Allergy/Allergy';
import Inspection from './sections/Inspection/Inspection';
import MedIntolerance from './sections/MedIntolerance/MedIntolerance';
import AnthropometricData from './sections/AnthropometricData/AnthropometricData';
import PersonFeatures from './sections/PersonFeatures/PersonFeatures';

const Features: React.FC = () => {
  return (
    <form className={'wizard-step features-form'}>
      <Row>
        <Col span={24}>
          <PersonFeatures />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Allergy />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <MedIntolerance />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <AnthropometricData />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Inspection />
        </Col>
      </Row>
    </form>
  );
};

export default Features;
