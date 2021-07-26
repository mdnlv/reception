import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Col, Divider, Row, Select, Button } from 'antd';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import {CloseCircleOutlined} from "@ant-design/icons";

import {LABELS, DROPDOWN_TITLE} from "./types";
import {WizardStateType} from "../../../../types";
import {RootState} from "../../../../../../../../reduxStore/store";
import {PassportPolicyType} from "../../../PassportGeneral/types";
import {kladrSelector} from "../../../../../../../../reduxStore/slices/registrationCard/selectors";
import {
  detailedPolicyKindsSelector,
  detailedPolicyTypesSelector,
  detailedCMOSelector
} from "../../../../../../../../reduxStore/slices/rb/selectors";
import {ListOptionItem} from "../../../../../../PolicyAddForm/types";

import FormField from "../../../../../../components/FormField/FormField";
import DropDownContent from "../../../../../../../elements/DropDownContent/DropDownContent";
import ArrayFieldWrapper from "../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper";
import FastSearchSelect from "../../../../../../components/fields/FastSearchSelect/FastSearchSelect";
import FastDatePicker from "../../../../../../components/fields/FastDatePicker/FastDatePicker";
import FastInput from "../../../../../../components/fields/FastInput/FastInput";
import FastMaskedInput from "../../../../../../components/fields/FastMaskedInput/FastMaskedInput";
import SmoParams from "../../../../../../../modals/SmoParams/SmoParams";

const PersonPolicy: FC = () => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.personDocs.policies;
  const formValuesRemoved = form.values.personDocs.policiesDeleted;
  const policyTypesList = useSelector(detailedPolicyTypesSelector);
  const policyKindsList = useSelector(detailedPolicyKindsSelector);
  const {rbKladrDocumented: kladr} = useSelector(kladrSelector);
  const cmoTypeList = useSelector(detailedCMOSelector);
  const { organisations: isCmoLoading } = useSelector(
    (state: RootState) => state.rb.loading,
  );
  const [index, setIndex] = useState(0);
  const [policyMask, setPolicyMask] = useState('' as string);
  const [showOrgChoice, setShowOrgChoice] = useState(false);
  const [cmoFiltered, setCmoFiltered] = useState(cmoTypeList as ListOptionItem[]);
  const fieldNames = ['cmo', 'type', 'timeType', 'from', 'to', 'serial', 'number', 'note', 'name'];
  const filterNames = ['smoShort', 'inn', 'ogrn', 'cmoArea'];

  // useEffect(() => {
  //   console.log('formValues', formValues);
  // }, [formValues]);

  useEffect(() => {
    if (cmoTypeList.length > 0) {
      const result = cmoTypeList.filter((item) => item.extraData === '7800000000000');
      setCmoFiltered(result);
    }
  }, []);

  useEffect(() => {
    const data = formValues.find((item) => item.type === '3');
    if (data && !Object.keys(data).every((k) => !data[k])) {
      fieldNames.map((item) => form.setFieldValue(`passportGeneral.policyDms.${item}`, data[item]))
    }
  }, [formValues]);

  useEffect(() => {
    const data = formValues[index];
    if (data && !data?.cmoArea && !Object.keys(data).every((k) => !data[k])) {
      const result = cmoTypeList.find((item) => item.id === parseInt(formValues[index]?.cmo));
      form.setFieldValue(`personDocs.policies[${index}].cmoArea`, result?.extraData || '');
    }
  }, [formValues[index]?.cmo]);

  useEffect(() => {
    const data = formValues[index];
    if (data && !Object.keys(data).every((k) => !data[k])) {
      if (data?.timeType === '1') {
        form.setFieldValue(`personDocs.policies[${index}].serial`, 'ВС');
      } else if (data?.timeType === '3') {
        form.setFieldValue(`personDocs.policies[${index}].serial`, 'ЕП');
        form.setFieldValue(`personDocs.policies[${index}].to`, new Date('01.01.2200'));
      } else {
        !formValues[index]?.timeType && form.setFieldValue(`personDocs.policies[${index}].serial`, '');
      }
    }
  }, [formValues[index]?.timeType]);

  useEffect(() => {
    const timeType = formValues[index]?.timeType;
    if (timeType === "1" || formValues[index]?.serial === 'ВС') {
      setPolicyMask('111111111')
    } else if (timeType === "3" || formValues[index]?.serial === 'ЕП') {
      setPolicyMask('1111111111111111')
    } else {
      setPolicyMask('')
    }
  }, [formValues[index]?.timeType, formValues[index]?.serial]);

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `personDocs.policies[${index}].${fieldChain}`;
  };

  const getPropsOptions = useCallback(
    (props: ListOptionItem[]) =>
      props.map((item) => (
        <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      )),
    [policyTypesList, policyKindsList, cmoFiltered],
  );

  const getKladrDetailed = () => {
    return kladr.map((item) => (
      <Select.Option
        key={item.id}
        name={`${item.socr}. ${item.name}`}
        value={item.id}>
        {`${item.socr}. ${item.name}`}
      </Select.Option>
    ));
  };

  const onAddPolicy = useCallback(() => {
    const policy: PassportPolicyType = {
      timeType: '',
      cmoArea: '',
      from: '',
      to: '',
      serial: '',
      number: '',
      cmo: '',
      type: '',
      name: '',
      note: '',
      deleted: 0,
      inn: '',
      ogrn: '',
      infisCode: '',
      smoShort: '',
    };
    const newArr = [...formValues, policy];
    form.setFieldValue('personDocs.policies', newArr);
  }, [formValues]);

  const onRemovePolicy = useCallback((index: number) => {
    const result = formValues[index];
    const newRemovedArr = [...formValuesRemoved, {...result, deleted: 1}];
    const newArr = formValues.filter((item, i) => i !== index);
    form.setFieldValue('personDocs.policiesDeleted', newRemovedArr);
    form.setFieldValue('personDocs.policies', newArr);
  }, [formValues]);

  const onCloseOrgsChoice = () => {
    setShowOrgChoice(false);
  };

  const onSubmitCmoFilter = () => {
    const result = cmoTypeList.filter(
      (item) =>
          item.extraData === formValues[index].cmoArea
          && item.name.toLowerCase().includes(formValues[index].smoShort?.toLowerCase() || '')
          && item.inn?.includes(formValues[index].inn || '')
          && item.ogrn?.includes(formValues[index].ogrn || '')
    );
    setCmoFiltered(result);
  };

  const onCancelCmoFilter = () => {
    setCmoFiltered(cmoTypeList);
    filterNames.map((item) => {
      form.setFieldValue(`personDocs.policies[${index}].${item}`, '')
    })
  };

  const renderFormItem = useCallback((values: PassportPolicyType, indexData: number) => {
    setIndex(indexData);
    return (
      <div key={indexData}>
        <Row className="form-row" gutter={16} key={indexData}>
          <Col span={3}>
            <FormField label={LABELS.TYPE} name={getSelectionPath(indexData, 'timeType')}>
              <FastSearchSelect
                allowClear
                placeholder={"Тип"}
                name={getSelectionPath(indexData, 'timeType')}
              >
                {getPropsOptions(policyKindsList)}
              </FastSearchSelect>
            </FormField>
          </Col>
          <Col span={3}>
            <FormField label={LABELS.FROM} name={getSelectionPath(indexData, 'from')}>
              <FastDatePicker
                name={getSelectionPath(indexData, 'from')}
              />
            </FormField>
          </Col>
          <Col span={3}>
            <FormField label={LABELS.TO} name={getSelectionPath(indexData, 'to')}>
              <FastDatePicker
                name={getSelectionPath(indexData, 'to')}
              />
            </FormField>
          </Col>
          <Col span={3}>
            <FormField label={LABELS.SERIAL} name={getSelectionPath(indexData, 'serial')}>
              <FastInput
                name={getSelectionPath(indexData, 'serial')}
              />
            </FormField>
          </Col>
          <Col span={3}>
            <FormField label={LABELS.NUMBER} name={getSelectionPath(indexData, 'number')}>
              {policyMask
                ? (<FastMaskedInput
                  mask={policyMask}
                  name={getSelectionPath(indexData, 'number')}
                />)
                : (<FastInput
                  name={getSelectionPath(indexData, 'number')}
                />)
              }
            </FormField>
          </Col>
          {formValues.length !== 1
          && (
            <Col span={1}>
              <Button
                type={'link'}
                size={'small'}
                shape="circle"
                icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                onClick={onRemovePolicy.bind(this, indexData)}
              />
            </Col>
          )}
        </Row>
        <Row className="form-row" gutter={16} align={'bottom'}>
          <Col span={9}>
            <FormField label="СМО" labelPosition="left" name={getSelectionPath(indexData, 'cmo')}>
              <FastSearchSelect
                filterOption
                loading={isCmoLoading}
                optionFilterProp={'name'}
                showSearch
                name={getSelectionPath(indexData, 'cmo')}
              >
                {getPropsOptions(cmoFiltered)}
              </FastSearchSelect>
            </FormField>
          </Col>
          <Col span={1}>
            <Button onClick={() => setShowOrgChoice(true)}>...</Button>
          </Col>
          <Col span={5}>
            <FormField name={getSelectionPath(indexData, 'type')}>
              <FastSearchSelect
                name={getSelectionPath(indexData, 'type')}
              >
                {getPropsOptions(policyTypesList)}
              </FastSearchSelect>
            </FormField>
          </Col>
        </Row>
        <Row className="form-row" gutter={16}>
          <Col span={8}>
            <FormField labelPosition="left" label={LABELS.NAME}>
              <FastInput
                name={getSelectionPath(indexData, 'name')}
              />
            </FormField>
          </Col>
          <Col span={7}>
            <FormField labelPosition="left" label={LABELS.NOTE}>
              <FastInput
                name={getSelectionPath(indexData, 'note')}
              />
            </FormField>
          </Col>
        </Row>
        <Divider/>
      </div>
    )
  }, [cmoFiltered]);

  const renderForm = useMemo(() => (
    <DropDownContent title={DROPDOWN_TITLE}>
      <ArrayFieldWrapper<PassportPolicyType>
        name={'personDocs'}
        values={formValues}
        onAddItem={onAddPolicy}
        showActions
        renderChild={renderFormItem}
      />
    </DropDownContent>
  ), [cmoFiltered]);

  return (
    <div className={'form-section person-policy'}>
      {renderForm}
      <SmoParams
        isVisible={showOrgChoice && !isCmoLoading}
        index={index}
        getKladrDetailed={getKladrDetailed}
        onClose={onCloseOrgsChoice}
        onOk={onSubmitCmoFilter}
        onCancel={onCancelCmoFilter}
      />
    </div>
  );
};

export default PersonPolicy;
