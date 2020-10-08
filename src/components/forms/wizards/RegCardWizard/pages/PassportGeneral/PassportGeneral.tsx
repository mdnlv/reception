import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KladrItem from '../../../../../../types/data/KladrItem';
import { Col, Divider, Row } from 'antd';
import Address from './sections/Address/Address';
import Policy from './sections/Policy/Policy';
import PersonalDocument from './sections/PersonalDocuments/PersonalDocuments';
import PersonalContacts from './sections/PersonalContacts/PersonalContacts';
import {
  fetchKladr,
  fetchKladrNested,
  fetchKladrStreets,
  KladrDocType,
} from '../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import {
  kladrLoadingsSelector,
  kladrSelector,
} from '../../../../../../reduxStore/slices/registrationCard/selectors';
import { RootState } from '../../../../../../reduxStore/store';
import {
  detailedContactTypesSelector,
  detailedDocumentTypesSelector,
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

const PassportGeneral: React.FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  useEffect(() => {
    dispatch(fetchKladr({}));
  }, []);

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

  const dispatch = useDispatch();

  function fetchNestedKladr(id: string, type: KladrDocType) {
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
          <Policy
            policyKey="policyOms"
            policyTimeType={policyTypesList}
            policyType={policyKindsList}
          />
        </Col>
        <Col span={12}>
          <Policy
            policyKey="policyDms"
            policyTimeType={policyTypesList}
            policyType={policyKindsList}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12} className={'col--border-right'}>
          <PersonalDocument documentTypes={documentTypesList} />
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
