import React, { useCallback, useEffect, useMemo } from 'react';
import { Col, Row, Select, Button, Divider} from 'antd';
import { useFormikContext } from 'formik';
import {CloseCircleOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

import { LABELS, ListOptionProps, SectionProps } from './types';
import { EmploymentItem } from '../../types';
import { WizardStateType } from '../../../../types';
import {
  detailedHurtFactorTypesSelector,
  detailedHurtTypesSelector,
  hazardLoadingsSelector,
} from "../../../../../../../../reduxStore/slices/rb/selectors";

import Hazard from "../Hazard/Hazard";
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastInputNumber from '../../../../../../components/fields/FastInputNumber/FastInpuNumber';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';

const Employment: React.FC<SectionProps> = ({orgsList, isLoadingOrgs}) => {
  const hurtTypesList = useSelector(detailedHurtTypesSelector);
  const hurtFactorTypesList = useSelector(detailedHurtFactorTypesSelector);
  const loadings = useSelector(hazardLoadingsSelector);
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.employment.employment;
  const formValuesRemoved = form.values.employment.deleted;
  const formInitialValues = form.initialValues.employment.employment;
  const sectionValuePath = `employment.employment`;

  useEffect(() => {
    console.log('form.values', form.values.employment)
  }, [form.values]);

  useEffect(() => {
    changeFieldsById(formInitialValues)
  }, [orgsList.length > 0 && orgsList]);

  useEffect(() => {
    changeFieldsById(formValues)
  }, [formValues]);

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `${sectionValuePath}[${index}].${fieldChain}`;
  };

  const changeFieldsById = (values: typeof formValues) => {
    for (let i = 0; i < values.length; i++) {
      const itemArr = orgsList.find(item => item.id === parseInt(values[i].organization));
      form.setFieldValue(`${sectionValuePath}[${i}].inn`, itemArr?.inn);
      form.setFieldValue(`${sectionValuePath}[${i}].ogrn`, itemArr?.ogrn);
    }
  };

  const onAddEmployment = useCallback(() => {
    const employment: EmploymentItem = {
      organization: '',
      freeInput: '',
      position: '',
      experience: 0,
      inn: '',
      ogrn: '',
      deleted: 0,
      hazardHistory: [],
      hazardFactors: [],
    };
    form.setFieldValue(sectionValuePath, [...formValues, employment]);
  }, [formValues]);

  const onRemoveEmployment = useCallback((index: number) => {
    const result = formValues[index];
    const newRemovedArr = [...formValuesRemoved, {...result, deleted: 1}];
    const newArr = formValues.filter((item, i) => i !== index);
    form.setFieldValue(`${sectionValuePath}[${formValues.length - 1}].deleted`, 1);
    form.setFieldValue('employment.deleted', newRemovedArr);
    form.setFieldValue('employment.employment', newArr);
  }, [formValues]);

  const propsList = useCallback((items: ListOptionProps[]) => {
    return items.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  }, [orgsList]);

  const EmploymentValue = useMemo(() => {
    return (
      <ArrayFieldWrapper
        values={formValues}
        name={sectionValuePath}
        onAddItem={onAddEmployment}
        showActions
        renderChild={(key, index) => (
          <div key={index}>
            <Row gutter={16}>
              <Col span={8} className={'col--border-right'}>
                <FormField label={LABELS.ORG} name={getSelectionPath(index, 'organization')}>
                  <FastSearchSelect
                    allowClear
                    filterOption
                    optionFilterProp={'name'}
                    loading={isLoadingOrgs}
                    showSearch
                    name={getSelectionPath(index, 'organization')}>
                    {propsList(orgsList)}
                  </FastSearchSelect>
                </FormField>
                <FormField label={LABELS.ORG} name={getSelectionPath(index, 'freeInput')}>
                  <FastInput name={getSelectionPath(index, 'freeInput')} />
                </FormField>
              </Col>
              <Col span={8} className={'col--border-right'}>
                <FormField label={LABELS.POSITION}>
                  <FastInput name={getSelectionPath(index, 'position')} />
                </FormField>
                <FormField label={LABELS.EXPERIENCE}>
                  <FastInputNumber
                    name={getSelectionPath(index, 'experience')}
                  />
                </FormField>
              </Col>
              <Col span={1}>
                <Button
                  type={'link'}
                  size={'small'}
                  shape="circle"
                  icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                  onClick={onRemoveEmployment.bind(this, index)}
                />
              </Col>
            </Row>
            <Hazard
              hurtTypesList={hurtTypesList}
              hurtFactorTypesList={hurtFactorTypesList}
              isLoadingHurtTypes={loadings.types}
              isLoadingHurtFactorTypes={loadings.factorTypes}
              index={index}
            />
            <Divider />
          </div>
        )}
      />
    )
  }, [formValues, getSelectionPath, orgsList, isLoadingOrgs]);

  return (
    <div className={'form-section'}>
      <DropDownContent title={LABELS.EMPLOYMENT}>
        {EmploymentValue}
      </DropDownContent>
    </div>
  );
};

export default Employment;
