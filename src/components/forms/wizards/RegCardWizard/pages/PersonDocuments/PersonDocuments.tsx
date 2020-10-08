import React from 'react';
import PersonDocumentsForm from '../../../../PersonDocumentsForm/PersonDocumentsForm';
import { Col, Divider, Row } from 'antd';
import PersonalIdent from '../../../../PersonDocumentsForm/components/sections/PersonalIdent/PersonalIdent';
import PersonPolicy from '../../../../PersonDocumentsForm/components/sections/PersonPolicy/PersonPolicy';
import SocialStatus from '../../../../PersonDocumentsForm/components/sections/SocialStatus/SocialStatus';
import NamedContract from '../../../../PersonDocumentsForm/components/sections/NamedContract/NamedContract';
import { useFormContext } from 'react-hook-form';
import { RegistrationCardStateType } from '../../../../../../reduxStore/slices/registrationCard/initialState';

const PersonDocuments: React.FC = (props) => {
  const form = useFormContext<RegistrationCardStateType>();

  return (
    <div className={'person-documents-page card-page'}>
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
              <PersonPolicy />
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
    </div>
  );
};

export default PersonDocuments;
