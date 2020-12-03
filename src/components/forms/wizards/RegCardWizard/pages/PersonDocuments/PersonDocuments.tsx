import React, { useCallback } from 'react';
import { Col, Divider, Row } from 'antd';
import { useSelector } from 'react-redux';

import {
  detailedCMOSelector,
  detailedDocumentTypesSelector,
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
  detailedSocialClassesSelector,
  detailedSocialTypesSelector,
  socialLoadingsSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

import PersonalIdent from '../../../../PersonDocumentsForm/components/sections/PersonalIdent/PersonalIdent';
import PersonPolicy from '../../../../PersonDocumentsForm/components/sections/PersonPolicy/PersonPolicy';
import SocialStatus from '../../../../PersonDocumentsForm/components/sections/SocialStatus/SocialStatus';
import NamedContract from '../../../../PersonDocumentsForm/components/sections/NamedContract/NamedContract';
import Status from '../SocialStatus/sections/Status/Status';
import PersonalDocument from '../PassportGeneral/sections/PersonalDocument/PersonalDocument';
import { RootState } from '../../../../../../reduxStore/store';

const PersonDocuments: React.FC = () => {
  const policyTypes = useSelector(detailedPolicyTypesSelector);
  const policyKinds = useSelector(detailedPolicyKindsSelector);
  const cmoTypes = useSelector(detailedCMOSelector);

  const socialTypesList = useSelector(detailedSocialTypesSelector);
  const socialClassesList = useSelector(detailedSocialClassesSelector);
  const documentTypesList = useSelector(detailedDocumentTypesSelector);
  const loadings = useSelector(socialLoadingsSelector);

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
      <Divider />
      <Row>
        <Col span={24}>
          <Status
            isLoadingClasses={loadings.classes}
            isLoadingTypes={loadings.types}
            socialClassesList={socialClassesList}
            socialTypesList={socialTypesList}
          />
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
