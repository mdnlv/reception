import React, { FC } from 'react';
import DropDownContent from '../../elements/DropDownContent/DropDownContent';
import { Row, Col, Select, DatePicker, Input } from 'antd';
import FormField from '../components/FormField/FormField';
import FormArrayField from '../components/FormArrayField/FormArrayField';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore/store';

const OutsideHospitalizationForm: FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.outsideHospitalization} onSubmit={() => {}}>
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
