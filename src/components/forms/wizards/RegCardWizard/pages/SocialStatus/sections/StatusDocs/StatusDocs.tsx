import React, { FC, useCallback} from 'react';
import { Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import moment from 'moment';

import { TrustedDoc } from '../../../../../../SocialStatusForm/types';
import { WizardStateType } from '../../../../types';
import {SectionProps, ListOptionProps, DROPDOWN_TITLE, LABELS} from './types';

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';

const StatusDocs: FC<SectionProps> = ({documentTypesList, isLoadingDocuments}) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.socialStatus.trustedDoc;
  const sectionValuePath = `socialStatus.trustedDoc`;

  const getSectionPath = (index: number, fieldChain: string) => {
    return `${sectionValuePath}[${index}].${fieldChain}`;
  };

  const onAddDoc = useCallback(() => {
    const newDoc: TrustedDoc = {
      type: '',
      givenBy: '',
      number: '',
      serialFirst: '',
      serialSecond: '',
      date: moment().format('DD.MM.YYYY'),
    };
    form.setFieldValue(sectionValuePath, [...formValues, newDoc]);
  }, [formValues, form.setFieldValue]);

  const onRemoveDoc = useCallback(() => {
    form.setFieldValue(
      sectionValuePath,
      formValues.slice(0, formValues.length - 1),
    );
  }, [formValues, form.setFieldValue]);

  const propsList = useCallback((items: ListOptionProps[]) => {
    return items.map((item) => (
      <Select.Option
        key={item.id.toString()}
        name={item.name}
        value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  }, []);

  return (
    <div className={'form-section social-status-doc'}>
      <DropDownContent title={DROPDOWN_TITLE}>
        <ArrayFieldWrapper<TrustedDoc>
          values={formValues}
          name={sectionValuePath}
          showActions
          onAddItem={onAddDoc}
          onRemoveItem={onRemoveDoc}
          renderChild={(key, index) => (
            <div key={index}>
              <Row gutter={16} align={'bottom'}>
                <Col span={3}>
                  <FormField label={LABELS.TYPE} name={getSectionPath(index, 'type')}>
                    <FastSearchSelect
                      filterOption
                      loading={isLoadingDocuments}
                      optionFilterProp={'name'}
                      showSearch
                      name={getSectionPath(index, 'type')}
                    >
                      {propsList(documentTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={1}>
                  <FormField label={LABELS.SERIAL}>
                    <FastInput name={getSectionPath(index, 'serialFirst')} />
                  </FormField>
                </Col>
                <Col span={1}>
                  <FormField label={LABELS.SERIAL}>
                    <FastInput name={getSectionPath(index, 'serialSecond')} />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.NUMBER}>
                    <FastInput name={getSectionPath(index, 'number')} />
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <FormField label={LABELS.DATE}>
                    <FastDatePicker name={getSectionPath(index, 'date')} />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.GIVEN}>
                    <FastInput name={getSectionPath(index, 'givenBy')} />
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

export default StatusDocs;
