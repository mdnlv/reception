import React, { FC, useCallback } from 'react';
import { Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import moment from 'moment';
import FormField from '../../../../../../components/FormField/FormField';
import { RegistrationCardStateType } from '../../../../../../../../reduxStore/slices/registrationCard/initialState';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';

interface SectionProps {
  documentTypes: { id: number; name: string }[];
}

const PersonalDocument: FC<SectionProps> = ({ documentTypes }) => {
  const form = useFormikContext<RegistrationCardStateType>();
  const formProps = form.values.passportGeneral.passportInfo;
  const selectionValuePath = 'passportGeneral.passportInfo';

  const documentTypeOptions = useCallback(() => {
    return documentTypes.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }, []);

  return (
    <div className="form-section personal-document">
      <h2>Документ</h2>
      <Row gutter={16}>
        <Col span={8}>
          <FormField label="Паспорт">
            <FastSearchSelect name={`${selectionValuePath}.passportType`}>
              {documentTypeOptions}
            </FastSearchSelect>
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label="Серия">
            <FastInput name={`${selectionValuePath}.serial`} />
          </FormField>
        </Col>
        <Col span={7}>
          <FormField label="Номер">
            <FastInput name={`${selectionValuePath}.number`} />
          </FormField>
        </Col>
        <Col span={4}>
          <FormField label="Дата выдачи">
            <FastDatePicker
              name={`${selectionValuePath}.fromDate`}
              value={
                formProps.fromDate ? moment(formProps.fromDate) : undefined
              }
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormField label="Кем выдан">
            <FastInput name={`${selectionValuePath}.givenBy`} />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDocument;
