import React, { useCallback, useEffect } from 'react';
import { Col, Row, Select, Button} from 'antd';
import { useFormikContext } from 'formik';
import {CloseCircleOutlined} from "@ant-design/icons";

import {DROPDOWN_TITLE_HAZARD, DROPDOWN_TITLE_FACTOR, LABELS, ListOptionProps, SectionProps} from './types';
import { EmploymentHazardItem, HazardFactorItem } from '../../types';
import { WizardStateType } from '../../../../types';

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastInputNumber from '../../../../../../components/fields/FastInputNumber/FastInpuNumber';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';

const Hazard: React.FC<SectionProps> = ({
  index,
  hurtTypesList,
  hurtFactorTypesList,
  isLoadingHurtTypes,
  isLoadingHurtFactorTypes
}) => {
  const form = useFormikContext<WizardStateType>();
  const formValuesHazard = form.values.employment.employment[index].hazardHistory;
  const formValuesFactors = form.values.employment.employment[index].hazardFactors;
  const selectionValuePathHazard = `employment.employment[${index}].hazardHistory`;
  const selectionValuePathFactors = `employment.employment[${index}].hazardFactors`;

  const onAddHazard = useCallback(() => {
    const hazardItem: EmploymentHazardItem = {
      hazardDescription: '',
      exp: 0,
    };
    form.setFieldValue(selectionValuePathHazard, [...formValuesHazard, hazardItem]);
  }, [formValuesHazard]);

  const onAddFactor = useCallback(() => {
    const factorItem: HazardFactorItem = {
      factor: ''
    };
    form.setFieldValue(selectionValuePathFactors, [...formValuesFactors, factorItem]);
  }, [formValuesFactors]);

  const onRemoveHazard = useCallback((index: number) => {
    const newArr = formValuesHazard.filter((item, i) => i !== index);
    form.setFieldValue(selectionValuePathHazard, newArr);
  }, [formValuesHazard]);

  const onRemoveFactor = useCallback((index: number) => {
    const newArr = formValuesFactors.filter((item, i) => i !== index);
    form.setFieldValue(selectionValuePathFactors, newArr);
  }, [formValuesFactors]);

  const getSectionPathHazard = useCallback((index: number, fieldChain: string) => {
    return `${selectionValuePathHazard}[${index}].${fieldChain}`;
  }, []);

  const getSectionPathFactors = useCallback((index: number, fieldChain: string) => {
    return `${selectionValuePathFactors}[${index}].${fieldChain}`;
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
      <DropDownContent title={DROPDOWN_TITLE_HAZARD}>
        <ArrayFieldWrapper
          values={formValuesHazard}
          name={selectionValuePathHazard}
          onAddItem={onAddHazard}
          showActions
          renderChild={(hazard, index) => (
            <div key={index}>
              <Row gutter={16}>
                <Col span={15}>
                  <FormField label={LABELS.HAZARD} name={getSectionPathHazard(index, 'hazardDescription')}>
                    <FastSearchSelect
                      filterOption
                      optionFilterProp={'name'}
                      showSearch
                      loading={isLoadingHurtTypes}
                      name={getSectionPathHazard(index, 'hazardDescription')}>
                      {propsList(hurtTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={4}>
                  <FormField label={LABELS.EXPERIENCE} name={getSectionPathHazard(index, 'hazardExp')}>
                    <FastInputNumber name={getSectionPathHazard(index, 'hazardExp')}/>
                  </FormField>
                </Col>
                <Col span={1}>
                  <Button
                    type={'link'}
                    size={'small'}
                    shape="circle"
                    icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                    onClick={onRemoveHazard.bind(this, index)}
                  />
                </Col>
              </Row>
            </div>
          )}
        />
      </DropDownContent>
      <DropDownContent title={DROPDOWN_TITLE_FACTOR}>
        <ArrayFieldWrapper
          values={formValuesFactors}
          name={selectionValuePathFactors}
          onAddItem={onAddFactor}
          showActions
          renderChild={(factor, index) => (
            <div key={index}>
              <Row>
                <Col span={11}>
                  <FormField label={LABELS.FACTOR} name={getSectionPathFactors(index, 'factor')}>
                    <FastSearchSelect
                      filterOption
                      optionFilterProp={'name'}
                      showSearch
                      loading={isLoadingHurtFactorTypes}
                      name={getSectionPathFactors(index, 'factor')}>
                      {propsList(hurtFactorTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={1}>
                  <Button
                    type={'link'}
                    size={'small'}
                    shape="circle"
                    icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                    onClick={onRemoveFactor.bind(this, index)}
                  />
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
