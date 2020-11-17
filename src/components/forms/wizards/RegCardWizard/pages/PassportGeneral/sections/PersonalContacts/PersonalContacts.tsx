import React, { FC, useCallback, useEffect } from 'react';
import { Checkbox, Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';

import { PassportContactType } from '../../types';
import { WizardStateType } from '../../../../types';
import {SectionProps, LABELS} from "./types";

import FormField from '../../../../../../components/FormField/FormField';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastMaskedInput from '../../../../../../components/fields/FastMaskedInput/FastMaskedInput';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';

const PersonalContacts: FC<SectionProps> = ({contactTypes}) => {
  const form = useFormikContext<WizardStateType>();
  const formProps = form.values.passportGeneral.contacts;

  const getSelectionItem = (index: number, fieldChain: string) => {
    console.log(index, fieldChain);
    return `passportGeneral.contacts[${index}].${fieldChain}`;
  };

  const typesOptions = contactTypes.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  const getTypeInput = (index: number, mask: string) => {
    if (mask) {
      return (
        <FastMaskedInput name={getSelectionItem(index, 'number')} mask={mask} />
      );
    }
  }

  const findMaskByType = (typeId: number) => {
    if (typeId) {
      const type = contactTypes.find((item) => item.id === typeId);
      if (type) return type.mask;
      return '';
    } else {
      return '';
    }
  }

  const onAddContact = useCallback(() => {
    const item: PassportContactType = {
      isMain: false,
      number: '',
      type: '',
      note: '',
    };
    const newArr = [...form.values.passportGeneral.contacts, item];
    form.setFieldValue('passportGeneral.contacts', newArr);
  }, [form.values.passportGeneral.contacts]);

  const onRemoveContact = useCallback(() => {
    if (formProps && formProps.length > 0) {
      form.setFieldValue(
        'passportGeneral.contacts',
        formProps.slice(0, formProps.length - 1),
      );
    }
  }, [formProps]);

  return (
    <div className={'form-section personal-contacts'}>
      <h2>Контакты</h2>
      <ArrayFieldWrapper<PassportContactType>
        values={formProps}
        name={'contacts'}
        onAddItem={onAddContact}
        onRemoveItem={onRemoveContact}
        showActions={true}
        renderChild={(key, index) => (
          <Row gutter={16} key={index}>
            <Col span={3}>
              <FormField label={LABELS.MAIN}>
                <div className="center-wrapper">
                  <Checkbox
                    name={getSelectionItem(index, 'isMain')}
                    checked={formProps[index]?.isMain || false}
                    onChange={form.handleChange}
                  />
                </div>
              </FormField>
            </Col>
            <Col span={6}>
              <FormField label={LABELS.NUMBER}>
                {getTypeInput(
                  index,
                  findMaskByType(parseInt(formProps[index]?.type)),
                )}
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label={LABELS.TYPE}>
                <Select
                  value={formProps[index]?.type}
                  onChange={(val) => {
                    form.setFieldValue(getSelectionItem(index, 'type'), val);
                  }}>
                  {typesOptions}
                </Select>
              </FormField>
            </Col>
            <Col span={10}>
              <FormField label={LABELS.NOTE}>
                <FastInput name={getSelectionItem(index, 'note')} />
              </FormField>
            </Col>
          </Row>
        )}
      />
    </div>
  );
};

export default PersonalContacts;
