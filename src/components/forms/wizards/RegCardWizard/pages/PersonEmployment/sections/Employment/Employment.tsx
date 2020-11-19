import React, { useCallback } from 'react';
import { Col, Input, Row, Select } from 'antd';

import { LABELS, ListOptionProps, SectionProps } from './types';

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';
import { EmploymentItem } from '../../types';
import { useFormikContext } from 'formik';
import { WizardStateType } from '../../../../types';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastInputNumber from '../../../../../../components/fields/FastInputNumber/FastInpuNumber';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';

const Employment: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.employment;
  const sectionValuePath = `employment.employment`;

  const getSelectionPath = useCallback((index: number, fieldChain: string) => {
    return `${sectionValuePath}[${index}].${fieldChain}`;
  }, []);

  const onAddEmployment = useCallback(() => {
    const employment: EmploymentItem = {
      organization: '',
      position: '',
      experience: 0,
      inn: '',
      ogrn: '',
    };
    form.setFieldValue(sectionValuePath, [
      ...formValues.employment,
      employment,
    ]);
  }, [formValues.employment]);

  const onRemoveEmployment = useCallback(() => {
    form.setFieldValue(
      sectionValuePath,
      formValues.employment.slice(0, formValues.employment.length - 1),
    );
  }, [formValues.employment]);

  const propsList = useCallback((items: ListOptionProps[]) => {
    return items.map((item) => (
      <Select.Option name={item.name} value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  }, []);

  return (
    <div className={'form-section'}>
      <DropDownContent title={LABELS.EMPLOYMENT}>
        <ArrayFieldWrapper
          values={formValues.employment}
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
                      loading={props.isLoadingOrgs}
                      name={getSelectionPath(index, 'organization')}>
                      {propsList(props.orgsList)}
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
      </DropDownContent>
    </div>
  );
};

export default Employment;
