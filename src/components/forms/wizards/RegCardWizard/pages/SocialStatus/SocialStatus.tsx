import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import {
  detailedDocumentTypesSelector,
  detailedSocialClassesSelector,
  detailedSocialTypesSelector,
  socialLoadingsSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

import Status from './sections/Status/Status';

const SocialStatus: React.FC = () => {
  const socialTypesList = useSelector(detailedSocialTypesSelector);
  const socialClassesList = useSelector(detailedSocialClassesSelector);
  const documentTypesList = useSelector(detailedDocumentTypesSelector);
  const loadings = useSelector(socialLoadingsSelector);

  return (
    <form className={'wizard-step social-status-form'}>
      <Row>
        <Col span={24}>
          <Status
            isLoadingClasses={loadings.classes}
            isLoadingTypes={loadings.types}
            isLoadingDocuments={loadings.documents}
            // @ts-ignore
            socialClassesList={socialClassesList}
            socialTypesList={socialTypesList}
            documentTypesList={documentTypesList}
          />
        </Col>
      </Row>
    </form>
  );
};

export default SocialStatus;
