import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Col, Divider, Row } from 'antd';
import PersonalIdent from './components/sections/PersonalIdent/PersonalIdent';
import PersonPolicy from './components/sections/PersonPolicy/PersonPolicy';
import SocialStatus from './components/sections/SocialStatus/SocialStatus';
import NamedContract from './components/sections/NamedContract/NamedContract';

const PersonDocumentsForm: FC = (props) => {
  const store = useFormContext();

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
  );
};

export default PersonDocumentsForm;
