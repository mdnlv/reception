import React from 'react';
import { Col, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';

interface SectionProps {
  orgs: { id: number; name: string }[];
}

const PersonBed: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<PartialFormState>();

  const bedTypeList = ['не задано', 'на лечении', 'на выписке', 'в очереди'];

  const betTypeOptionsList = bedTypeList.map((item, index) => (
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
      <h2>По койкам</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <Select
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              value={form.values.bedProfileTypeId}
              onChange={(val) => {
                form.setFieldValue('bedProfileTypeId', val);
              }}
              size={'small'}>
              {betTypeOptionsList}
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
              value={form.values.bedProfileOrgStructureId}
              onChange={(val) => {
                form.setFieldValue('bedProfileOrgStructureId', val);
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

export default PersonBed;
