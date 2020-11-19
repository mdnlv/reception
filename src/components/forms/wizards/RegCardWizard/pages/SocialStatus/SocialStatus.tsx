import React from 'react';
import { Col, Row } from 'antd';
import StatusDocs from './sections/StatusDocs/StatusDocs';
import Status from './sections/Status/Status';
import { useSelector } from 'react-redux';
import {
  detailedDocumentTypesSelector,
  detailedSocialClassesSelector,
  detailedSocialTypesSelector,
  socialLoadingsSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

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
            socialClassesList={socialClassesList}
            socialTypesList={socialTypesList}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <StatusDocs documentTypesList={documentTypesList} />
        </Col>
      </Row>
    </form>
  );
};

export default SocialStatus;
