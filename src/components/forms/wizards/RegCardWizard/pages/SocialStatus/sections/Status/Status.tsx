import React, {useState, useCallback, useMemo, useEffect} from 'react';
import { Col, Divider, Row, Select, Button } from 'antd';
import { useFormikContext } from 'formik';
import {CloseCircleOutlined} from "@ant-design/icons";

import { WizardStateType } from '../../../../types';
import { SocialStatus } from '../../../../../../SocialStatusForm/types';
import {StatusProps, ListOptionProps, LABELS, DROPDOWN_TITLE} from "./types";

import DropDownContent from '../../../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../../../components/FormField/FormField';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import ArrayFieldWrapper from '../../../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';

const Status: React.FC<StatusProps> = ({
  socialTypesList,
  socialClassesList,
  documentTypesList,
  isLoadingClasses,
  isLoadingTypes,
  isLoadingDocuments
}) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.socialStatus.socialStatus;
  const formValuesRemoved = form.values.socialStatus.deleted;
  const docs = form.values.personDocs.documents;
  const docsRemoved = form.values.personDocs.documentsDeleted;
  const sectionValuePath = `socialStatus.socialStatus`;
  const removedValuePath = `socialStatus.deleted`;
  const [index, setIndex] = useState(0);
  const [cleanable, setCleanable] = useState(false);

  // useEffect(() => {
  //   console.log('formValues status', formValues);
  // }, [formValues]);

  useEffect(() => {
    cleanable && form.setFieldValue(`${sectionValuePath}.[${index}].statusType`, '');
  }, [formValues && formValues[index] && formValues[index].class]);

  const getSelectionPath = (indexData: number, fieldChain: string) => {
    return `${sectionValuePath}[${indexData}].${fieldChain}`;
  };

  const onAddStatus = useCallback(() => {
    const status: SocialStatus = {
      class: '',
      statusType: '',
      fromDate: '',
      endDate: '',
      note: '',
      deleted: 0,
      document: {
        passportType: '',
        serialFirst: '',
        serialSecond: '',
        number: '',
        fromDate: '',
        givenBy: '',
        deleted: 0,
      }
    };
    form.setFieldValue(sectionValuePath, [...formValues, status]);
  }, [form.setFieldValue, formValues]);

  const onRemoveStatus = useCallback((index: number) => {
    const result = formValues[index];
    const newRemovedArr = [...formValuesRemoved, {...result, deleted: 1}];
    const newArr = formValues.filter((item, i) => i !== index);
    const docResult = docs.find((item) => item.id === result.document.id);
    const newDocsRemovedArr = [...docsRemoved, {...docResult, deleted: 1}];
    const newDocsArr = docs.filter((item) => item.id !== docResult?.id);
    form.setFieldValue(removedValuePath, newRemovedArr);
    form.setFieldValue(sectionValuePath, newArr);
    form.setFieldValue('personDocs.documentsDeleted', newDocsRemovedArr);
    form.setFieldValue('personDocs.documents', newDocsArr);
  }, [form.setFieldValue, formValues]);

  const propsList = useCallback(
    (items: ListOptionProps[], listName?: string, classId?: string) => {
      if (listName !== 'types') {
        return items.map((item) => (
          <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
            {item.name}
          </Select.Option>
        ));
      } else {
        const types = items.filter(
          (item) => item.classId === parseInt(classId || '0')
        );
        return types.map((item) => (
          <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
            {item.name}
          </Select.Option>
        ));
      }
    },
    [socialTypesList, socialClassesList, index, formValues],
  );

  const StatusValue = useMemo(() => {
    return (
      <ArrayFieldWrapper
        name={sectionValuePath}
        values={formValues}
        onAddItem={onAddStatus}
        showActions
        renderChild={(status, indexData) => {
          setIndex(indexData);
          return (
            <div key={indexData}>
              <Row gutter={16}>
                <Col xl={12} xxl={6}>
                  <FormField label={LABELS.CLASS} name={getSelectionPath(indexData, 'class')}>
                    <FastSearchSelect
                      loading={isLoadingClasses}
                      allowClear
                      showSearch
                      filterOption
                      optionFilterProp={'name'}
                      onFocus={setCleanable.bind(this, true)}
                      name={getSelectionPath(indexData, 'class')}>
                      {propsList(socialClassesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col xl={12} xxl={6}>
                  <FormField label={LABELS.STATUS_TYPE} name={getSelectionPath(indexData, 'statusType')}>
                    <FastSearchSelect
                      loading={isLoadingTypes}
                      allowClear
                      showSearch
                      filterOption
                      optionFilterProp={'name'}
                      name={getSelectionPath(indexData, 'statusType')}>
                      {propsList(socialTypesList, 'types', formValues[indexData]?.class)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col xl={6} xxl={3}>
                  <FormField label={LABELS.START_DATE} name={getSelectionPath(indexData, 'fromDate')}>
                    <FastDatePicker name={getSelectionPath(indexData, 'fromDate')}/>
                  </FormField>
                </Col>
                <Col xl={6} xxl={3}>
                  <FormField label={LABELS.END_DATE} name={getSelectionPath(indexData, 'endDate')}>
                    <FastDatePicker name={getSelectionPath(indexData, 'endDate')}/>
                  </FormField>
                </Col>
                <Col xl={11} xxl={5}>
                  <FormField label={LABELS.NOTE}>
                    <FastInput name={getSelectionPath(indexData, 'note')}/>
                  </FormField>
                </Col>
                <Col span={1}>
                  <Button
                    type={'link'}
                    size={'small'}
                    shape="circle"
                    icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                    onClick={onRemoveStatus.bind(this, indexData)}
                  />
                </Col>
              </Row>
              <Divider/>
              <Row gutter={16} align={'bottom'}>
                <Col xl={11} xxl={9}>
                  <FormField label={LABELS.DOC_TYPE} name={getSelectionPath(indexData, 'document.passportType')}>
                    <FastSearchSelect
                      allowClear
                      filterOption
                      loading={isLoadingDocuments}
                      optionFilterProp={'name'}
                      showSearch
                      name={getSelectionPath(indexData, 'document.passportType')}
                    >
                      {propsList(documentTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={2}>
                  <FormField label={LABELS.SERIAL}>
                    <FastInput name={getSelectionPath(indexData, 'document.serialFirst')} />
                  </FormField>
                </Col>
                <Col span={2}>
                  <FormField label={LABELS.SERIAL}>
                    <FastInput name={getSelectionPath(indexData, 'document.serialSecond')} />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.NUMBER}>
                    <FastInput name={getSelectionPath(indexData, 'document.number')} />
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col xl={24} xxl={3}>
                  <FormField label={LABELS.DATE}>
                    <FastDatePicker name={getSelectionPath(indexData, 'document.fromDate')} />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.GIVEN}>
                    <FastInput name={getSelectionPath(indexData, 'document.givenBy')} />
                  </FormField>
                </Col>
              </Row>
              <Divider/>
            </div>
          )
        }}
      />
    );
  }, [
    formValues,
    getSelectionPath,
    socialTypesList,
    socialClassesList,
    isLoadingTypes,
    isLoadingClasses,
  ]);

  return (
    <div className={'form-section social-status'}>
      <DropDownContent title={DROPDOWN_TITLE}>{StatusValue}</DropDownContent>
    </div>
  );
};

export default Status;
