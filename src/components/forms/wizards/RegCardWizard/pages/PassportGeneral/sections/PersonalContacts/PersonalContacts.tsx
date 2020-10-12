import React, { FC, useCallback } from 'react';
import { Checkbox, Col, Input, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { PassportContactType } from '../../types';
import FormField from '../../../../../../components/FormField/FormField';
import { RegistrationCardStateType } from '../../../../../../../../reduxStore/slices/registrationCard/initialState';
import PatientContactType from '../../../../../../../../types/data/PatientContactType';
import MaskedInput from 'antd-mask-input';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';

interface SectionProps {
  contactTypes: PatientContactType[];
}

const PersonalContacts: FC<SectionProps> = (props) => {
  const form = useFormikContext<RegistrationCardStateType>();
  const formProps = form.values.passportGeneral.contacts;

  const getSelectionItem = (index: number, fieldChain: string) => {
    return `passportGeneral.contacts[${index}].${fieldChain}`;
  };

  const typesOptions = props.contactTypes.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  function getTypeInput(index: number, mask: string) {
    if (mask) {
      return (
        <MaskedInput
          mask={mask}
          placeholder={mask}
          name={getSelectionItem(index, 'number')}
          onChange={form.handleChange}
        />
      );
    } else {
      return (
        <Input
          name={getSelectionItem(index, 'number')}
          value={formProps[index]?.number || ''}
          onChange={form.handleChange}
        />
      );
    }
  }

  function findMaskByType(typeId: number) {
    if (typeId) {
      const type = props.contactTypes.find((item) => item.id === typeId);
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
    if (
      form.values.passportGeneral.contacts &&
      form.values.passportGeneral.contacts.length > 0
    ) {
      form.setFieldValue(
        'passportGeneral.contacts',
        form.values.passportGeneral.contacts.slice(
          0,
          form.values.passportGeneral.contacts.length - 1,
        ),
      );
    }
  }, [form.values.passportGeneral.contacts]);

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
              <FormField label="Основной">
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
              <FormField label="Номер">
                {getTypeInput(
                  index,
                  findMaskByType(parseInt(formProps[index]?.type)),
                )}
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label="Тип">
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
              <FormField label="Примечания">
                <Input
                  name={getSelectionItem(index, 'note')}
                  value={formProps[index]?.note || ''}
                  onChange={form.handleChange}
                />
              </FormField>
            </Col>
          </Row>
        )}
      />
    </div>
  );
};

export default PersonalContacts;
