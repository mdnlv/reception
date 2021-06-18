import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import {
  detailedOrganisationsSelector,
  hazardLoadingsSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

import Employment from './sections/Employment/Employment';

const PersonEmployment: React.FC = () => {
  const orgsList = useSelector(detailedOrganisationsSelector);
  const loadings = useSelector(hazardLoadingsSelector);

  return (
    <form className={'wizard-step employment-form'}>
      <Row>
        <Col span={24}>
          <Employment isLoadingOrgs={loadings.orgs} orgsList={orgsList} />
        </Col>
      </Row>
    </form>
  );
};

export default PersonEmployment;
