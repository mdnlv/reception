import React, {useMemo, useCallback} from 'react';
import {Col, Row, Select} from 'antd';
import {useSelector} from 'react-redux';
import {useFormikContext} from 'formik';

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
    };

    const newArr = [...formValues, item];
    form.setFieldValue('outsideIdentification.outsideIds', newArr);
  }, [formValues]);

  const onRemoveAttachment = useCallback(() => {
    if (formValues.length > 0) {
      form.setFieldValue('outsideIdentification.outsideIds', formValues.slice(0, formValues.length - 1));
    }
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
            onRemoveItem={() => onRemoveAttachment()}
            showActions
            name={'outsideIds'}
            renderChild={(_, index:number) => (
                <Row key={index} align={'bottom'} gutter={16}>
                <Col span={5}>
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
                <Col span={5}>
                  <FormField label={LABELS.IDENTS} name={getSelectionPath(index, 'idRef')}>
                    <FastInput name={getSelectionPath(index, 'idRef')} />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={LABELS.DATE} name={getSelectionPath(index, 'date')}>
                    <FastDatePicker name={getSelectionPath(index, 'date')}/>
                  </FormField>
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
