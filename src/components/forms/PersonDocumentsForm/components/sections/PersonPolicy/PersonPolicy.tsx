import React, { FC } from 'react';
import { Col, DatePicker, Input, InputNumber, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import { useFormikContext } from 'formik';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';
import moment from 'moment';
import { RegistrationCardStateType } from '../../../../../../reduxStore/slices/registrationCard/initialState';

const PersonPolicy: FC = (props) => {
  const form = useFormikContext<RegistrationCardStateType>();

  const formValues = form.values.personDocs.policy;
  const getPolicyItem = (index: number, fieldChain: string) => {
    return `personDocs.policy[${index}].${fieldChain}`;
  };

  return (
    <div className={'form-section person-policy'}>
      <DropDownContent title={'Полис'}>
        <FormArrayField
          values={formValues}
          name={'policy'}
          renderChild={(key, index) => (
            <Row gutter={16} key={key}>
              <Col>
                <FormField label={'Тип'}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Тип'}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Номер'}>
                  <Select />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Серия'}>
                  <Input
                    name={getPolicyItem(index, 'serial')}
                    onChange={form.handleChange}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Номер'}>
                  <Input
                    name={getPolicyItem(index, 'number')}
                    onChange={form.handleChange}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Дата начала'}>
                  <DatePicker
                    value={moment(formValues[index]?.fromDate)}
                    onChange={(_, date) => {
                      form.setFieldValue(
                        getPolicyItem(index, 'fromDate'),
                        date,
                      );
                    }}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Дата окончания'}>
                  <DatePicker
                    value={moment(formValues[index]?.endDate)}
                    onChange={(_, date) => {
                      form.setFieldValue(getPolicyItem(index, 'endDate'), date);
                    }}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'СМО'}>
                  <Input
                    name={getPolicyItem(index, 'СМО')}
                    onChange={form.handleChange}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Наименование'}>
                  <Input
                    name={getPolicyItem(index, 'name')}
                    onChange={form.handleChange}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Примечание'}>
                  <Input
                    name={getPolicyItem(index, 'note')}
                    onChange={form.handleChange}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Искать'}>
                  <InputNumber
                    name={getPolicyItem(index, 'find')}
                    onChange={form.handleChange}
                  />
                </FormField>
              </Col>
              <Col>
                <FormField label={'Привязано обращений'}>
                  <Input
                    name={getPolicyItem(index, 'acceptedOffers')}
                    onChange={form.handleChange}
                  />
                </FormField>
              </Col>
            </Row>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default PersonPolicy;
