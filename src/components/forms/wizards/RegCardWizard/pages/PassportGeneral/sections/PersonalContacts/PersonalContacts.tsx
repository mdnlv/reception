import React, { FC } from 'react';
import { Checkbox, Col, Input, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { RegistrationCardState } from '../../../../../../../../store/registrationCard/types';
import FormArrayField from '../../../../../../components/FormArrayField/FormArrayField';
import { PassportContactType } from '../../types';
import FormField from '../../../../../../components/FormField/FormField';

const PersonalContacts: FC = (props) => {
  const form = useFormikContext<RegistrationCardState>();
  const formProps = form.values.passportGeneral.contacts;

  const getSelectionItem = (index: number, fieldChain: string) => {
    return `passportGeneral.contacts[${index}].${fieldChain}`;
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
                <Input
                  name={getSelectionItem(index, 'number')}
                  value={formProps[index]?.number || ''}
                  onChange={form.handleChange}
                />
              </FormField>
            </Col>
            <Col span={5}>
              <FormField label="Тип">
                <Select />
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
