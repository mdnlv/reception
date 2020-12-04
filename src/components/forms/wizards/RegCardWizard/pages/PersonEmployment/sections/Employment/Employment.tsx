import React, { useCallback, useEffect, useMemo } from 'react';
import { Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';

import { LABELS, ListOptionProps, SectionProps } from './types';
import { EmploymentItem } from '../../types';
import { WizardStateType } from '../../../../types';

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastInputNumber from '../../../../../../components/fields/FastInputNumber/FastInpuNumber';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';

const Employment: React.FC<SectionProps> = ({orgsList, isLoadingOrgs}) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.employment.employment;
  const formInitialValues = form.initialValues.employment.employment;
  const sectionValuePath = `employment.employment`;

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
      position: '',
      experience: 0,
      inn: '',
      ogrn: '',
    };
    form.setFieldValue(sectionValuePath, [...formValues, employment]);
  }, [formValues]);

  const onRemoveEmployment = useCallback(() => {
    form.setFieldValue(sectionValuePath, formValues.slice(0, formValues.length - 1));
  }, [formValues]);

  const propsList = useCallback((items: ListOptionProps[]) => {
    return items.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
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
        onRemoveItem={onRemoveEmployment}
        showActions
        renderChild={(key, index) => (
          <div key={index}>
            <Row gutter={16}>
              <Col span={8} className={'col--border-right'}>
                <FormField label={LABELS.ORG}>
                  <FastSearchSelect
                    filterOption
                    optionFilterProp={'name'}
                    loading={isLoadingOrgs}
                    showSearch
                    name={getSelectionPath(index, 'organization')}>
                    {propsList(orgsList)}
                  </FastSearchSelect>
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
              <Col span={8}>
                <FormField label={LABELS.INN}>
                  <FastInput name={getSelectionPath(index, 'inn')} />
                </FormField>
                <FormField label={LABELS.OGRN}>
                  <FastInput name={getSelectionPath(index, 'ogrn')} />
                </FormField>
              </Col>
            </Row>
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
