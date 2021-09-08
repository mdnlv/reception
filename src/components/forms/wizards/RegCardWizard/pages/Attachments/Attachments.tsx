import React, {useCallback, useEffect} from 'react';
import { Col, Row, Select, Button, TreeSelect } from 'antd';
import { useFormikContext } from 'formik';
import { useSelector} from 'react-redux';
import {CloseCircleOutlined} from "@ant-design/icons";
import {format} from "date-fns";

import { DROPDOWN_TITLE, LABELS, PersonAttachment } from './types';
import { WizardStateType } from '../../types';
import {
  detailedAttachTypesSelector,
  detailedOrganisationsSelector,
  detailedDetachmentReasonsSelector,
} from '../../../../../../reduxStore/slices/rb/selectors';
import { RootState } from '../../../../../../reduxStore/store';
import {PersonTree} from "../../../../../../reduxStore/slices/personTree/types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import ArrayFieldWrapper from '../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';
import TreeSelectField from "../../../../components/fields/TreeSelect";

const Attachments: React.FC = () => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.attachments.attachments;
  const formValuesRemoved = form.values.attachments.deleted;
  const attachTypes = useSelector(detailedAttachTypesSelector);
  const orgs = useSelector(detailedOrganisationsSelector);
  const personTree = useSelector((state:RootState) => state.personTree.person_tree_full);
  const detachmentReasons = useSelector(detailedDetachmentReasonsSelector);
  const {
    organisations: loadingOrgs,
    attachTypes: loadingAttachTypes,
    detachmentReasons: loadingDetachmentReasons,
  } = useSelector((state: RootState) => state.rb.loading);

  // useEffect(() => {
  //   console.log('formValues', formValues);
  // }, [formValues]);

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `attachments.attachments[${index}].${fieldChain}`;
  };

  const getPropsList = (props: { id: number; name: string }[]) => {
    return props.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  };

  const renderTreeNodes = (data:PersonTree[]) =>
    data.map((item: PersonTree) => {
      return (
        <TreeSelect.TreeNode  value={item.id} key={item.id}  title={item.name}  {...item}>
          {item.child.length && renderTreeNodes(item.child)}
        </TreeSelect.TreeNode>
      );
    });

  const onAddAttachment = useCallback(() => {
    const attachment: PersonAttachment = {
      lpu: '',
      fromDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: '',
      type: '2',
      unit: '',
      detachmentReason: '',
      deleted: 0,
    };
    const newArr = [...formValues, attachment];
    form.setFieldValue('attachments.attachments', newArr);
  }, [formValues]);

  const onRemoveAttachment = useCallback((index: number) => {
    const result = formValues[index];
    const newRemovedArr = [...formValuesRemoved, {...result, deleted: 1}];
    const newArr = formValues.filter((item, i) => i !== index);
    form.setFieldValue('attachments.deleted', newRemovedArr);
    form.setFieldValue('attachments.attachments', newArr);
  }, [formValues]);

  return (
    <form className={'wizard-step attachments-form'}>
      <div className="form-section">
        <DropDownContent title={DROPDOWN_TITLE}>
          <ArrayFieldWrapper<PersonAttachment>
            values={formValues}
            name={'attachments'}
            onAddItem={onAddAttachment}
            showActions
            renderChild={(key, index) => (
              <Row gutter={16} key={index}>
                <Col xl={8} xxl={3}>
                  <FormField label={LABELS.TYPE} name={getSelectionPath(index, 'type')}>
                    <FastSearchSelect
                      showSearch
                      filterOption
                      optionFilterProp={'name'}
                      loading={loadingAttachTypes}
                      name={getSelectionPath(index, 'type')}>
                      {getPropsList(attachTypes)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col xl={8} xxl={6}>
                  <FormField label={LABELS.LPU} name={getSelectionPath(index, 'lpu')}>
                    <FastSearchSelect
                      showSearch
                      filterOption
                      optionFilterProp={'name'}
                      loading={loadingOrgs}
                      name={getSelectionPath(index, 'lpu')}>
                      {getPropsList(orgs)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col xl={8} xxl={4}>
                  <FormField label={LABELS.UNIT} name={getSelectionPath(index, 'unit')}>
                    <TreeSelectField
                      // @ts-ignore
                      defaultValue={parseInt(formValues[index].unit)}
                      name={getSelectionPath(index, 'unit')}
                      onClear={() => form.setFieldValue(`attachments.attachments[${index}].unit`, '')}
                    >
                      {renderTreeNodes(personTree)}
                    </TreeSelectField>
                  </FormField>
                </Col>
                <Col xl={8} xxl={3}>
                  <FormField label={LABELS.ATTACHMENT_DATE}>
                    <FastDatePicker
                      name={getSelectionPath(index, 'fromDate')}
                    />
                  </FormField>
                </Col>
                <Col xl={8} xxl={3}>
                  <FormField label={LABELS.DETACH_DATE}>
                    <FastDatePicker name={getSelectionPath(index, 'endDate')} />
                  </FormField>
                </Col>
                <Col xl={6} xxl={4}>
                  <FormField label={LABELS.DETACH_REASON}>
                    <FastSearchSelect
                      showSearch
                      filterOption
                      optionFilterProp={'name'}
                      loading={loadingDetachmentReasons}
                      name={getSelectionPath(index, 'detachmentReason')}>
                      {getPropsList(detachmentReasons)}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={1}>
                  <Button
                    type={'link'}
                    size={'small'}
                    shape="circle"
                    icon={<CloseCircleOutlined className={'fields-btn__icon fields-btn__icon-remove'}/>}
                    onClick={onRemoveAttachment.bind(this, index)}
                  />
                </Col>
              </Row>
            )}
          />
        </DropDownContent>
      </div>
    </form>
  );
};

export default Attachments;
