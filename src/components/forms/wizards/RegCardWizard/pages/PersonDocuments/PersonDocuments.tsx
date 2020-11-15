import React, { useCallback } from 'react';
import { Col, Divider, Row } from 'antd';
import { useSelector } from 'react-redux';

import {
  detailedCMOSelector,
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

import PersonalIdent from '../../../../PersonDocumentsForm/components/sections/PersonalIdent/PersonalIdent';
import PersonPolicy from '../../../../PersonDocumentsForm/components/sections/PersonPolicy/PersonPolicy';
import SocialStatus from '../../../../PersonDocumentsForm/components/sections/SocialStatus/SocialStatus';
import NamedContract from '../../../../PersonDocumentsForm/components/sections/NamedContract/NamedContract';

const PersonDocuments: React.FC = () => {
  const policyTypes = useSelector(detailedPolicyTypesSelector);
  const policyKinds = useSelector(detailedPolicyKindsSelector);
  const cmoTypes = useSelector(detailedCMOSelector);

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

  const getCmoType = useCallback(
    (id: string) => {
      const type = cmoTypes.find((item) => item.id === parseInt(id));
      if (type) {
        return type.name;
      } else {
        return '';
      }
    },
    [cmoTypes],
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
            getCmoTypeId={getCmoType}
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
