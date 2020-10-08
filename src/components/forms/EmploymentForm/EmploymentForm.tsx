import React, { FC } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Col, Row } from 'antd';
import PersonEmployment from './components/sections/PersonEmployment/PersonEmployment';
import PersonHazard from './components/sections/PersonHazard/PersonHazard';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore/store';

const EmploymentForm: FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.employment} onSubmit={() => {}}>
      <form className={'employment-form'}>
        <Row>
          <Col span={24}>
            <PersonEmployment />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <PersonHazard />
          </Col>
        </Row>
      </form>
    </Formik>
  );
};

export default EmploymentForm;
