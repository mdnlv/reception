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
  const sectionValuePath = `socialStatus.socialStatus`;
  const removedValuePath = `socialStatus.deleted`;
  const [index, setIndex] = useState(0);
  const [cleanable, setCleanable] = useState(false);

  useEffect(() => {
    cleanable && form.setFieldValue(`${sectionValuePath}.[${index}].statusType`, '');
  }, [formValues && formValues[index] && formValues[index].class]);

  const getSelectionPath = (indexData: number, fieldChain: string) => {
    return `${sectionValuePath}[${indexData}].${fieldChain}`;
  };

  const onAddStatus = useCallback(() => {
    const status: SocialStatus = {
      statusType: '',
      note: '',
      fromDate: '',
      endDate: '',
      class: '',
      docType: '',
      serialFirst: '',
      serialSecond: '',
      number: '',
      date: '',
      givenBy: '',
      deleted: 0,
    };
    form.setFieldValue(sectionValuePath, [...formValues, status]);
  }, [form.setFieldValue, formValues]);

  const onRemoveStatus = useCallback((index: number) => {
    const result = formValues[index];
    const newRemovedArr = [...formValuesRemoved, {...result, deleted: 1}];
    const newArr = formValues.filter((item, i) => i !== index);
    form.setFieldValue(removedValuePath, newRemovedArr);
    form.setFieldValue(sectionValuePath, newArr);
  }, [form.setFieldValue, formValues]);

  const propsList = useCallback(
    (items: ListOptionProps[], listName?: string) => {
      if (listName !== 'types') {
        return items.map((item) => (
          <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
            {item.name}
          </Select.Option>
        ));
      } else {
        const types = items.filter(
          (item) => item.classId === parseInt(formValues[index]?.class || '0')
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
                <Col span={6}>
                  <FormField label={LABELS.CLASS} name={getSelectionPath(indexData, 'class')}>
                    <FastSearchSelect
                      loading={isLoadingClasses}
                      showSearch
                      filterOption
                      optionFilterProp={'name'}
                      onFocus={setCleanable.bind(this, true)}
                      name={getSelectionPath(indexData, 'class')}>
                      {propsList(socialClassesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={6}>
                  <FormField label={LABELS.STATUS_TYPE} name={getSelectionPath(indexData, 'statusType')}>
                    <FastSearchSelect
                      loading={isLoadingTypes}
                      showSearch
                      filterOption
                      optionFilterProp={'name'}
                      name={getSelectionPath(indexData, 'statusType')}>
                      {propsList(socialTypesList, 'types')}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.START_DATE} name={getSelectionPath(indexData, 'fromDate')}>
                    <FastDatePicker name={getSelectionPath(indexData, 'fromDate')}/>
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.END_DATE} name={getSelectionPath(indexData, 'endDate')}>
                    <FastDatePicker name={getSelectionPath(indexData, 'endDate')}/>
                  </FormField>
                </Col>
                <Col span={5}>
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
                <Col span={3}>
                  <FormField label={LABELS.DOC_TYPE} name={getSelectionPath(indexData, 'docType')}>
                    <FastSearchSelect
                      filterOption
                      loading={isLoadingDocuments}
                      optionFilterProp={'name'}
                      showSearch
                      name={getSelectionPath(indexData, 'docType')}
                    >
                      {propsList(documentTypesList)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={1}>
                  <FormField label={LABELS.SERIAL}>
                    <FastInput name={getSelectionPath(indexData, 'serialFirst')} />
                  </FormField>
                </Col>
                <Col span={1}>
                  <FormField label={LABELS.SERIAL}>
                    <FastInput name={getSelectionPath(indexData, 'serialSecond')} />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.NUMBER}>
                    <FastInput name={getSelectionPath(indexData, 'number')} />
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <FormField label={LABELS.DATE}>
                    <FastDatePicker name={getSelectionPath(indexData, 'date')} />
                  </FormField>
                </Col>
                <Col span={5}>
                  <FormField label={LABELS.GIVEN}>
                    <FastInput name={getSelectionPath(indexData, 'givenBy')} />
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
