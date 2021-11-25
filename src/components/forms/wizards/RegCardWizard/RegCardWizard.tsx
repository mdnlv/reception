import React, { useEffect, useState, useCallback } from 'react';
import { Formik } from 'formik';
import { Card, Col, Row, Spin, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import './styles.scss';
import {
  fetchRbPersonsSearch
} from '../../../../reduxStore/slices/rb/rbSlice';
import { RootState } from '../../../../reduxStore/store';
import {
  fetchIdPatient,
  saveCardPatient,
  setFormSection,
  resetRegCard,
  setPatientReg,
  editCardPatient,
} from '../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import {fetchPersonTreeFull} from "../../../../reduxStore/slices/personTree/personTreeSlice";
import validation from "./validation";
import {useWindowDimensions} from "../../../../hooks/windowDimensions";

import PassportGeneral from './pages/PassportGeneral/PassportGeneral';
import UserInfo from './pages/UserInfo/UserInfo';
import PersonDocuments from './pages/PersonDocuments/PersonDocuments';
import SocialStatus from './pages/SocialStatus/SocialStatus';
import PersonEmployment from './pages/PersonEmployment/PersonEmployment';
import Attachments from './pages/Attachments/Attachments';
import Features from './pages/Features/Features';
import Privileges from './pages/Privileges/Privileges';
import Links from './pages/Links/Links';
import AdditionalHospitalization from './pages/AdditionalHospitalization/AdditionalHospitalization';
import OutsideIdent from './pages/OutsideIdent/OutsideIdent';
import Etc from './pages/Etc/Etc';
import RegCardValidation from "../../../modals/RegCardValidation/RegCardValidation";

interface WizardProps {}

const RegCardWizard: React.FC<WizardProps> = () => {
  const navigation = useHistory();
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const {width} = useWindowDimensions();
  const store = useSelector(
    (state: RootState) => state.registrationCard.initialFormState,
  );
  const isLoading = useSelector(
    (state: RootState) => state.registrationCard.loading.idPatient,
  );
  const [showValidError, setShowValidError] = useState(false);
  const [activeTab, setActiveTab] = useState('passportGeneral');

  useEffect(() => {
    if (params.id !== 'new') {
      dispatch(resetRegCard());
      dispatch(fetchIdPatient(parseInt(params.id)));
    } else {
      dispatch(resetRegCard());
    }
  }, [params]);

  useEffect(() => {
    activeTab === 'passportGeneral' && width >= 1600
      ? document.body.style.overflow='hidden'
      : document.body.style.overflow='auto'
  }, [activeTab, width]);

  useEffect(() => {
    dispatch(fetchPersonTreeFull({group_by: 'orgStructure_id'}));
  }, []);

  const fetchDoctors = (value:string) =>{
    dispatch(fetchRbPersonsSearch({query:value}))
  }

  const getTabs = useCallback(() => (
    <Tabs defaultActiveKey="passportGeneral" activeKey={activeTab} onChange={setActiveTab}>
      <Tabs.TabPane
        forceRender={false}
        key={'passportGeneral'}
        tab={'Паспортные данные'}>
        <PassportGeneral/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        key={'personDocs'}
        tab={'Прикрепленные документы'}>
        <PersonDocuments/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        key={'socialStatus'}
        tab={'Социальный статус'}>
        <SocialStatus/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        key={'employment'}
        tab={'Занятость'}>
        <PersonEmployment/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        key={'attachments'}
        tab={'Прикрепление'}>
        <Attachments/>
      </Tabs.TabPane>
      <Tabs.TabPane forceRender={false} tab={'Связи'} key={'links'}>
        <Links/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        tab={'Особенности'}
        key={'features'}>
        <Features/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        tab={'Льготы'}
        key={'privileges'}>
        <Privileges/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        tab={'Дополнительная диспансеризация'}
        key={'additional-hospitalization'}>
        <AdditionalHospitalization/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        tab={'Госпитализация в другие ЛПУ'}
        key={'outside-hospitalization'}>
        <AdditionalHospitalization/>
      </Tabs.TabPane>
      <Tabs.TabPane
        forceRender={false}
        tab={'Идентификаторы во внешних учетных системах'}
        key={'outside-idents'}>
        <OutsideIdent/>
      </Tabs.TabPane>
      <Tabs.TabPane tab={'Прочее'} key={'etc'}>
        <Etc/>
      </Tabs.TabPane>
    </Tabs>
  ), [activeTab]);

  return isLoading ? (
    <Row style={{ height: '100vh' }} justify={'center'} align={'middle'}>
      <Spin />
    </Row>
  ) : (
    <Formik
      enableReinitialize
      initialValues={store}
      validationSchema={validation}
      onSubmit={(values) => {
        if (params.id === 'new') {
          dispatch(setFormSection(values));
          dispatch(saveCardPatient());
          navigation.push('/');
          dispatch(resetRegCard());
        } else {
          dispatch(setPatientReg({type: 'setPatientReg', value: parseInt(params.id)}));
          dispatch(setFormSection(values));
          dispatch(editCardPatient());
          navigation.push('/');
          dispatch(resetRegCard());
        }
      }}
    >
      {({errors}) => {
        return (
          <Row>
            <Col span={5}>
              <Card className={'card-userInfo'}>
                <UserInfo
                // @ts-ignore
                  errors={errors}
                  fetchDoctors={fetchDoctors}
                  onOpen={setShowValidError.bind(this, true)}
                />
              </Card>
            </Col>
            <Col span={19} className={'wizard-tabs'}>
              {getTabs()}
            </Col>
            <RegCardValidation
              isVisible={showValidError}
              onClose={() => setShowValidError(false)}
              // @ts-ignore
              errors={errors}
              setActiveTab={setActiveTab}
            />
          </Row>
        )
      }}
    </Formik>
  );
};

export default RegCardWizard;
