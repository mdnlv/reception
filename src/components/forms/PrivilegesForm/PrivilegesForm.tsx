import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { RootState } from '../../../reduxStore/store';

import PersonInvalidity from './components/sections/PersonInvalidity/PersonInvalidity';
import PersonPrivileges from './components/sections/PersonPrivileges/PersonPrivileges';

const PrivilegesForm: FC = () => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.form.privileges} onSubmit={() => {}}>
      <form className={'privileges-form'}>
        <Row>
          <Col span={24}>
            <PersonPrivileges />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <PersonInvalidity />
          </Col>
        </Row>
      </form>
    </Formik>
  );
};

export default PrivilegesForm;
