import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KladrItem from '../../../../../../types/data/KladrItem';
import { Col, Divider, Row } from 'antd';
import Address from './sections/Address/Address';
import PersonalDocument from './sections/PersonalDocuments/PersonalDocuments';
import PersonalContacts from './sections/PersonalContacts/PersonalContacts';
import {
  fetchKladr,
  fetchKladrNested,
  fetchKladrStreets,
  findPatientPolicy,
  KladrDocType,
} from '../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import {
  kladrLoadingsSelector,
  kladrSelector,
} from '../../../../../../reduxStore/slices/registrationCard/selectors';
import {
  detailedCMOSelector,
  detailedContactTypesSelector,
  detailedDocumentTypesSelector,
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';
import PolicyAddForm from '../../../../PolicyAddForm/PolicyAddForm';
import { PassportPolicyType } from './types';
import { useFormikContext } from 'formik';
import FindPolicyParams from '../../../../../../interfaces/payloads/patients/findPatientPolicy';
import { RootState } from '../../../../../../reduxStore/store';
import { WizardStateType } from '../../types';

interface SectionProps {}

const PassportGeneral: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<WizardStateType>();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(form.values.passportGeneral.passportInfo);
  }, [form.values.passportGeneral.passportInfo]);

  useEffect(() => {
    dispatch(fetchKladr({}));
  }, []);
  const { dms, oms } = useSelector(
    (state: RootState) => state.registrationCard.form.foundPolicies,
  );

  const {
    rbKladrDocumented,
    rbKladrNestedDocumented,
    rbKladrNestedRegistration,
    rbKladrRegistration,
    rbKladrStreetsDocumented,
    rbKladrStreetsRegistration,
  } = useSelector(kladrSelector);
  const {
    isLoadingKladrDocumented,
    isLoadingKladrNestedDocumented,
    isLoadingKladrNestedRegistration,
    isLoadingKladrRegistration,
    isLoadingKladrStreetsDocumented,
    isLoadingKladrStreetsRegistration,
  } = useSelector(kladrLoadingsSelector);

  const policyTypesList = useSelector(detailedPolicyTypesSelector);
  const policyKindsList = useSelector(detailedPolicyKindsSelector);
  const documentTypesList = useSelector(detailedDocumentTypesSelector);
  const contactTypesList = useSelector(detailedContactTypesSelector);
  const cmoTypeList = useSelector(detailedCMOSelector);
  const { organisations, documentTypes } = useSelector(
    (state: RootState) => state.rb.loading,
  );

  function fetchNestedKladr(id: string, type: KladrDocType) {
    console.log(id, type);
    let rbKladrItem: KladrItem | undefined;

    switch (type) {
      case 'documented':
        rbKladrItem = rbKladrDocumented.find((item) => item.id === id);
        break;
      case 'registration':
        rbKladrItem = rbKladrRegistration.find((item) => item.id === id);
        break;
    }

    if (rbKladrItem) {
      dispatch(fetchKladrNested({ id: rbKladrItem.prefix, type }));
    }
  }

  function fetchKladrStreetsItems(id: string, type: KladrDocType) {
    dispatch(fetchKladrStreets({ id, type }));
  }

  function onAddPolicy(policy: PassportPolicyType, type: 'oms' | 'dms') {
    let policyItems: PassportPolicyType[] = [] as PassportPolicyType[];
    switch (type) {
      case 'dms':
        policyItems = form.values.passportGeneral.policyDms;
        break;
      case 'oms':
        policyItems = form.values.passportGeneral.policyOms;
        break;
    }
    const pathName = type === 'oms' ? 'Oms' : 'Dms';
    policyItems = [...policyItems, policy];
    form.setFieldValue(`passportGeneral.policy${pathName}`, policyItems);
  }

  function onFindPatientPolicy(payload: FindPolicyParams, type: 'oms' | 'dms') {
    dispatch(findPatientPolicy({ params: payload, type }));
  }

  return (
    <form className="wizard-step passport-general-form">
      <Row align={'stretch'}>
        <Col span={12} className={'col--border-right'}>
          <Address
            passportType="addressRegistration"
            isLoadingKladr={isLoadingKladrRegistration}
            isLoadingKladrNested={isLoadingKladrNestedRegistration}
            isLoadingKladrStreets={isLoadingKladrStreetsRegistration}
            getKladrNested={fetchNestedKladr}
            getKladrStreets={fetchKladrStreetsItems}
            kladr={rbKladrRegistration}
            nestedKladr={rbKladrNestedRegistration}
            kladrStreets={rbKladrStreetsRegistration}
          />
        </Col>
        <Col span={12}>
          <Address
            passportType="documentedAddress"
            isLoadingKladr={isLoadingKladrDocumented}
            isLoadingKladrNested={isLoadingKladrNestedDocumented}
            isLoadingKladrStreets={isLoadingKladrStreetsDocumented}
            getKladrNested={fetchNestedKladr}
            getKladrStreets={fetchKladrStreetsItems}
            kladr={rbKladrDocumented}
            nestedKladr={rbKladrNestedDocumented}
            kladrStreets={rbKladrStreetsDocumented}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12} className={'col--border-right'}>
          <PolicyAddForm
            cmoType={cmoTypeList}
            isLoading={oms.isLoading}
            isCmoLoading={organisations}
            foundPolicy={oms.items[0]}
            policyKey={'policyOms'}
            policyTimeType={policyKindsList}
            policyType={policyTypesList}
            onAddPolicy={onAddPolicy}
            onFindPolicy={onFindPatientPolicy}
          />
        </Col>
        <Col span={12}>
          <PolicyAddForm
            cmoType={cmoTypeList}
            foundPolicy={dms.items[0]}
            isLoading={dms.isLoading}
            isCmoLoading={organisations}
            policyKey={'policyDms'}
            policyTimeType={policyKindsList}
            policyType={policyTypesList}
            onAddPolicy={onAddPolicy}
            onFindPolicy={onFindPatientPolicy}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12} className={'col--border-right'}>
          <PersonalDocument
            isLoadingDocuments={documentTypes}
            documentTypes={documentTypesList}
          />
        </Col>
        <Col span={12}>
          <PersonalContacts contactTypes={contactTypesList} />
        </Col>
      </Row>
      <Divider />
    </form>
  );
};

export default PassportGeneral;
