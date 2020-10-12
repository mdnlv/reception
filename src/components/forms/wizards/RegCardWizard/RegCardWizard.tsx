import React from 'react';
import { Formik } from 'formik';
import { Card, Col, Row, Tabs } from 'antd';
import PassportGeneral from './pages/PassportGeneral/PassportGeneral';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from './pages/UserInfo/UserInfo';
import './styles.scss';
import { setFormSection } from '../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import { RootState } from '../../../../reduxStore/store';
import PersonDocuments from './pages/PersonDocuments/PersonDocuments';

interface WizardProps {}

const RegCardWizard: React.FC<WizardProps> = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik
      initialValues={store}
      onSubmit={(values) => {
        dispatch(setFormSection(values));
      }}>
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
              <Tabs.TabPane key={'2'} tab={'Прикрепленные документы'}>
                <PersonDocuments />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default RegCardWizard;
