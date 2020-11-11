import React, { FC } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { FormState } from './types';
import { Col, Row } from 'antd';
import SocialStatus from './components/sections/SocialStatus/SocialStatus';
import './styles.scss';
import SocialStatusDoc from './components/sections/SocialStatusDoc/SocialStatusDoc';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore/store';

const SocialStatusForm: FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.form.socialStatus} onSubmit={() => {}}>
      {() => (
        <form className={'social-status-form'}>
          <Row>
            <Col span={24}>
              <SocialStatus />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <SocialStatusDoc />
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default SocialStatusForm;
