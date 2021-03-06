import React, { FC } from 'react';
import { Row, Col, Select, DatePicker, Input } from 'antd';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import { RootState } from '../../../reduxStore/store';

import DropDownContent from '../../elements/DropDownContent/DropDownContent';
import FormField from '../components/FormField/FormField';
import FormArrayField from '../components/FormArrayField/FormArrayField';

const OutsideHospitalizationForm: FC = () => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik
      initialValues={store.form.outsideHospitalization}
      onSubmit={() => {}}>
      {(formProps) => (
        <form className={'outside-hospitalization-form'}>
          <div className={'form-section'}>
            <DropDownContent title={'Госпитализация в другие ЛПУ'}>
              <FormArrayField
                values={formProps.values.outsideHospitalization}
                name={'outsideHospitalization'}
                renderChild={(key, index) => (
                  <Row gutter={16}>
                    <Col>
                      <FormField label={'№ п/п'}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col>
                      <FormField label={'Наименование ЛПУ'}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col>
                      <FormField label={'Цель госпитализации'}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col>
                      <FormField label={'Дата поступления'}>
                        <DatePicker />
                      </FormField>
                    </Col>
                    <Col>
                      <FormField label={'Дата выбытия'}>
                        <DatePicker />
                      </FormField>
                    </Col>
                    <Col>
                      <FormField label={'МКБ'}>
                        <Input />
                      </FormField>
                    </Col>
                    <Col>
                      <FormField label={'Клинический диагноз'}>
                        <Input />
                      </FormField>
                    </Col>
                  </Row>
                )}
              />
            </DropDownContent>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default OutsideHospitalizationForm;
