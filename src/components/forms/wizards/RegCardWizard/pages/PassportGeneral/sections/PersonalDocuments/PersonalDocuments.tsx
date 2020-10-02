import React, { FC } from 'react';
import { Col, DatePicker, Input, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import moment from 'moment';
import { RegistrationCardState } from '../../../../../../../../store/registrationCard/types';
import FormField from '../../../../../../components/FormField/FormField';
import optionsListMapper, {
  ListItem,
} from '../../../../../../../../utils/mappers/optionsListMapper';

interface SectionProps {
  docTypes: ListItem[];
}

const PersonalDocument: FC<SectionProps> = (props) => {
  const form = useFormikContext<RegistrationCardState>();
  const formProps = form.values.passportGeneral.passportInfo;
  const selectionValuePath = 'passportGeneral.passportInfo';

  const docTypesOptions = optionsListMapper(props.docTypes);

  return (
    <div className="form-section personal-document">
      <h2>Документ</h2>
      <Row gutter={16}>
        <Col span={5}>
          <FormField label="Паспорт">
            <Select>{docTypesOptions}</Select>
          </FormField>
        </Col>
        <Col span={5}>
          <FormField label="Серия">
            <Input
              name={`${selectionValuePath}.serial`}
              value={formProps.serial}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
        <Col span={7}>
          <FormField label="Номер">
            <Input
              name={`${selectionValuePath}.number`}
              value={formProps.number}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
        <Col span={4}>
          <FormField label="Дата выдачи">
            <DatePicker
              value={
                formProps.fromDate ? moment(formProps.fromDate) : undefined
              }
              onChange={(date, dateString) => {
                form.setFieldValue(
                  `${selectionValuePath}.fromDate`,
                  dateString,
                );
              }}
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormField label="Кем выдан">
            <Input
              name={`${selectionValuePath}.givenBy`}
              value={formProps.givenBy}
              onChange={form.handleChange}
            />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDocument;
