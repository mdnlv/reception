import React, { useCallback } from 'react';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import { Col, Divider, Row, Select } from 'antd';
import FormField from '../../../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import { WizardStateType } from '../../../../types';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import { SocialStatus } from '../../../../../../SocialStatusForm/types';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';

interface ListOptionProps {
  id: number;
  name: string;
}

interface StatusProps {
  socialTypesList: ListOptionProps[];
  socialClassesList: ListOptionProps[];
  isLoadingClasses: boolean;
  isLoadingTypes: boolean;
}

const DROPDOWN_TITLE = 'Соц.статус';

enum LABELS {
  CLASS = 'Класс',
  TYPE = 'Тип',
  START_DATE = 'Дата начала',
  END_DATE = 'Дата окончания',
  NOTE = 'Примечание',
}

const Status: React.FC<StatusProps> = (props) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.socialStatus.socialStatus;
  const sectionValuePath = `socialStatus.socialStatus`;

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `${sectionValuePath}[${index}].${fieldChain}`;
  };

  const onAddStatus = useCallback(() => {
    const status: SocialStatus = {
      serialNumber: '',
      fromDate: '',
      endDate: '',
      number: '',
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
        <Select.Option key={item.id} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      ));
    },
    [props.socialTypesList],
  );

  return (
    <div className={'form-section social-status'}>
      <DropDownContent title={DROPDOWN_TITLE}>
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
                  <FormField label={LABELS.CLASS}>
                    <FastSearchSelect
                      loading={props.isLoadingClasses}
                      name={getSelectionPath(index, 'class')}>
                      {propsList(props.socialClassesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={6}>
                  <FormField label={LABELS.TYPE}>
                    <FastSearchSelect
                      loading={props.isLoadingTypes}
                      name={getSelectionPath(index, 'type')}>
                      {propsList(props.socialTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.START_DATE}>
                    <FastDatePicker
                      name={getSelectionPath(index, 'fromDate')}
                    />
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
      </DropDownContent>
    </div>
  );
};

export default Status;
