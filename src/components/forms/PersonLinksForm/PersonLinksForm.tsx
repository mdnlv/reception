import React, { FC } from 'react';
import DropDownContent from '../../elements/DropDownContent/DropDownContent';
import { Col, Divider, Row, Select } from 'antd';
import FormField from '../components/FormField/FormField';
import FormArrayField from '../components/FormArrayField/FormArrayField';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore/store';

const PersonLinksForm: FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.links} onSubmit={() => {}}>
      {(formProps) => (
        <form>
          <div className="form-section">
            <DropDownContent title={'Связи'}>
              <Row>
                <Col span={24}>
                  <FormArrayField
                    values={formProps.values.directLinks}
                    name={'directLinks'}
                    renderChild={(key, index) => (
                      <Row gutter={16}>
                        <Col span={5}>
                          <FormField label={'Прямая связь'}>
                            <Select />
                          </FormField>
                        </Col>
                        <Col span={7}>
                          <FormField label={'Связан с пациентом'}>
                            <Select />
                          </FormField>
                        </Col>
                      </Row>
                    )}
                  />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={24}>
                  <FormArrayField
                    values={formProps.values.backLinks}
                    name={'backLinksn'}
                    renderChild={(key, index) => (
                      <Row gutter={16}>
                        <Col span={5}>
                          <FormField label={'Обратная связь'}>
                            <Select />
                          </FormField>
                        </Col>
                        <Col span={7}>
                          <FormField label={'Связан с пациентом'}>
                            <Select />
                          </FormField>
                        </Col>
                      </Row>
                    )}
                  />
                </Col>
              </Row>
            </DropDownContent>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PersonLinksForm;
