import React, { useCallback } from 'react';
import { Col, Row, Select } from 'antd';

import { DROPDOWN_TITLE, LABELS, PersonAttachment } from './types';

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import { WizardStateType } from '../../types';
import ArrayFieldWrapper from '../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import { useSelector } from 'react-redux';
import {
  detailedAttachTypesSelector,
  detailedOrganisationsSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';
import { RootState } from '../../../../../../reduxStore/store';

const Attachments: React.FC = () => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.attachments.attachments;
  const attachTypes = useSelector(detailedAttachTypesSelector);
  const orgs = useSelector(detailedOrganisationsSelector);

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `attachments.attachments[${index}].${fieldChain}`;
  };

  const getPropsList = (props: { id: number; name: string }[]) => {
    return props.map((item) => (
      <Select.Option key={item.id} value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  };

  const {
    organisations: loadingOrgs,
    attachTypes: loadingAttachTypes,
  } = useSelector((state: RootState) => state.rb.loading);

  const onAddAttachment = useCallback(() => {
    const attachment: PersonAttachment = {
      lpu: '',
      fromDate: '',
      endDate: '',
      type: '',
      unit: '',
      detachmentReason: '',
    };
    const newArr = [...formValues, attachment];
    form.setFieldValue('attachments.attachments', newArr);
  }, [formValues]);

  const onRemoveAttachment = useCallback(() => {
    if (formValues.length > 0) {
      form.setFieldValue(
        'attachments.attachments',
        formValues.slice(0, formValues.length - 1),
      );
    }
  }, [formValues]);

  return (
    <form className={'wizard-step attachments-form'}>
      <div className="form-section">
        <DropDownContent title={DROPDOWN_TITLE}>
          <ArrayFieldWrapper<PersonAttachment>
            values={formValues}
            name={'attachments'}
            onAddItem={onAddAttachment}
            onRemoveItem={onRemoveAttachment}
            showActions
            renderChild={(key, index) => (
              <Row gutter={16} key={index}>
                <Col span={3}>
                  <FormField label={LABELS.TYPE}>
                    <FastSearchSelect
                      loading={loadingAttachTypes}
                      name={getSelectionPath(index, 'type')}>
                      {getPropsList(attachTypes)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={6}>
                  <FormField label={LABELS.LPU}>
                    <FastSearchSelect
                      loading={loadingOrgs}
                      name={getSelectionPath(index, 'lpu')}>
                      {getPropsList(orgs)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={4}>
                  <FormField label={LABELS.UNIT}>
                    <FastSearchSelect name={getSelectionPath(index, 'unit')} />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.ATTACHMENT_DATE}>
                    <FastDatePicker
                      name={getSelectionPath(index, 'fromDate')}
                    />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.DETACH_DATE}>
                    <FastDatePicker name={getSelectionPath(index, 'endDate')} />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.DETACH_REASON}>
                    <FastSearchSelect name={getSelectionPath(index, 'unit')} />
                  </FormField>
                </Col>
              </Row>
            )}
          />
        </DropDownContent>
      </div>
    </form>
  );
};

export default Attachments;
