import React, { FC } from 'react';
import { Col, DatePicker, Row, Select, Input } from 'antd';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import moment from 'moment';

import { RootState } from '../../../reduxStore/store';

import DropDownContent from '../../elements/DropDownContent/DropDownContent';
import FormField from '../components/FormField/FormField';
import FormArrayField from '../components/FormArrayField/FormArrayField';

const EtcForm: FC = () => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.form.etc} onSubmit={() => {}}>
      {(formProps) => (
        <form className={'etc-form'}>
          <div className="form-section">
            <DropDownContent title={'Прочее'}>
              <FormArrayField
                values={formProps.values.items}
                name={'items'}
                renderChild={(key, index) => (
                  <div>
                    <Row gutter={16}>
                      <Col>
                        <FormField
                          label={'Вы получили информацию о нашем учереждении'}>
                          <Select />
                        </FormField>
                      </Col>
                      <Col>
                        <FormField label={'Дата'}>
                          <DatePicker
                            onChange={formProps.handleChange}
                            value={moment(formProps.values.items[index]?.date)}
                          />
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormField label={'Примечание'}>
                          <Input.TextArea />
                        </FormField>
                      </Col>
                    </Row>
                  </div>
                )}
              />
            </DropDownContent>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EtcForm;
