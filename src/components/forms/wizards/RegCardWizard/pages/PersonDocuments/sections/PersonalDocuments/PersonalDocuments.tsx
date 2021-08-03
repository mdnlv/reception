import React, {FC, useCallback, useEffect} from 'react';
import {Col, Row, Select, Button, Divider} from 'antd';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import {CloseCircleOutlined} from "@ant-design/icons";

import {LABELS, DROPDOWN_TITLE} from "./types";
import {WizardStateType} from "../../../../types";
import {detailedDocumentTypesSelector} from "../../../../../../../../reduxStore/slices/rb/selectors";
import {RootState} from "../../../../../../../../reduxStore/store";
import {PassportInfoType} from "../../../PassportGeneral/types";

import FormField from '../../../../../../components/FormField/FormField';
import DropDownContent from "../../../../../../../elements/DropDownContent/DropDownContent";
import ArrayFieldWrapper from "../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper";
import FastSearchSelect from "../../../../../../components/fields/FastSearchSelect/FastSearchSelect";
import FastDatePicker from "../../../../../../components/fields/FastDatePicker/FastDatePicker";
import FastInput from "../../../../../../components/fields/FastInput/FastInput";

const PersonalDocuments: FC = () => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.personDocs.documents;
  const formValuesRemoved = form.values.personDocs.documentsDeleted;
  const statuses = form.values.socialStatus.socialStatus;
  const docTypes = useSelector(detailedDocumentTypesSelector);
  const {documentTypes: loadingDocTypes} = useSelector((state: RootState) => state.rb.loading);

  // useEffect(() => {
  //   console.log('formValues docs', formValues);
  // }, [formValues]);
  //
  // useEffect(() => {
  //   console.log('formValues docsRemoved', formValuesRemoved);
  // }, [formValuesRemoved]);

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `personDocs.documents[${index}].${fieldChain}`;
  };

  const getPropsList = (props: { id: number; name: string }[]) => {
    return props.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  };

  const onAddDocument = useCallback(() => {
    const document: PassportInfoType = {
      passportType: '',
      serialFirst: '',
      serialSecond: '',
      number: '',
      fromDate: '',
      givenBy: '',
    };
    const newArr = [...formValues, document];
    form.setFieldValue('personDocs.documents', newArr);
  }, [formValues]);

  const onRemoveDocument = useCallback((index: number) => {
    const result = formValues[index];
    const newRemovedArr = [...formValuesRemoved, {...result, deleted: 1}];
    const newArr = formValues.filter((item, i) => i !== index);
    const statusRes = statuses.find((item) => item.document.id === result.id);
    const statusResIndex = statuses.findIndex((item) => item.document.id === result.id);
    form.setFieldValue('personDocs.documentsDeleted', newRemovedArr);
    form.setFieldValue('personDocs.documents', newArr);
    form.setFieldValue(
      `socialStatus.socialStatus[${statusResIndex}]`,
      {...statusRes, document: {...statusRes?.document, deleted: 1}}
    );
  }, [formValues]);

  return (
    <div className="form-section">
      <DropDownContent title={DROPDOWN_TITLE}>
        <ArrayFieldWrapper<PassportInfoType>
          name={'documents'}
          values={formValues}
          onAddItem={onAddDocument}
          showActions
          renderChild={(_, index) => (
            <div key={index}>
              <Row gutter={16}>
                <Col xl={4} xxl={3}>
                  <FormField label={LABELS.TYPE} name={getSelectionPath(index, 'passportType')}>
                    <FastSearchSelect
                      filterOption
                      loading={loadingDocTypes}
                      optionFilterProp={'name'}
                      showSearch
                      name={getSelectionPath(index, 'passportType')}
                    >
                      {getPropsList(docTypes)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={2}>
                  <FormField label={LABELS.SERIAL} name={getSelectionPath(index, 'serialFirst')} >
                    <FastInput name={getSelectionPath(index, 'serialFirst')} />
                  </FormField>
                </Col>
                <Col span={2}>
                  <FormField label={LABELS.SERIAL} name={getSelectionPath(index, 'serialSecond')} >
                    <FastInput name={getSelectionPath(index, 'serialSecond')} />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.NUMBER} name={getSelectionPath(index, 'number')} >
                    <FastInput name={getSelectionPath(index, 'number')} />
                  </FormField>
                </Col>
                {index !== 0 && (
                  <Col span={1}>
                    <Button
                      type={'link'}
                      size={'small'}
                      shape="circle"
                      icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                      onClick={onRemoveDocument.bind(this, index)}
                    />
                  </Col>
                )}
              </Row>
              <Row gutter={16}>
                <Col span={3}>
                  <FormField label={LABELS.DATE} name={getSelectionPath(index, 'fromDate')} >
                    <FastDatePicker name={getSelectionPath(index, 'fromDate')} />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.ORIGIN} name={getSelectionPath(index, 'givenBy')} >
                    <FastInput name={getSelectionPath(index, 'givenBy')} />
                  </FormField>
                </Col>
              </Row>
              <Divider/>
            </div>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default PersonalDocuments;
