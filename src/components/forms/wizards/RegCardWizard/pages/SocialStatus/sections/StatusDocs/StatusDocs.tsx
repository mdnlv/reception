import React, { FC, useCallback } from 'react';
import { Col, Row, Select } from 'antd';
import { TrustedDoc } from '../../../../../../SocialStatusForm/types';
import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import { useFormikContext } from 'formik';
import { WizardStateType } from '../../../../types';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';

interface ListOptionProps {
  id: number;
  name: string;
}

interface SectionProps {
  documentTypesList: ListOptionProps[];
}

const DROPDOWN_TITLE = 'Документ, подтверждающий соц.статус';

enum LABELS {
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  DATE = 'Дата',
  GIVEN = 'Выдан',
}

const StatusDocs: FC<SectionProps> = (props) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.socialStatus.trustedDoc;
  const sectionValuePath = `socialStatus.trustedDoc`;

  const getSectionPath = (index: number, fieldChain: string) => {
    return `${sectionValuePath}[${index}].${fieldChain}`;
  };

  const onAddDoc = useCallback(() => {
    const newDoc: TrustedDoc = {
      givenBy: '',
      number: '',
      serial: '',
      date: '',
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
                  <FormField>
                    <FastSearchSelect name={getSectionPath(index, 'type')}>
                      {propsList(props.documentTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.SERIAL}>
                    <FastInput name={getSectionPath(index, 'serial')} />
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