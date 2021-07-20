import React from 'react';
import {Col, Input, Row} from 'antd';

import {LABELS} from "./types";

import FormField from '../../../../components/FormField/FormField';

const Etc: React.FC = () => {
  return (
    <form className={'wizard-step etc-form'}>
      <div className="form-section">
        <Row>
          <Col>
            <FormField label={LABELS.NOTE}>
              <Input.TextArea cols={120} rows={10}/>
            </FormField>
          </Col>
        </Row>
      </div>
    </form>
  );
};

export default Etc;
