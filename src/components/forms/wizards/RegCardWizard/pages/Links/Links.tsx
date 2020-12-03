import React from 'react';
import { Col, Divider, Row, Select } from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';
import FormField from '../../../../components/FormField/FormField';

const Links: React.FC = () => {
  return (
    <form className={'wizard-step links-form'}>
      <div className="form-section">
        <DropDownContent title={DROPDOWN_TITLE}>
          <Row>
            <Col span={24}>
              <FormArrayField
                values={[]}
                name={'directLinks'}
                renderChild={(key, index) => (
                  <Row key={index} gutter={16}>
                    <Col span={5}>
                      <FormField label={LABELS.DIRECT_LINK}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col span={7}>
                      <FormField label={LABELS.WITH_PATIENT}>
                        <Select />
                      </FormField>
                    </Col>
                  </Row>
                )}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <FormArrayField
                values={[]}
                name={'backLinks'}
                renderChild={(key, index) => (
                  <Row key={index} gutter={16}>
                    <Col span={5}>
                      <FormField label={'Обратная связь'}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col span={7}>
                      <FormField label={'Связан с пациентом'}>
                        <Select />
                      </FormField>
                    </Col>
                  </Row>
                )}
              />
            </Col>
          </Row>
        </DropDownContent>
      </div>
    </form>
  );
};

export default Links;
