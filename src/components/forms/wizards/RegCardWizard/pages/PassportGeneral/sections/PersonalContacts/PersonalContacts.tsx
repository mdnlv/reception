import React, { FC, useEffect } from 'react';
import { Checkbox, Col, Input, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';
import { PassportContactType } from '../../types';
import FormField from '../../../../../../components/FormField/FormField';
import { RegistrationCardStateType } from '../../../../../../../../reduxStore/slices/registrationCard/initialState';
import PatientContactType from '../../../../../../../../types/data/PatientContactType';
import MaskedInput from 'antd-mask-input';

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

  return (
    <div className={'form-section personal-contacts'}>
      <h2>Контакты</h2>
      <FormArrayField<PassportContactType>
        values={formProps}
        name={'contacts'}
        renderChild={(key, index) => (
          <Row gutter={16} key={index.toString()}>
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
                {getTypeInput(index, findMaskByType(formProps[index]?.type))}
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
