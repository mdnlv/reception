import React, {useEffect, useState} from 'react';
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

import PersonalDocument from './sections/PersonalDocument/PersonalDocument';
import PersonalContacts from './sections/PersonalContacts/PersonalContacts';
import PolicyAddForm from '../../../../PolicyAddForm/PolicyAddForm';
import PoliciesFound from "../../../../../modals/PoliciesFound/PoliciesFound";
import DocumentedAddress from "./sections/DocumentedAddress/DocumentedAddress";
import AddressRegistration from "./sections/AddressRegistration/AddressRegistration";

const PassportGeneral: React.FC = () => {
  const dispatch = useDispatch();
  const {item, isLoading} = useSelector((state: RootState) => state.registrationCard.form.foundPolicy);
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
  const policyFoundValues = ['timeType', 'to', 'from', 'cmo', 'serial', 'number', 'enp', 'lpu', 'lpuDate', 'doctorLPU'];
  const [isPolicyTyping, setPolicyTyping] = useState(true);
  const [policyBufferValues, setPolicyBufferValues] = useState(policyFoundValues);

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
    setPolicyTyping(true);
    setPolicyBufferValues(policyFoundValues);
  };

  const onOkModal = () => {
    dispatch(setPoliciesFoundMessage(false));
    setPolicyBufferValues(policyFoundValues);
  };

  return (
    <form className="wizard-step passport-general-form">
      <Row align={'stretch'}>
        <Col span={12}>
          <DocumentedAddress
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
          <AddressRegistration
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
            isLoading={isLoading}
            isCmoLoading={organisations}
            foundPolicy={item}
            policyKey={'policyOms'}
            policyTimeType={policyKindsList}
            policyType={policyTypesList}
            onFindPolicy={onFindPatientPolicy}
            kladr={rbKladrDocumented}
            isTyping={isPolicyTyping}
            setTyping={setPolicyTyping}
          />
        </Col>
        <Col span={12}>
          <PolicyAddForm
            cmoType={cmoTypeList}
            isLoading={isLoading}
            isCmoLoading={organisations}
            policyKey={'policyDms'}
            policyTimeType={policyKindsList}
            policyType={policyTypesList}
            onFindPolicy={onFindPatientPolicy}
            kladr={rbKladrDocumented}
            isTyping={isPolicyTyping}
            setTyping={setPolicyTyping}
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
        isVisible={policiesFoundMessage && !isLoading}
        policy={item}
        onClose={onCloseModal.bind(this)}
        onOk={onOkModal.bind(this)}
        cmoType={cmoTypeList}
      />
    </form>
  );
};

export default PassportGeneral;
