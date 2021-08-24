import React, { FC, useCallback, useEffect } from 'react';
import { Checkbox, Col, Row, Select, Button } from 'antd';
import { useFormikContext } from 'formik';
import {CloseCircleOutlined} from "@ant-design/icons";

import { PassportContactType } from '../../types';
import { WizardStateType } from '../../../../types';
import {SectionProps, LABELS} from "./types";

import FormField from '../../../../../../components/FormField/FormField';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastMaskedInput from '../../../../../../components/fields/FastMaskedInput/FastMaskedInput';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';

const PersonalContacts: FC<SectionProps> = ({contactTypes}) => {
  const form = useFormikContext<WizardStateType>();
  const formProps = form.values.passportGeneral.contacts.contacts;

  const onAddContact = useCallback(() => {
    const item: PassportContactType = {
      isMain: false,
      number: '',
      type: '',
      note: '',
      deleted: 0,
    };
    const newArr = [...form.values.passportGeneral.contacts.contacts, item];
    form.setFieldValue('passportGeneral.contacts.contacts', newArr);
  }, [form.values.passportGeneral.contacts]);

  const onRemoveContact = useCallback((index: number) => {
    const result = formProps[index];
    const newRemovedArr = [...form.values.passportGeneral.contacts.deleted, {...result, deleted: 1}];
    const newArr = formProps.filter((item, i) => i !== index);
    form.setFieldValue(`passportGeneral.contacts.deleted`, newRemovedArr);
    form.setFieldValue(`passportGeneral.contacts.contacts`, newArr);
  }, [formProps]);

  const getSelectionItem = useCallback((index: number, fieldChain: string) => {
    return `passportGeneral.contacts.contacts[${index}].${fieldChain}`;
  }, [formProps, onAddContact, onRemoveContact]);

  const typesOptions = contactTypes.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
        {item.name}
      </Select.Option>
  ));

  const getTypeInput = useCallback((index: number, mask: string) => {
    if (!mask) {
      return <FastInput name={getSelectionItem(index, 'number')} />;
    } else {
      return (
          <FastMaskedInput name={getSelectionItem(index, 'number')} mask={mask} />
      );
    }
  }, [formProps, onAddContact, onRemoveContact]);

  const findMaskByType = (typeId: number) => {
    if (typeId) {
      const type = contactTypes.find((item) => item.id === typeId);
      if (type && type.name !== 'электронная почта') return type.mask;
      return '';
    } else {
      return '';
    }
  }

  return (
    <div className={'form-section personal-contacts'}>
      <h2>Контакты</h2>
      <ArrayFieldWrapper<PassportContactType>
        values={formProps}
        name={'contacts'}
        onAddItem={onAddContact}
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
            <Col xl={21} xxl={7}>
              <FormField label={LABELS.TYPE} name={getSelectionItem(index, 'type')}>
                <FastSearchSelect
                  name={getSelectionItem(index, 'type')}
                  value={formProps[index]?.type}
                  onChange={(val) => {
                    form.setFieldValue(getSelectionItem(index, 'type'), val);
                  }}>
                  {typesOptions}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={6}>
              <FormField label={LABELS.NUMBER} name={getSelectionItem(index, 'number')}>
                {getTypeInput(
                  index,
                  findMaskByType(parseInt(formProps[index]?.type)),
                )}
              </FormField>
            </Col>
            <Col span={7}>
              <FormField label={LABELS.NOTE}>
                <FastInput name={getSelectionItem(index, 'note')} />
              </FormField>
            </Col>
            <Col span={1}>
              <Button
                type={'link'}
                size={'small'}
                shape="circle"
                icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                onClick={onRemoveContact.bind(this, index)}
              />
            </Col>
          </Row>
        )}
      />
    </div>
  );
};

export default PersonalContacts;
