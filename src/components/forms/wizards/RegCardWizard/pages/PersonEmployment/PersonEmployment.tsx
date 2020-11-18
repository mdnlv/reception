import React from 'react';
import { Col, Row } from 'antd';
import Employment from './sections/Employment/Employment';
import Hazard from './sections/Hazard/Hazard';
import { useSelector } from 'react-redux';
import {
  detailedHurtFactorTypesSelector,
  detailedHurtTypesSelector,
  detailedOrganisationsSelector,
  hazardLoadingsSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';

const PersonEmployment: React.FC = (props) => {
  const orgsList = useSelector(detailedOrganisationsSelector);
  const hurtTypesList = useSelector(detailedHurtTypesSelector);
  const hurtFactorTypesList = useSelector(detailedHurtFactorTypesSelector);
  const loadings = useSelector(hazardLoadingsSelector);

  return (
    <form className={'wizard-step employment-form'}>
      <Row>
        <Col span={24}>
          <Employment isLoadingOrgs={loadings.orgs} orgsList={orgsList} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Hazard
            isLoadingOrgs={loadings.orgs}
            isLoadingHurtTypes={loadings.types}
            isLoadingHurtFactorTypes={loadings.factorTypes}
            orgsList={orgsList}
            hurtTypesList={hurtTypesList}
            hurtFactorTypesList={hurtFactorTypesList}
          />
        </Col>
      </Row>
    </form>
  );
};

export default PersonEmployment;
