import React, { FC, useCallback } from 'react';
import { Col, Divider, Row } from 'antd';
import PersonalIdent from './components/sections/PersonalIdent/PersonalIdent';
import PersonPolicy from './components/sections/PersonPolicy/PersonPolicy';
import SocialStatus from './components/sections/SocialStatus/SocialStatus';
import NamedContract from './components/sections/NamedContract/NamedContract';
import { useSelector } from 'react-redux';
import {
  detailedCMOSelector,
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
} from '../../../reduxStore/slices/rb/selectors';

const PersonDocumentsForm: FC = (props) => {
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

  return (
    <div>
      <form className={'person-documents-form'}>
        <Row>
          <Col span={24}>
            <PersonalIdent />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <PersonPolicy
              getCmoTypeId={getCmoType}
              getPolicyKindId={getPolicyIdKind}
              getPolicyTypeId={getPolicyIdType}
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
    </div>
  );
};

export default PersonDocumentsForm;
