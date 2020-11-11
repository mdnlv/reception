import React, { FC } from 'react';
import { Col, Divider, Row } from 'antd';
import PersonFeatures from './components/sections/PersonFeatures/PersonFeatures';
import PersonAllergy from './components/sections/PersonAllergy/PersonAllergy';
import MedIntolerance from './components/sections/MedIntolerance/MedIntolerance';
import AnthropometricData from './components/sections/AnthropometricData/AnthropometricData';
import Inspection from './components/sections/Inspection/Inspection';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { RootState } from '../../../reduxStore/store';

const FeaturesForm: FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.form.features} onSubmit={() => {}}>
      <form className={'features-form'}>
        <Row>
          <Col span={24}>
            <PersonFeatures />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <PersonAllergy />
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
    </Formik>
  );
};

export default FeaturesForm;
