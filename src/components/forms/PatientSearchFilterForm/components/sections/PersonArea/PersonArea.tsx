import React from 'react';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';
import { Col, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';

interface AreaProps {
  orgs: { id: number; name: string }[];
}

const PersonArea: React.FC<AreaProps> = (props) => {
  const form = useFormikContext<PartialFormState>();

  const areaTypeList = [
    'Регистрация',
    'Проживание',
    'Регистрация или проживание',
    'Прикрепление',
    'Регистрация или прикрепление',
    'Проживание или прикрепление',
    'Регистрация, проживание или прикрепление',
  ];

  const areaOptionsList = areaTypeList.map((item, index) => (
    <Select.Option key={index} name={item} value={index}>
      {item}
    </Select.Option>
  ));

  const orgsOptionsList = props.orgs.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  return (
    <div className={'form-section'}>
      <h2>По участку</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <Select
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              value={form.values.areaTypeId}
              onChange={(val) => {
                form.setFieldValue('areaTypeId', val);
              }}
              size={'small'}>
              {areaOptionsList}
            </Select>
          </FormField>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormField>
            <Select
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              value={form.values.areaOrgStructureId}
              onChange={(val) => {
                form.setFieldValue('areaOrgStructureId', val);
              }}
              size={'small'}>
              {orgsOptionsList}
            </Select>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonArea;
