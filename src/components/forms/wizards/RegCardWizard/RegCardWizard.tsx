import React from 'react';
import { Formik } from 'formik';
import { Card, Col, Row, Tabs } from 'antd';
import PassportGeneral from './pages/PassportGeneral/PassportGeneral';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import UserInfo from './pages/UserInfo/UserInfo';
import './styles.scss';
import { setFormSection } from '../../../../store/registrationCard/actions';
import { RegistrationCardState } from '../../../../store/registrationCard/types';

interface WizardProps {}

const RegCardWizard: React.FC<WizardProps> = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.registrationCard);

  function submitForm(values: RegistrationCardState) {
    dispatch(setFormSection(values));
  }

  return (
    <Formik initialValues={store} onSubmit={submitForm}>
      {(formProps) => (
        <Row>
          <Col span={5}>
            <Card>
              <UserInfo />
            </Card>
          </Col>
          <Col span={19} className={'wizard-tabs'}>
            <Tabs defaultActiveKey={'1'}>
              <Tabs.TabPane key={'1'} tab={'Паспортные данные'}>
                <PassportGeneral />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default RegCardWizard;
