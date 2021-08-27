import React, { useEffect, useState, useCallback } from 'react';
import { Formik } from 'formik';
import { Card, Col, Row, Spin, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router';
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
import validation from "./validation";

import PassportGeneral from './pages/PassportGeneral/PassportGeneral';
import UserInfo from './pages/UserInfo/UserInfo';
import Links from './pages/Links/Links';
import RegCardValidation from "../../../modals/RegCardValidation/RegCardValidation";

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
  const [showValidError, setShowValidError] = useState(false);
  const [showUnknownModal, setShowUnknownModal] = useState(false);

  useEffect(() => {
    if (params.id !== 'new') {
      dispatch(resetRegCard());
      dispatch(fetchIdPatient(parseInt(params.id)));
    } else {
      dispatch(resetRegCard());
    }
  }, [params]);

  const fetchDoctors = (value:string) =>{
    dispatch(fetchRbPersonsSearch({query:value}))
  }

  const getTabs = useCallback(() => (
    <Tabs defaultActiveKey="passportGeneral">
      <Tabs.TabPane
        forceRender={false}
        key={'passportGeneral'}
        tab={'Паспортные данные'}>
        <PassportGeneral/>
      </Tabs.TabPane>
      <Tabs.TabPane forceRender={false} tab={'Связи'} key={'links'}>
        <Links/>
      </Tabs.TabPane>
    </Tabs>
  ), []);

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
        if (
          values.isUnknown
            && (values.personal.sex !== null)
            && !values.personal.birthDate
            && !values.passportGeneral.passportInfo.addressRegistration.freeInput
        ) {
          setShowUnknownModal(true);
        } else if (!values.isUnknown) {
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
                  showUnknown={showUnknownModal}
                  setShowUnknown={setShowUnknownModal}
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
            />
          </Row>
        )
      }}
    </Formik>
  );
};

export default RegCardWizard;
