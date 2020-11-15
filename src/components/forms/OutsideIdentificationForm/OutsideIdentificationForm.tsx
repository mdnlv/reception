import React, { FC } from 'react';
import { Col, Row, DatePicker, Select } from 'antd';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { RootState } from '../../../reduxStore/store';

import DropDownContent from '../../elements/DropDownContent/DropDownContent';
import FormField from '../components/FormField/FormField';
import FormArrayField from '../components/FormArrayField/FormArrayField';

const OutsideIdentificationForm: FC = () => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik
      initialValues={store.form.outsideIdentification}
      onSubmit={() => {}}>
      {(formProps) => (
        <div className={'form-section'}>
          <DropDownContent title={'Идентификаторы во внешних учетных системах'}>
            <FormArrayField
              values={formProps.values.outsideIds}
              name={'outsideIds'}
              renderChild={(key, index) => (
                <Row gutter={16}>
                  <Col span={5}>
                    <FormField label={'Внешняя учетная схема'}>
                      <Select />
                    </FormField>
                  </Col>
                  <Col span={5}>
                    <FormField label={'Идентификаторы'}>
                      <Select />
                    </FormField>
                  </Col>
                  <Col span={3}>
                    <FormField label={'Дата подтверждения'}>
                      <DatePicker
                        value={moment(formProps.values.outsideIds[index]?.date)}
                        onChange={(_, date) => {
                          formProps.setFieldValue(
                            `outsideIds[${index}].date`,
                            date,
                          );
                        }}
                      />
                    </FormField>
                  </Col>
                </Row>
              )}
            />
          </DropDownContent>
        </div>
      )}
    </Formik>
  );
};

export default OutsideIdentificationForm;
