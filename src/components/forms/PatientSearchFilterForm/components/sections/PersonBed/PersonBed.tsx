import React, { useCallback } from 'react';
import { Col, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

interface SectionProps {
  orgs: { id: number; name: string }[];
}

const PersonBed: React.FC<SectionProps> = ({ orgs }) => {
  const bedTypeList = ['не задано', 'на лечении', 'на выписке', 'в очереди'];

  const betTypeOptionsList = useCallback(() => {
    return bedTypeList.map((item, index) => (
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
      <h2>По койкам</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <FastSearchSelect
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              size={'small'}
              name={'bedProfileTypeId'}>
              {betTypeOptionsList()}
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
              allowClear
              size="small"
              name={'bedProfileOrgStructureId'}>
              {orgsOptionsList()}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonBed;
