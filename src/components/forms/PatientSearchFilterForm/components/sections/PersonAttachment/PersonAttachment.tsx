import React from 'react';
import { Col, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';

const PersonAttachment: React.FC = (props) => {
  const form = useFormikContext<PartialFormState>();

  const attachmentCategoryList = ['-', 'Постоянное', 'Временное', 'Выбыл'];

  const attachmentCategoryOptionsList = attachmentCategoryList.map(
    (item, index) => (
      <Select.Option key={index} value={index}>
        {item}
      </Select.Option>
    ),
  );

  return (
    <div className={'form-section'}>
      <h2>Прикрепление</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <Select
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              value={form.values.attachmentCategoryId}
              onChange={(val) => {
                form.setFieldValue('attachmentCategoryId', val);
              }}
              size={'small'}>
              {attachmentCategoryOptionsList}
            </Select>
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormField>
            <Select size={'small'} />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonAttachment;
