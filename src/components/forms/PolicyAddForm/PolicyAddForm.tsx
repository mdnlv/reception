import React, { useCallback, useMemo } from 'react';
import { Formik } from 'formik';
import { Button, Col, Row, Select, Space } from 'antd';
import FormField from '../components/FormField/FormField';
import moment from 'moment';
import { PassportPolicyType } from '../wizards/RegCardWizard/pages/PassportGeneral/types';
import FastInput from '../components/fields/FastInput/FastInput';
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../components/fields/FastSearchSelect/FastSearchSelect';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import PatientPolicy from '../../../types/data/PatientPolicy';

interface ListOptionItem {
  id: number;
  name: string;
}

interface FormProps {
  policyKey: 'policyOms' | 'policyDms';
  policyTimeType: ListOptionItem[];
  policyType: ListOptionItem[];
  onAddPolicy(policy: PassportPolicyType, type: 'oms' | 'dms'): void;
  onFindPolicy(policy: FindPolicyParams, type: 'oms' | 'dms'): void;
  isLoading: boolean;
  foundPolicy?: PatientPolicy;
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

  const onFindPolicyHandler = useCallback(
    (values: FindPolicyParams) => {
      props.onFindPolicy(
        values,
        props.policyKey === 'policyDms' ? 'dms' : 'oms',
      );
    },
    [props.onFindPolicy],
  );

  const initialFormState = useMemo(() => {
    if (props.foundPolicy) {
      return {
        from: props.foundPolicy.begDate.toString(),
        to: props.foundPolicy.endDate.toString(),
        serial: props.foundPolicy.serial,
        number: props.foundPolicy.number,
        note: '',
        name: props.foundPolicy.name,
        ...initialState,
      };
    } else {
      return initialState;
    }
  }, [props.foundPolicy]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        props.foundPolicy
          ? {
              ...initialState,
              from: props.foundPolicy.begDate.toString(),
              to: props.foundPolicy.endDate.toString(),
              serial: props.foundPolicy.serial,
              number: props.foundPolicy.number,
              note: '',
              name: props.foundPolicy.name,
            }
          : initialState
      }
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
            <Col>
              <Button
                loading={props.isLoading}
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
                <FastSearchSelect loading={props.isLoading} name={'timeType'}>
                  {getPropsOptions(props.policyTimeType)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label={'С'}>
                <FastDatePicker
                  disabled={props.isLoading}
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
                  disabled={props.isLoading}
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
                <FastInput disabled={props.isLoading} name={'serial'} />
              </FormField>
            </Col>
            <Col span={18}>
              <FormField label={'Номер'}>
                <FastInput disabled={props.isLoading} name={'number'} />
              </FormField>
            </Col>
          </Row>
          <Row className="form-row" gutter={16}>
            <Col span={14}>
              <FormField label="СМО" labelPosition="left">
                <FastSearchSelect disabled={props.isLoading} name={'cmo'} />
              </FormField>
            </Col>
            <Col span={10}>
              <FormField>
                <FastSearchSelect disabled={props.isLoading} name={'type'}>
                  {getPropsOptions(props.policyType)}
                </FastSearchSelect>
              </FormField>
            </Col>
          </Row>
          <Row className="form-row">
            <Col span={24}>
              <FormField labelPosition="left" label="Название">
                <FastInput disabled={props.isLoading} name={'name'} />
              </FormField>
            </Col>
          </Row>
          <Row className="form-row">
            <Col span={24}>
              <FormField labelPosition="left" label="Примечание">
                <FastInput disabled={props.isLoading} name={'note'} />
              </FormField>
            </Col>
          </Row>
          <Row className="form-row" justify={'end'}>
            <Col>
              <Space>
                <Button disabled={props.isLoading} type={'link'} danger>
                  Закрыть полис
                </Button>
                <Button
                  onClick={() => {
                    formProps.handleSubmit();
                  }}
                  disabled={props.isLoading}
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
