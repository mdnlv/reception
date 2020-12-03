import React, { useCallback, useEffect } from 'react';
import { Col, Divider, Row, Select } from 'antd';
import { useFormikContext } from 'formik';

import { DROPDOWN_TITLE, LABELS, ListOptionProps, SectionProps } from './types';
import { EmploymentHazardItem } from '../../types';
import { WizardStateType } from '../../../../types';

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastInputNumber from '../../../../../../components/fields/FastInputNumber/FastInpuNumber';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';

const Hazard: React.FC<SectionProps> = ({
  hurtTypesList,
  hurtFactorTypesList,
  orgsList,
  isLoadingOrgs,
  isLoadingHurtTypes,
  isLoadingHurtFactorTypes
}) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.employment.hazardHistory;
  const selectionValuePath = `employment.hazardHistory`;

  const onAddHazard = useCallback(() => {
    const hazardItem: EmploymentHazardItem = {
      hazardDescription: '',
      exp: 0,
    };
    form.setFieldValue(selectionValuePath, [...formValues, hazardItem]);
  }, [formValues]);

  const onRemoveHazard = useCallback(() => {
    form.setFieldValue(
      selectionValuePath,
      formValues.slice(0, formValues.length - 1),
    );
  }, [formValues]);

  const getSectionPath = useCallback((index: number, fieldChain: string) => {
    return `${selectionValuePath}[${index}].${fieldChain}`;
  }, []);

  const propsList = useCallback((items: ListOptionProps[]) => {
    return items.map((item) => (
      <Select.Option
        key={item.id}
        name={item.name}
        value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  }, []);

  return (
    <div className={'form-section person-hazard'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <ArrayFieldWrapper
          values={formValues}
          name={selectionValuePath}
          onAddItem={onAddHazard}
          onRemoveItem={onRemoveHazard}
          showActions
          renderChild={(hazard, index) => (
            <div key={index}>
              <Row gutter={16}>
                <Col span={16}>
                  <FormField label={LABELS.HAZARD}>
                    <FastSearchSelect
                      filterOption
                      optionFilterProp={'name'}
                      showSearch
                      loading={isLoadingHurtTypes}
                      name={getSectionPath(index, 'hazardDescription')}>
                      {propsList(hurtTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={4}>
                  <FormField label={LABELS.EXPERIENCE}>
                    <FastInputNumber name={getSectionPath(index, 'exp')} />
                  </FormField>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={12}>
                  <FormField label={LABELS.FACTOR}>
                    <FastSearchSelect name={getSectionPath(index, 'factor')}>
                      {propsList(hurtFactorTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
              </Row>
              <Divider />
              <Row gutter={16} align={'bottom'}>
                <Col span={8}>
                  <FormField label={LABELS.ORG}>
                    <FastSearchSelect
                      name={getSectionPath(index, 'organisation')}>
                      {propsList(orgsList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField label={LABELS.POSITION}>
                    <FastInput name={getSectionPath(index, 'post')} />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={LABELS.EXPERIENCE}>
                    <FastInput name={getSectionPath(index, 'exp')} />
                  </FormField>
                </Col>
              </Row>
            </div>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default Hazard;
