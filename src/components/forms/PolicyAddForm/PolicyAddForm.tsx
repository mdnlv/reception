import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { Button, Col, DatePicker, Row, Select, Space } from 'antd';
import FormField from '../components/FormField/FormField';
import moment from 'moment';
import { PassportPolicyType } from '../wizards/RegCardWizard/pages/PassportGeneral/types';
import FastInput from '../components/fields/FastInput/FastInput';

interface ListOptionItem {
  id: number;
  name: string;
}

interface FormProps {
  policyKey: 'policyOms' | 'policyDms';
  policyTimeType: ListOptionItem[];
  policyType: ListOptionItem[];
  onAddPolicy(policy: PassportPolicyType, type: 'oms' | 'dms'): void;
}

const initialState: PassportPolicyType = {
  timeType: '',
  from: '',
  to: '',
  serial: '',
  number: '',
  note: '',
  name: '',
  cmo: '',
  type: '',
};

const PolicyAddForm: React.FC<FormProps> = (props) => {
  const sectionTitle = () => {
    switch (props.policyKey) {
      case 'policyDms':
        return 'Полис ДМС';
      case 'policyOms':
        return 'Полис ОМС';
    }
  };

  const getPropsOptions = useCallback(
    (props: ListOptionItem[]) =>
      props.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      )),
    [props.policyTimeType, props.policyType],
  );

  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values) => {
        const pathName = props.policyKey === 'policyDms' ? 'dms' : 'oms';
        props.onAddPolicy(values, pathName);
      }}>
      {(formProps) => (
        <div
          className={`form-section policy-${
            props.policyKey === 'policyOms' ? 'omc' : 'dmc'
          }`}>
          <h2>{sectionTitle()}</h2>
          <Row className="form-row" align={'bottom'} gutter={16}>
            <Col span={4}>
              <FormField>
                <Select
                  value={formProps.values.timeType}
                  onChange={(val) => {
                    formProps.setFieldValue(`timeType`, val);
                  }}>
                  {getPropsOptions(props.policyTimeType)}
                </Select>
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label={'С'}>
                <DatePicker
                  value={
                    formProps.values.from
                      ? moment(formProps.values.from)
                      : undefined
                  }
                  onChange={(date, dateString) => {
                    formProps.setFieldValue(`from`, dateString);
                  }}
                />
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label={'До'}>
                <DatePicker
                  value={
                    formProps.values.to
                      ? moment(formProps.values.to)
                      : undefined
                  }
                  onChange={(date, dateString) => {
                    formProps.setFieldValue(`to`, dateString);
                  }}
                />{' '}
              </FormField>
            </Col>
          </Row>
          <Row className="form-row" gutter={16}>
            <Col span={6}>
              <FormField label={'Серия'}>
                <FastInput name={'serial'} />
              </FormField>
            </Col>
            <Col span={18}>
              <FormField label={'Номер'}>
                <FastInput name={'number'} />
              </FormField>
            </Col>
          </Row>
          <Row className="form-row" gutter={16}>
            <Col span={14}>
              <FormField label="СМО" labelPosition="left">
                <Select />
              </FormField>
            </Col>
            <Col span={10}>
              <FormField>
                <Select
                  value={formProps.values.type}
                  onChange={(val) => {
                    formProps.setFieldValue(`type`, val);
                  }}>
                  {getPropsOptions(props.policyType)}
                </Select>
              </FormField>
            </Col>
          </Row>
          <Row className="form-row">
            <Col span={24}>
              <FormField labelPosition="left" label="Название">
                <FastInput name={'name'} />
              </FormField>
            </Col>
          </Row>
          <Row className="form-row">
            <Col span={24}>
              <FormField labelPosition="left" label="Примечание">
                <FastInput name={'note'} />
              </FormField>
            </Col>
          </Row>
          <Row className="form-row" justify={'end'}>
            <Col>
              <Space>
                <Button type={'link'} danger>
                  Закрыть полис
                </Button>
                <Button
                  onClick={() => {
                    formProps.handleSubmit();
                  }}
                  type={'primary'}>
                  Добавить полис
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      )}
    </Formik>
  );
};

export default PolicyAddForm;
