import React, { useCallback } from 'react';
import { Col, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

const PersonAttachment: React.FC = () => {
  const attachmentCategoryList = ['-', 'Постоянное', 'Временное', 'Выбыл'];

  const attachmentCategoryOptionsList = useCallback(() => {
    return attachmentCategoryList.map((item, index) => (
      <Select.Option key={index} name={item} value={index}>
        {item}
      </Select.Option>
    ));
  }, []);

  return (
    <div className={'form-section'}>
      <h2>Прикрепление</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <FastSearchSelect
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              size={'small'}
              name={'attachmentCategoryId'}>
              {attachmentCategoryOptionsList()}
            </FastSearchSelect>
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
