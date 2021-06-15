import React, { useCallback } from 'react';
import { Col, Divider, Row } from 'antd';
import { useSelector } from 'react-redux';

import {
  detailedCMOSelector,
  detailedDocumentTypesSelector,
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';
import {RootState} from '../../../../../../reduxStore/store';

import PersonPolicy from '../../../../PersonDocumentsForm/components/sections/PersonPolicy/PersonPolicy';
import PersonalDocument from '../PassportGeneral/sections/PersonalDocument/PersonalDocument';

const PersonDocuments: React.FC = () => {
  const policyTypes = useSelector(detailedPolicyTypesSelector);
  const policyKinds = useSelector(detailedPolicyKindsSelector);
  const cmoTypes = useSelector(detailedCMOSelector);

  const documentTypesList = useSelector(detailedDocumentTypesSelector);

  const { documentTypes } = useSelector((state: RootState) => state.rb.loading);

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
          <PersonalDocument
            isLoadingDocuments={documentTypes}
            documentTypes={documentTypesList}
          />
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
    </form>
  );
};

export default PersonDocuments;
