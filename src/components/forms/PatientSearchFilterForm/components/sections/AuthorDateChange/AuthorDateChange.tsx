import React, { useCallback } from 'react';
import { Checkbox, Col, DatePicker, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import FormState from '../../../types';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';

interface SectionProps {
  persons: { id: number; name: string }[];
}

const AuthorDateChange: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<FormState>();

  const getPersonsOptions = useCallback(() => {
    return props.persons.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }, []);

  return (
    <div className={'form-section'}>
      <h2>По автору и дате изменения</h2>
      <Row align={'stretch'} gutter={8}>
        <Col span={12}>
          <FormField label={'автор создания'} labelPosition={'right'}>
            <Checkbox
              name={'authorAndDate.isAuthor'}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
        <Col span={12}>
          <FormField
            label={'автор последнего изменения'}
            labelPosition={'right'}>
            <Checkbox
              name={'authorAndDate.isLastChangedDate'}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <FormField>
            <FastSearchSelect
              size={'small'}
              filterOption
              allowClear
              showSearch
              optionFilterProp={'name'}
              name={'createPersonId'}>
              {getPersonsOptions()}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row gutter={8} align={'bottom'}>
        <Col span={6}>
          <FormField label={'Дата создания'}>
            <DatePicker size={'small'} />
          </FormField>
        </Col>
        <Col span={6}>
          <FormField>
            <DatePicker size={'small'} />
          </FormField>
        </Col>
        <Col span={6}>
          <FormField label={'Обращались'}>
            <DatePicker size={'small'} />
          </FormField>
        </Col>
        <Col span={6}>
          <FormField label={'Первично'}>
            <DatePicker size={'small'} />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default AuthorDateChange;
