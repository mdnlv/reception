import React, { useCallback } from 'react';
import { Checkbox, Col, DatePicker, Row, Select } from 'antd/lib';
import { useFormikContext } from 'formik';

import FormState from '../../../types';
import {SectionProps} from "./types";

import FormField from '../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

const AuthorDateChange: React.FC<SectionProps> = ({persons}) => {
  const form = useFormikContext<FormState>();

  const getPersonsOptions = useCallback(() => {
    return persons.map((item) => (
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
