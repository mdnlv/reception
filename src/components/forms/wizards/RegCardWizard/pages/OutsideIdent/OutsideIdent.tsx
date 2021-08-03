import React, {useMemo, useCallback} from 'react';
import {Col, Row, Select, Button} from 'antd';
import {useSelector} from 'react-redux';
import {useFormikContext} from 'formik';
import {CloseCircleOutlined} from "@ant-design/icons";

import {DROPDOWN_TITLE, LABELS} from "./types";
import {detailedAccountingSystemSelector} from "../../../../../../reduxStore/slices/rb/selectors";
import {WizardStateType} from "../../types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import FastSearchSelect from "../../../../components/fields/FastSearchSelect/FastSearchSelect";
import ArrayFieldWrapper from "../../../../components/ArrayFieldWrapper/ArrayFieldWrapper";
import FastInput from "../../../../components/fields/FastInput/FastInput";
import FastDatePicker from "../../../../components/fields/FastDatePicker/FastDatePicker";

const OutsideIdent: React.FC = () => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.outsideIdentification.outsideIds;
  const formValuesRemoved = form.values.outsideIdentification.deleted;
  const accountingSystemTypes = useSelector(detailedAccountingSystemSelector);

  const accountingSystemTypesOptions = useMemo(() => {
    return accountingSystemTypes.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
        {item.name}
      </Select.Option>
    ));
  }, [accountingSystemTypes]);

  const onAddAttachment = useCallback(() => {
    const item = {
      outsideSchema: '',
      idRef: '',
      date: '',
      deleted: 0,
    };
    const newArr = [...formValues, item];
    form.setFieldValue('outsideIdentification.outsideIds', newArr);
  }, [formValues]);

  const onRemoveAttachment = useCallback((index: number) => {
    const result = formValues[index];
    const newRemovedArr = [...formValuesRemoved, {...result, deleted: 1}];
    const newArr = formValues.filter((item, i) => i !== index);
    form.setFieldValue('outsideIdentification.deleted', newRemovedArr);
    form.setFieldValue('outsideIdentification.outsideIds', newArr);
  }, [formValues]);

  const getSelectionPath = (index: number, fieldChain: string) => {
    return `outsideIdentification.outsideIds[${index}].${fieldChain}`;
  };

  return (
    <form className={'wizard-step outside-ident-form'}>
      <div className={'form-section'}>
        <DropDownContent title={DROPDOWN_TITLE}>
          <ArrayFieldWrapper<any>
            values={formValues}
            onAddItem={() => onAddAttachment()}
            showActions
            name={'outsideIds'}
            renderChild={(_, index:number) => (
                <Row key={index} align={'bottom'} gutter={16}>
                <Col span={7}>
                  <FormField label={LABELS.OUTSIDE_IDENTS} name={getSelectionPath(index, 'outsideSchema')}>
                    <FastSearchSelect
                      loading={false}
                      filterOption
                      optionFilterProp={'name'}
                      showSearch
                      name={getSelectionPath(index, 'outsideSchema')}
                    >
                      {accountingSystemTypesOptions}
                    </FastSearchSelect>
                  </FormField>
                </Col>
                <Col span={4}>
                  <FormField label={LABELS.IDENTS} name={getSelectionPath(index, 'idRef')}>
                    <FastInput name={getSelectionPath(index, 'idRef')} />
                  </FormField>
                </Col>
                <Col span={4}>
                  <FormField label={LABELS.DATE} name={getSelectionPath(index, 'date')}>
                    <FastDatePicker name={getSelectionPath(index, 'date')}/>
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

export default OutsideIdent;
