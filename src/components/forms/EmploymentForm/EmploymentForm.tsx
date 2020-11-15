import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { RootState } from '../../../reduxStore/store';

import PersonEmployment from './components/sections/PersonEmployment/PersonEmployment';
import PersonHazard from './components/sections/PersonHazard/PersonHazard';

const EmploymentForm: FC = () => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.form.employment} onSubmit={() => {}}>
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
