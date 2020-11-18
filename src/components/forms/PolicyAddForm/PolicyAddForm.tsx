import React, { useCallback, useMemo } from 'react';
import { Formik } from 'formik';
import { Button, Col, Row, Select, Space } from 'antd';
import moment from 'moment';

import { PassportPolicyType } from '../wizards/RegCardWizard/pages/PassportGeneral/types';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import { FormProps, ListOptionItem } from './types';

import FormField from '../components/FormField/FormField';
import FastInput from '../components/fields/FastInput/FastInput';
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../components/fields/FastSearchSelect/FastSearchSelect';

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

const PolicyAddForm: React.FC<FormProps> = ({
  policyKey,
  policyType,
  policyTimeType,
  onFindPolicy,
  foundPolicy,
  onAddPolicy,
  isLoading,
  isCmoLoading,
  cmoType,
}) => {
  const sectionTitle = () => {
    switch (policyKey) {
      case 'policyDms':
        return 'Полис ДМС';
      case 'policyOms':
        return 'Полис ОМС';
    }
  };

  const getPropsOptions = useCallback(
    (props: ListOptionItem[]) =>
      props.map((item) => (
        <Select.Option key={item.id} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      )),
    [policyTimeType, policyType],
  );

  const onFindPolicyHandler = useCallback(
    (values: FindPolicyParams) => {
      onFindPolicy(values, policyKey === 'policyDms' ? 'dms' : 'oms');
    },
    [onFindPolicy],
  );

  const initialFormState = useMemo(() => {
    if (foundPolicy) {
      return {
        from: foundPolicy.from.toString(),
        to: foundPolicy.to.toString(),
        serial: foundPolicy.serial,
        number: foundPolicy.number,
        note: '',
        name: foundPolicy.name,
        ...initialState,
      };
    } else {
      return initialState;
    }
  }, [foundPolicy]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        foundPolicy
          ? {
              ...initialState,
              cmo: foundPolicy.cmo,
              type: foundPolicy.type,
              timeType: foundPolicy.timeType,
              from: foundPolicy.from,
              to: foundPolicy.to,
              serial: foundPolicy.serial,
              number: foundPolicy.number,
              note: foundPolicy.note,
              name: foundPolicy.name,
            }
          : initialState
      }
      onSubmit={(values) => {
        const pathName = policyKey === 'policyDms' ? 'dms' : 'oms';
        onAddPolicy(values, pathName);
      }}>
      {(formProps) => {
        return (
          <div
            className={`form-section policy-${
              policyKey === 'policyOms' ? 'omc' : 'dmc'
            }`}>
            <h2>{sectionTitle()}</h2>
            <Row className="form-row" align={'bottom'} gutter={16}>
              <Col>
                <Button
                  loading={isLoading}
                  onClick={() => {
                    onFindPolicyHandler({
                      docNumber: formProps.values.number,
                      docSerial: formProps.values.serial,
                      fromDoc: formProps.values.from,
                      toDoc: formProps.values.to,
                    });
                  }}>
                  Искать
                </Button>
              </Col>
              <Col span={4}>
                <FormField>
                  <FastSearchSelect loading={isLoading} name={'timeType'}>
                    {getPropsOptions(policyTimeType)}
                  </FastSearchSelect>
                </FormField>
              </Col>
              <Col span={5}>
                <FormField label={'С'}>
                  <FastDatePicker
                    disabled={isLoading}
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
                    disabled={isLoading}
                    value={
                      formProps.values.to
                        ? moment(formProps.values.to)
                        : undefined
                    }
                    valueSet={
                      parseInt(formProps.values.timeType) === 3
                        ? '2200-01-01'
                        : formProps.values.to
                    }
                    name={'to'}
                  />
                </FormField>
              </Col>
            </Row>
            <Row className="form-row" gutter={16}>
              <Col span={6}>
                <FormField label={'Серия'}>
                  <FastInput
                    disabled={isLoading}
                    name={'serial'}
                    valueSet={
                      parseInt(formProps.values.timeType) === 3
                        ? 'ЕП'
                        : parseInt(formProps.values.timeType) === 1
                        ? 'ВС'
                        : formProps.values.serial
                    }
                  />
                </FormField>
              </Col>
              <Col span={18}>
                <FormField label={'Номер'}>
                  <FastInput disabled={isLoading} name={'number'} />
                </FormField>
              </Col>
            </Row>
            <Row className="form-row" gutter={16}>
              <Col span={14}>
                <FormField label="СМО" labelPosition="left">
                  <FastSearchSelect
                    loading={isLoading || isCmoLoading}
                    disabled={isLoading}
                    name={'cmo'}>
                    {getPropsOptions(cmoType)}
                  </FastSearchSelect>
                </FormField>
              </Col>
              <Col span={10}>
                <FormField>
                  <FastSearchSelect disabled={isLoading} name={'type'}>
                    {getPropsOptions(policyType)}
                  </FastSearchSelect>
                </FormField>
              </Col>
            </Row>
            <Row className="form-row">
              <Col span={24}>
                <FormField labelPosition="left" label="Название">
                  <FastInput disabled={isLoading} name={'name'} />
                </FormField>
              </Col>
            </Row>
            <Row className="form-row">
              <Col span={24}>
                <FormField labelPosition="left" label="Примечание">
                  <FastInput disabled={isLoading} name={'note'} />
                </FormField>
              </Col>
            </Row>
            <Row className="form-row" justify={'end'}>
              <Col>
                <Space>
                  <Button disabled={isLoading} type={'link'} danger>
                    Закрыть полис
                  </Button>
                  <Button
                    onClick={() => {
                      formProps.handleSubmit();
                    }}
                    disabled={isLoading}
                    type={'primary'}>
                    Добавить полис
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        );
      }}
    </Formik>
  );
};

export default PolicyAddForm;
