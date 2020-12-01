import React, {FC, useEffect, useMemo} from 'react';
import { Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import moment from 'moment';

import { WizardStateType } from '../../../../types';
import {SectionProps, LABELS} from "./types";

import FormField from '../../../../../../components/FormField/FormField';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';

const PersonalDocument: FC<SectionProps> = ({
  documentTypes,
  isLoadingDocuments,
}) => {
  const form = useFormikContext<WizardStateType>();
  const formProps = form.values.passportGeneral.passportInfo;
  const selectionValuePath = 'passportGeneral.passportInfo';

  const documentTypeOptions = useMemo(() => {
    return documentTypes.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  }, [documentTypes]);

  return (
    <div className="form-section personal-document">
      <h2>Документ</h2>
      <Row gutter={16}>
        <Col span={8}>
          <FormField label={LABELS.PASSPORT}>
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
        <Col span={2}>
          <FormField label={LABELS.SERIAL}>
            <FastInput name={`${selectionValuePath}.serialFirst`} />
          </FormField>
        </Col>
        <Col span={2}>
          <FormField label={LABELS.SERIAL}>
            <FastInput name={`${selectionValuePath}.serialSecond`} />
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
