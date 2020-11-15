import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import './styles.scss';
import { RootState } from '../../../reduxStore/store';

import SocialStatus from './components/sections/SocialStatus/SocialStatus';
import SocialStatusDoc from './components/sections/SocialStatusDoc/SocialStatusDoc';

const SocialStatusForm: FC = () => {
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
