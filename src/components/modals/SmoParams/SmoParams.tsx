import React, {useEffect, KeyboardEvent} from 'react';
import {Modal, Row, Button} from "antd";
import { useFormikContext } from 'formik';

import {ModalProps} from "./types";
import {WizardStateType} from "../../forms/wizards/RegCardWizard/types";

import FormField from "../../forms/components/FormField/FormField";
import FastSearchSelect from "../../forms/components/fields/FastSearchSelect/FastSearchSelect";
import FastInput from "../../forms/components/fields/FastInput/FastInput";

const SmoParams: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  policyKey,
  getKladrDetailed,
  onCancel,
  onOk,
  index
}) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = policyKey === 'policyOms'
    ? form.values.personDocs.policies[index || 0]
    : form.values.passportGeneral.policyDms;
  const sectionValuePath = policyKey !== 'policyDms'
    ? `personDocs.policies[${index}]`
    : `passportGeneral.policyDms`;

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        onOk && onOk();
        onClose && onClose();
      }
    };
    //@ts-ignore
    window.addEventListener('keydown', handleEnter);
    return () => {
      //@ts-ignore
      window.removeEventListener('keydown', handleEnter);
    };
  }, [formValues]);

  return (
    <Modal
      wrapClassName={'app-modal'}
      onCancel={onClose}
      visible={isVisible}
      title="Выбор организации"
      footer={(
        <Row justify={'end'}>
          <Button
            type="primary"
            className={'save-btn'}
            onClick={() => {
              onOk && onOk();
              onClose && onClose();
            }}
          >
            ОК
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              onCancel && onCancel();
              onClose && onClose();
            }}
          >
            Отмена
          </Button>
        </Row>
      )}
    >
      <FormField label="Название содержит" name={`${sectionValuePath}.smoShort`} labelPosition="left">
        <FastInput name={`${sectionValuePath}.smoShort`}/>
      </FormField>
      <FormField label="ИНН" name={`${sectionValuePath}.inn`} labelPosition="left">
        <FastInput name={`${sectionValuePath}.inn`}/>
      </FormField>
      <FormField label="ОГРН" name={`${sectionValuePath}.ogrn`} labelPosition="left">
        <FastInput name={`${sectionValuePath}.ogrn`}/>
      </FormField>
      <FormField label="Код ИНФИС" name={`${sectionValuePath}.infisCode`} labelPosition="left">
        <FastInput name={`${sectionValuePath}.infisCode`}/>
      </FormField>
      <FormField label="Территория страхования" name={`${sectionValuePath}.cmoArea`} labelPosition="left">
        <FastSearchSelect
          allowClear
          filterOption
          optionFilterProp={'name'}
          showSearch
          name={`${sectionValuePath}.cmoArea`}
        >
          {getKladrDetailed()}
        </FastSearchSelect>
      </FormField>
    </Modal>
  );
};

export default SmoParams;
