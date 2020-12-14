import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Card, Col, Row, Spin, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import './styles.scss';
import { RootState } from '../../../../reduxStore/store';
import {
  fetchIdPatient,
  saveCardPatient,
  setFormSection,
  resetRegCard
} from '../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import validation from "./validation";

import PassportGeneral from './pages/PassportGeneral/PassportGeneral';
import UserInfo from './pages/UserInfo/UserInfo';
import PersonDocuments from './pages/PersonDocuments/PersonDocuments';
import SocialStatus from './pages/SocialStatus/SocialStatus';
import PersonEmployment from './pages/PersonEmployment/PersonEmployment';
import Attachments from './pages/Attachments/Attachments';
import ViewType from './pages/ViewType/ViewType';
import Features from './pages/Features/Features';
import Privileges from './pages/Privileges/Privileges';
import Offences from './pages/Offences/Offences';
import Links from './pages/Links/Links';
import AdditionalHospitalization from './pages/AdditionalHospitalization/AdditionalHospitalization';
import OutsideIdent from './pages/OutsideIdent/OutsideIdent';
import Etc from './pages/Etc/Etc';

interface WizardProps {}

const RegCardWizard: React.FC<WizardProps> = () => {
  const navigation = useHistory();
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const store = useSelector(
    (state: RootState) => state.registrationCard.initialFormState,
  );
  const isLoading = useSelector(
    (state: RootState) => state.registrationCard.loading.idPatient,
  );

  useEffect(() => {
    if (params.id !== 'new') {
      dispatch(resetRegCard());
      dispatch(fetchIdPatient(parseInt(params.id)));
    } else {
      dispatch(resetRegCard());
    }
  }, [params]);

  return isLoading ? (
    <Row style={{ height: '100vh' }} justify={'center'} align={'middle'}>
      <Spin />
    </Row>
  ) : (
    <Formik
      enableReinitialize={true}
      initialValues={store}
      validationSchema={validation}
      onSubmit={(values) => {
        if (params.id === 'new') {
          dispatch(setFormSection(values));
          dispatch(saveCardPatient());
          navigation.push('/');
          dispatch(resetRegCard());
        } else {
          navigation.push('/');
          dispatch(resetRegCard());
        }
      }}>
      {({errors, isValidating}) => (
        <Row>
          <Col span={5}>
            <Card>
              <UserInfo error={errors.personal}/>
            </Card>
          </Col>
          <Col span={19} className={'wizard-tabs'}>
            <Tabs defaultActiveKey={'passport-general'}>
              <Tabs.TabPane
                forceRender={false}
                key={'passport-general'}
                tab={'Паспортные данные'}>
                <PassportGeneral error={errors}/>
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                key={'attached-docs'}
                tab={'Прикрепленные документы'}>
                <PersonDocuments />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Социальный статус'}
                key={'status'}>
                <SocialStatus />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Занятость'}
                key={'employment'}>
                <PersonEmployment />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Прикрепление'}
                key={'attachments'}>
                <Attachments />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Вид наблюдения'}
                key={'views-type'}>
                <ViewType />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Особенности'}
                key={'features'}>
                <Features />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Льготы'}
                key={'privileges'}>
                <Privileges />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Правонарушения'}
                key={'offences'}>
                <Offences />
              </Tabs.TabPane>
              <Tabs.TabPane forceRender={false} tab={'Связи'} key={'links'}>
                <Links />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Дополнительная диспансеризация'}
                key={'additional-hospitalization'}>
                <AdditionalHospitalization />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Госпитализация в другие ЛПУ'}
                key={'outside-hospitalization'}>
                <AdditionalHospitalization />
              </Tabs.TabPane>
              <Tabs.TabPane
                forceRender={false}
                tab={'Идентификаторы во внешних учетных системах'}
                key={'outside-idents'}>
                <OutsideIdent />
              </Tabs.TabPane>
              <Tabs.TabPane tab={'Прочее'} key={'etc'}>
                <Etc />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default RegCardWizard;
