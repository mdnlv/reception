import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {Button, Col, Row, Select, Space} from 'antd';
import { useFormikContext } from 'formik';
import { useParams } from 'react-router';
import moment from "moment";

import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import {FormProps, ListOptionItem} from './types';

import FormField from '../components/FormField/FormField';
import FastInput from '../components/fields/FastInput/FastInput';
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../components/fields/FastSearchSelect/FastSearchSelect';
import FastMaskedInput from "../components/fields/FastMaskedInput/FastMaskedInput";
import {WizardStateType} from "../wizards/RegCardWizard/types";

const PolicyAddForm: React.FC<FormProps> = ({
  policyKey,
  policyType,
  policyTimeType,
  onFindPolicy,
  foundPolicy,
  isLoading,
  isCmoLoading,
  cmoType,
  error
}) => {
  const { id } = useParams<{ id: string }>();
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.passportGeneral[policyKey];
  const sectionValuePath = `passportGeneral.${policyKey}`;
  const fieldNames = ['cmo', 'type', 'timeType', 'from', 'to', 'serial', 'number', 'note', 'name'];

  const firstName = form.values.personal.firstName;
  const lastName = form.values.personal.lastName;
  const patrName = form.values.personal.patrName;
  const sex = form.values.personal.sex;
  const birthDate = form.values.personal.birthDate;
  const docSerial = form.values.passportGeneral.passportInfo.serialFirst
    .concat(form.values.passportGeneral.passportInfo.serialSecond);
  const docNumber = form.values.passportGeneral.passportInfo.number;

  const [policyMask, setPolicyMask] = useState('' as string);

  useEffect(() => {
    if (foundPolicy) {
      fieldNames.map((item) => form.setFieldValue(`${sectionValuePath}.${item}`, foundPolicy[item]))
    }
  }, [foundPolicy]);

  useEffect(() => {
    if (formValues.timeType === '1') {
      form.setFieldValue(`${sectionValuePath}.serial`, 'ВС');
    } else if (formValues.timeType === '3') {
      form.setFieldValue(`${sectionValuePath}.serial`, 'ЕП');
    } else {
      form.setFieldValue(`${sectionValuePath}.serial`, '');
    }
  }, [formValues.timeType]);

  useEffect(() => {
    const timeType = formValues.timeType;
    if (timeType === "1" || formValues.serial === 'ВС') {
      setPolicyMask('111111111')
    } else if (timeType === "3" || formValues.serial === 'ЕП') {
      setPolicyMask('111111111111')
    } else {
      setPolicyMask('')
    }
  }, [formValues.timeType, formValues.serial]);

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
        <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      )),
    [policyTimeType, policyType, cmoType],
  );

  const onFindPolicyHandler = useCallback(
    (values: FindPolicyParams) => {
      onFindPolicy(values, policyKey === 'policyDms' ? 'dms' : 'oms');
    },
    [onFindPolicy],
  );

  const cleanFields = () => {
    fieldNames.map((item) => {
      if (item === 'from' || item === 'to') {
        form.setFieldValue(`${sectionValuePath}.${item}`, moment())
      } else {
        form.setFieldValue(`${sectionValuePath}.${item}`, '')
      }
    })
  };

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
                birthDate,
                docNumber,
                docSerial,
                firstName,
                lastName,
                patrName,
                policyNumber: formValues.number,
                policySerial: formValues.serial,
                sex: sex.toString(),
              });
            }}>
            Искать
          </Button>
        </Col>
        <Col span={4}>
          <FormField label={'Тип'} name={`${sectionValuePath}.timeType`}>
            <FastSearchSelect
              allowClear
              loading={isLoading}
              placeholder={"Тип"}
              name={`${sectionValuePath}.timeType`}
            >
              {getPropsOptions(policyTimeType)}
            </FastSearchSelect>
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'С'}>
            <FastDatePicker
              disabled={isLoading}
              name={`${sectionValuePath}.from`}
            />
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={'До'}>
            <FastDatePicker
              disabled={isLoading}
              name={`${sectionValuePath}.to`}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" gutter={16}>
        <Col span={6}>
          <FormField label={'Серия'}>
            <FastInput
              disabled={isLoading}
              name={`${sectionValuePath}.serial`}
            />
          </FormField>
        </Col>
        <Col span={18}>
          <FormField label={'Номер'}>
            {policyMask
              ? (<FastMaskedInput
                  mask={policyMask}
                  disabled={isLoading}
                  name={`${sectionValuePath}.number`}
                />)
              : (<FastInput
                  disabled={isLoading}
                  name={`${sectionValuePath}.number`}
                />)
            }
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" gutter={16}>
        <Col span={14}>
          <FormField label="СМО" labelPosition="left" name={`${sectionValuePath}.cmo`}>
            <FastSearchSelect
              filterOption
              loading={isLoading || isCmoLoading}
              optionFilterProp={'name'}
              showSearch
              disabled={isLoading}
              name={`${sectionValuePath}.cmo`}
            >
              {getPropsOptions(cmoType)}
            </FastSearchSelect>
          </FormField>
        </Col>
        <Col span={10}>
          <FormField name={`${sectionValuePath}.type`}>
            <FastSearchSelect
              disabled={isLoading}
              name={`${sectionValuePath}.type`}
            >
              {getPropsOptions(policyType)}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row className="form-row">
        <Col span={24}>
          <FormField labelPosition="left" label="Название">
            <FastInput
              disabled={isLoading}
              name={`${sectionValuePath}.name`}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row">
        <Col span={24}>
          <FormField labelPosition="left" label="Примечание">
            <FastInput
              disabled={isLoading}
              name={`${sectionValuePath}.note`}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" justify={'end'}>
        <Col>
          <Space>
            {id !== 'new' && (
              <Button
                onClick={() => {
                  cleanFields()
                }}
                disabled={isLoading}
                type={'primary'}>
                Добавить полис
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PolicyAddForm;
