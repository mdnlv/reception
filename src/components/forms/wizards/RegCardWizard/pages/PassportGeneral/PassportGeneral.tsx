import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Divider, Row } from 'antd';

import {
  fetchKladr,
  fetchKladrNested,
  fetchKladrStreets,
  findPatientPolicy,
  resetPoliciesFound,
  setPoliciesFoundMessage,
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
import KladrItem from '../../../../../../types/data/KladrItem';
import FindPolicyParams from '../../../../../../interfaces/payloads/patients/findPatientPolicy';
import { RootState } from '../../../../../../reduxStore/store';
import { KladrDocType } from '../../../../../../reduxStore/slices/registrationCard/types';

import Address from './sections/Address/Address';
import PersonalDocument from './sections/PersonalDocument/PersonalDocument';
import PersonalContacts from './sections/PersonalContacts/PersonalContacts';
import PolicyAddForm from '../../../../PolicyAddForm/PolicyAddForm';
import PoliciesFound from "../../../../../modals/PoliciesFound/PoliciesFound";

const PassportGeneral: React.FC = () => {
  const dispatch = useDispatch();
  const { dms, oms } = useSelector(
    (state: RootState) => state.registrationCard.form.foundPolicies,
  );
  const {policiesFoundMessage} = useSelector(
    (state: RootState) => state.registrationCard,
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

  useEffect(() => {
    rbKladrDocumented.length === 0 && rbKladrRegistration.length === 0 && dispatch(fetchKladr({}));
  }, []);

  const fetchNestedKladr = (id: string, type: KladrDocType, value:string) => {
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
      dispatch(fetchKladrNested({ id: rbKladrItem.prefix, type,value }));
    }
  };

  const fetchKladrStreetsItems = (id: string, type: KladrDocType,value:string) => {
    dispatch(fetchKladrStreets({ id, type,value }));
  };

  const onFindPatientPolicy = (payload: FindPolicyParams) => {
    dispatch(findPatientPolicy(payload));
  };

  const onCloseModal = () => {
    dispatch(resetPoliciesFound());
    dispatch(setPoliciesFoundMessage(false));
  };

  const onOkModal = () => {
    dispatch(setPoliciesFoundMessage(false));
  };

  return (
    <form className="wizard-step passport-general-form">
      <Row align={'stretch'}>
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
            onFindPolicy={onFindPatientPolicy}
          />
        </Col>
        <Col span={12}>
          <PolicyAddForm
            cmoType={cmoTypeList}
            isLoading={dms.isLoading}
            isCmoLoading={organisations}
            policyKey={'policyDms'}
            policyTimeType={policyKindsList}
            policyType={policyTypesList}
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
      <PoliciesFound
        isVisible={policiesFoundMessage && !oms.isLoading}
        policy={oms.items[0]}
        onClose={onCloseModal.bind(this)}
        onOk={onOkModal.bind(this)}
        cmoType={cmoTypeList}
      />
    </form>
  );
};

export default PassportGeneral;
