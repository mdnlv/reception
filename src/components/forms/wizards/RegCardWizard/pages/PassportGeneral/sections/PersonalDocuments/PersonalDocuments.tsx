import React, { FC, useCallback } from 'react';
import { Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import moment from 'moment';
import FormField from '../../../../../../components/FormField/FormField';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import { WizardStateType } from '../../../../types';

interface SectionProps {
  documentTypes: { id: number; name: string }[];
}

enum LABELS {
  PASSPORT = 'Паспорт',
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  GIVEN_DATE = 'Дата выдачи',
  GIVEN_BY = 'Кем выдан',
}

const PersonalDocument: FC<SectionProps> = ({ documentTypes }) => {
  const form = useFormikContext<WizardStateType>();
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
          <FormField label={LABELS.PASSPORT}>
            <FastSearchSelect name={`${selectionValuePath}.passportType`}>
              {documentTypeOptions}
            </FastSearchSelect>
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label={LABELS.SERIAL}>
            <FastInput name={`${selectionValuePath}.serial`} />
          </FormField>
        </Col>
        <Col span={7}>
          <FormField label={LABELS.NUMBER}>
            <FastInput name={`${selectionValuePath}.number`} />
          </FormField>
        </Col>
        <Col span={4}>
          <FormField label={LABELS.GIVEN_DATE}>
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
          <FormField label={LABELS.GIVEN_BY}>
            <FastInput name={`${selectionValuePath}.givenBy`} />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDocument;
