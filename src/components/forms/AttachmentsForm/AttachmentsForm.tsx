import React, {FC} from 'react';
import {Col, DatePicker, Row, Select} from 'antd';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';

import { RootState } from '../../../reduxStore/store';

import FormField from '../components/FormField/FormField';
import DropDownContent from '../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../components/FormArrayField/FormArrayField';

const AttachmentsForm: FC = () => {
  const store = useSelector((state: RootState) => state.registrationCard);

  return (
    <Formik initialValues={store.form.attachments} onSubmit={() => {}}>
      {(formProps) => (
        <form className={'attachments-form'}>
          <div className="form-section">
            <DropDownContent title={'Прикреплениe'}>
              <FormArrayField
                values={store.form.attachments.attachments}
                name={'attachments'}
                renderChild={(key, index) => (
                  <Row gutter={16} key={key}>
                    <Col span={3}>
                      <FormField label={'Тип'}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col span={6}>
                      <FormField label={'ЛПУ'}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col span={4}>
                      <FormField label={'Подразделение'}>
                        <Select />
                      </FormField>
                    </Col>
                    <Col span={3}>
                      <FormField label={'Дата прикрепления'}>
                        <DatePicker/>
                      </FormField>
                    </Col>
                    <Col span={3}>
                      <FormField label={'Дата открепления'}>
                        <DatePicker/>
                      </FormField>
                    </Col>
                    <Col span={5}>
                      <FormField label={'Причина открепления'}>
                        <Select />
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

export default AttachmentsForm;
