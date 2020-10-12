import React, { useCallback } from 'react';
import { Col, Divider, Row } from 'antd';
import PersonalIdent from '../../../../PersonDocumentsForm/components/sections/PersonalIdent/PersonalIdent';
import PersonPolicy from '../../../../PersonDocumentsForm/components/sections/PersonPolicy/PersonPolicy';
import SocialStatus from '../../../../PersonDocumentsForm/components/sections/SocialStatus/SocialStatus';
import NamedContract from '../../../../PersonDocumentsForm/components/sections/NamedContract/NamedContract';
import { useFormContext } from 'react-hook-form';
import { RegistrationCardStateType } from '../../../../../../reduxStore/slices/registrationCard/initialState';
import { useSelector } from 'react-redux';
import {
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

const PersonDocuments: React.FC = (props) => {
  const form = useFormContext<RegistrationCardStateType>();

  const policyTypes = useSelector(detailedPolicyTypesSelector);
  const policyKinds = useSelector(detailedPolicyKindsSelector);

  const getPolicyIdType = useCallback(
    (id: string) => {
      const type = policyTypes.find((item) => item.id === parseInt(id));
      if (type) {
        return type.name;
      } else {
        return '';
      }
    },
    [policyTypes],
  );

  const getPolicyIdKind = useCallback(
    (id: string) => {
      const kind = policyKinds.find((item) => item.id === parseInt(id));
      if (kind) {
        return kind.name;
      } else {
        return '';
      }
    },
    [policyKinds],
  );

  return (
    <form className={'wizard-step person-documents-page card-page'}>
      <Row>
        <Col span={24}>
          <PersonalIdent />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <PersonPolicy
            getPolicyTypeId={getPolicyIdType}
            getPolicyKindId={getPolicyIdKind}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <SocialStatus />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <NamedContract />
        </Col>
      </Row>
    </form>
  );
};

export default PersonDocuments;
