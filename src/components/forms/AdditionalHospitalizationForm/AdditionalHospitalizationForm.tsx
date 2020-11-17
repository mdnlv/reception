import React, { FC } from 'react';
import { Formik } from 'formik';
import { Col, DatePicker, Input, Row } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from '../../../reduxStore/store';

import DropDownContent from '../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../components/FormArrayField/FormArrayField';
import FormField from '../components/FormField/FormField';

const AdditionalHospitalizationForm: FC = () => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik
      initialValues={store.form.additionalHospitalization}
      onSubmit={() => {}}>
      {(formProps) => (
        <div className={'form-section'}>
          <DropDownContent title={'Дополнительная диспансеризация'}>
            <FormArrayField
              values={formProps.values.hospitalizations}
              name={'hospitalizations'}
              renderChild={(key, index) => (
                <Row gutter={16}>
                  <Col>
                    <FormField label={'Код'}>
                      <Input
                        name={`hospitalizations[${index}].code`}
                        onChange={formProps.handleChange}
                      />
                    </FormField>
                  </Col>
                  <Col>
                    <FormField label={'Дата начала'}>
                      <DatePicker />
                    </FormField>
                  </Col>
                  <Col>
                    <FormField label={'Дата окончания'}>
                      <DatePicker />
                    </FormField>
                  </Col>
                  <Col>
                    <FormField label={'Код МО'}>
                      <Input
                        name={`hospitalizations[${index}].codeMo`}
                        onChange={formProps.handleChange}
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

export default AdditionalHospitalizationForm;
