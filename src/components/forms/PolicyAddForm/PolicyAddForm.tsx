import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { Button, Col, Row, Select, Space } from 'antd';
import FormField from '../components/FormField/FormField';
import moment from 'moment';
import { PassportPolicyType } from '../wizards/RegCardWizard/pages/PassportGeneral/types';
import FastInput from '../components/fields/FastInput/FastInput';
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../components/fields/FastSearchSelect/FastSearchSelect';

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
                <FastSearchSelect name={'timeType'}>
                  {getPropsOptions(props.policyTimeType)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label={'С'}>
                <FastDatePicker
                  value={
                    formProps.values.from
                      ? moment(formProps.values.from)
                      : undefined
                  }
                  name={'from'}
                />
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label={'До'}>
                <FastDatePicker
                  value={
                    formProps.values.to
                      ? moment(formProps.values.to)
                      : undefined
                  }
                  name={'to'}
                />
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
                <FastSearchSelect name={'cmo'} />
              </FormField>
            </Col>
            <Col span={10}>
              <FormField>
                <FastSearchSelect name={'type'}>
                  {getPropsOptions(props.policyType)}
                </FastSearchSelect>
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
