import React, { FC } from 'react';
import { Checkbox, Col, Input, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { RegistrationCardState } from '../../../../../../../../store/registrationCard/types';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';
import { PassportContactType } from '../../types';
import FormField from '../../../../../../components/FormField/FormField';
import PatientContactType from '../../../../../../../../types/data/PatientContactType';
import optionsListMapper from '../../../../../../../../utils/mappers/optionsListMapper';
import MaskedInput from 'antd-mask-input';

interface SectionProps {
  contactTypes: PatientContactType[];
}

const PersonalContacts: FC<SectionProps> = (props) => {
  const form = useFormikContext<RegistrationCardState>();
  const formProps = form.values.passportGeneral.contacts;

  const getSelectionItem = (index: number, fieldChain: string) => {
    return `passportGeneral.contacts[${index}].${fieldChain}`;
  };

  const contactTypesOptions = optionsListMapper(props.contactTypes);

  const formatMask = (mask: string) =>
    mask
      .split('')
      .map((item) => {
        if (item === '9') {
          return '1';
        }
        return item;
      })
      .join('');

  const getInputByType = (mask: string, index: number) => {
    let node: React.ReactNode;
    if (mask) {
      node = (
        <MaskedInput
          mask={formatMask(mask)}
          name={getSelectionItem(index, 'number')}
          value={formProps[index]?.number}
          onChange={form.handleChange}
        />
      );
    } else {
      node = (
        <Input
          name={getSelectionItem(index, 'number')}
          value={formProps[index]?.number}
          onChange={form.handleChange}
        />
      );
    }
    return node;
  };

  const getMaskByType = (id: number) => {
    const type = props.contactTypes.find((item) => item.id === id);
    if (type && type.mask) {
      return type.mask;
    } else {
      return '';
    }
  };

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
                {getInputByType(
                  getMaskByType(parseInt(formProps[index]?.type)),
                  index,
                )}
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label="Тип">
                <Select
                  value={formProps[index]?.type}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}
                  onChange={(val) => {
                    if (val !== formProps[index]?.type) {
                      form.setFieldValue(getSelectionItem(index, 'number'), '');
                    }
                    form.setFieldValue(getSelectionItem(index, 'type'), val);
                  }}>
                  {contactTypesOptions}
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
