import React from 'react';
import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import {Col, DatePicker, Input, Row, Select} from 'antd';
import FormField from '../../../../components/FormField/FormField';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';

const DROPDOWN_TITLE = 'Прочее';

enum LABELS {
  INFO = 'Вы получили информацию о нашем учереждении',
  DATA = 'Дата',
  NOTE = 'Примечание',
}

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
                <Row gutter={16}>
                  <Col>
                    <FormField label={LABELS.INFO}>
                      <Select />
                    </FormField>
                  </Col>
                  <Col>
                    <FormField label={LABELS.DATA}>
                      <DatePicker />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormField label={LABELS.NOTE}>
                      <Input.TextArea />
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
