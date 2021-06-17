import React from 'react';
import {Col, Input, Row} from 'antd';

import {DROPDOWN_TITLE, LABELS} from "./types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';

const Etc: React.FC = () => {
  return (
    <form className={'wizard-step etc-form'}>
      <div className="form-section">
        <DropDownContent title={DROPDOWN_TITLE}>
          <FormArrayField
            values={[]}
            name={'items'}
            renderChild={(key, index) => (
              <div key={index}>
                <Row>
                  <Col>
                    <FormField label={LABELS.NOTE}>
                      <Input.TextArea cols={120} rows={10}/>
                    </FormField>
                  </Col>
                </Row>
              </div>
            )}
          />
        </DropDownContent>
      </div>
    </form>
  );
};

export default Etc;
