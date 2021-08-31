import React, {FC, useMemo, useEffect} from 'react';
import { Col, Row, Select } from 'antd';
import {useFormikContext} from "formik";

import {SectionProps, LABELS} from "./types";
import {WizardStateType} from "../../../../types";

import FormField from '../../../../../../components/FormField/FormField';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';

const PersonalDocument: FC<SectionProps> = ({
  documentTypes,
  isLoadingDocuments,
}) => {
  const formProps = useFormikContext<WizardStateType>();
  const formValues = formProps.values.personDocs.documents[0];
  const selectionValuePath = 'personDocs.documents[0]';

  // useEffect(() => {
  //   console.log('formValues', formValues);
  // }, [formValues]);

  const documentTypeOptions = useMemo(
    () =>
      documentTypes.map((item) => (
        <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      )), [documentTypes]);

  return (
    <div className="form-section personal-document">
      <h2>Документ</h2>
      <Row gutter={16}>
        <Col xl={24}>
          <FormField label={LABELS.PASSPORT} name={`${selectionValuePath}.passportType`}>
            <FastSearchSelect
              filterOption
              loading={isLoadingDocuments}
              optionFilterProp={'name'}
              showSearch
              name={`${selectionValuePath}.passportType`}>
              {documentTypeOptions}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={12} xxl={2}>
          <FormField label={LABELS.SERIAL} name={`${selectionValuePath}.serialFirst`}>
            <FastInput name={`${selectionValuePath}.serialFirst`} />
          </FormField>
        </Col>
        <Col lg={12} xxl={2}>
          <FormField label={LABELS.SERIAL} name={`${selectionValuePath}.serialSecond`}>
            <FastInput name={`${selectionValuePath}.serialSecond`} />
          </FormField>
        </Col>
        <Col xxl={7}>
          <FormField label={LABELS.NUMBER} name={`${selectionValuePath}.number`}>
            <FastInput name={`${selectionValuePath}.number`} />
          </FormField>
        </Col>
        <Col xl={7} xxl={7}>
          <FormField label={LABELS.GIVEN_DATE} name={`${selectionValuePath}.fromDate`}>
            <FastDatePicker
              name={`${selectionValuePath}.fromDate`}
            />
          </FormField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <FormField label={LABELS.GIVEN_BY} name={`${selectionValuePath}.givenBy`}>
            <FastInput name={`${selectionValuePath}.givenBy`} />
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDocument;
