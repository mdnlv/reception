import React, { useCallback } from 'react';
import { Col, Row, Select } from 'antd/lib';
import FormField from '../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

interface AreaProps {
  orgs: { id: number; name: string }[];
}

const PersonArea: React.FC<AreaProps> = ({ orgs }) => {
  const areaTypeList = [
    'Регистрация',
    'Проживание',
    'Регистрация или проживание',
    'Прикрепление',
    'Регистрация или прикрепление',
    'Проживание или прикрепление',
    'Регистрация, проживание или прикрепление',
  ];

  const areaOptionsList = useCallback(() => {
    return areaTypeList.map((item, index) => (
      <Select.Option key={index} name={item} value={index}>
        {item}
      </Select.Option>
    ));
  }, []);

  const orgsOptionsList = useCallback(() => {
    return orgs.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }, [orgs]);

  return (
    <div className={'form-section'}>
      <h2>По участку</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <FastSearchSelect
              showSearch
              filterOption
              size={'small'}
              optionFilterProp={'name'}
              allowClear
              name={'areaTypeId'}>
              {areaOptionsList()}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormField>
            <FastSearchSelect
              showSearch
              filterOption
              optionFilterProp={'name'}
              size={'small'}
              allowClear
              name={'areaOrgStructureId'}>
              {orgsOptionsList()}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonArea;
