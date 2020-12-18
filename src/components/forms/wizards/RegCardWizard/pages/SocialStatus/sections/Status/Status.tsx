import React, {useCallback, useMemo} from 'react';
import { Col, Divider, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import moment from 'moment';

import { WizardStateType } from '../../../../types';
import { SocialStatus } from '../../../../../../SocialStatusForm/types';
import {StatusProps, ListOptionProps, LABELS, DROPDOWN_TITLE} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';

const Status: React.FC<StatusProps> = ({
  socialTypesList,
  socialClassesList,
  isLoadingClasses,
  isLoadingTypes
}) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.socialStatus.socialStatus;
  const sectionValuePath = `socialStatus.socialStatus`;

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `${sectionValuePath}.${index}.${fieldChain}`;
  };

  const onAddStatus = useCallback(() => {
    const status: SocialStatus = {
      class: '',
      type: '',
      fromDate: '',
      endDate: '',
      note: ''
    };
    form.setFieldValue(sectionValuePath, [...formValues, status]);
  }, [form.setFieldValue, formValues]);

  const onRemoveStatus = useCallback(() => {
    form.setFieldValue(
      sectionValuePath,
      formValues.slice(0, formValues.length - 1),
    );
  }, [form.setFieldValue, formValues]);

  const propsList = useCallback(
    (items: ListOptionProps[]) => {
      return items.map((item) => (
        <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      ));
    },
    [socialTypesList],
  );

  const StatusValue = useMemo(() => {
    return (
      <ArrayFieldWrapper
        name={sectionValuePath}
        values={formValues}
        onAddItem={onAddStatus}
        onRemoveItem={onRemoveStatus}
        showActions
        renderChild={(status, index) => (
          <div key={index}>
            <Row gutter={16}>
              <Col span={6}>
                <FormField label={LABELS.CLASS} name={getSelectionPath(index, 'class')}>
                  <FastSearchSelect
                    loading={isLoadingClasses}
                    showSearch
                    filterOption
                    optionFilterProp={'name'}
                    name={getSelectionPath(index, 'class')}>
                    {propsList(socialClassesList)}
                  </FastSearchSelect>
                </FormField>
              </Col>
              <Col span={6}>
                <FormField label={LABELS.TYPE} name={getSelectionPath(index, 'type')}>
                  <FastSearchSelect
                    loading={isLoadingTypes}
                    showSearch
                    filterOption
                    optionFilterProp={'name'}
                    name={getSelectionPath(index, 'type')}>
                    {propsList(socialTypesList)}
                  </FastSearchSelect>
                </FormField>
              </Col>
              <Col span={3}>
                <FormField label={LABELS.START_DATE}>
                  <FastDatePicker name={getSelectionPath(index, 'fromDate')} />
                </FormField>
              </Col>
              <Col span={3}>
                <FormField label={LABELS.END_DATE}>
                  <FastDatePicker name={getSelectionPath(index, 'endDate')} />
                </FormField>
              </Col>
              <Col span={6}>
                <FormField label={LABELS.NOTE}>
                  <FastInput name={getSelectionPath(index, 'note')} />
                </FormField>
              </Col>
            </Row>
            <Divider />
          </div>
        )}
      />
    );
  }, [
    formValues,
    getSelectionPath,
    socialTypesList,
    socialClassesList,
    isLoadingTypes,
    isLoadingClasses,
  ]);

  return (
    <div className={'form-section social-status'}>
      <DropDownContent title={DROPDOWN_TITLE}>{StatusValue}</DropDownContent>
    </div>
  );
};

export default Status;
