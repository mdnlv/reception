import React, {useState, useEffect, KeyboardEvent} from 'react';
import {Modal, Row, Button} from "antd";
import { useFormikContext } from 'formik';

import {ModalProps} from "./types";
import {WizardStateType} from "../../forms/wizards/RegCardWizard/types";

import FormField from "../../forms/components/FormField/FormField";
import FastInput from "../../forms/components/fields/FastInput/FastInput";

const UnknownInfo: React.FC<ModalProps> = ({
  isVisible,
  onCancel,
  onOk,
}) => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.personalUnknown;
  const sectionValuePath = `personalUnknown`;
  const [isValidate, setValidate] = useState(false);

  useEffect(() => {
    formValues.addressUnknown
      && formValues.ageUnknown
      && setValidate(false);
  }, [formValues]);

  useEffect(() => {
    formValues.ageUnknown
      && isNaN(parseInt(formValues.ageUnknown))
      && form.setFieldValue(`${sectionValuePath}.ageUnknown`, '');
  }, [formValues.ageUnknown]);

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        onOk && onOk();
      }
    };
    //@ts-ignore
    window.addEventListener('keydown', handleEnter);
    return () => {
      //@ts-ignore
      window.removeEventListener('keydown', handleEnter);
    };
  }, [formValues]);

  const onSubmitForm = () => {
    formValues.addressUnknown && formValues.ageUnknown
      ? onOk()
      : setValidate(true);
  };

  return (
    <Modal
      wrapClassName={'app-modal'}
      onCancel={onCancel}
      visible={isVisible}
      title="Ввод информации о неизвестном"
      footer={(
        <Row justify={'end'}>
          <Button
            type="primary"
            className={'save-btn'}
            onClick={onSubmitForm}
          >
            ОК
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => onCancel()}
          >
            Отмена
          </Button>
        </Row>
      )}
    >
      <FormField label="Адрес, откуда привезли" name={`${sectionValuePath}.addressUnknown`} labelPosition="left">
        <FastInput name={`${sectionValuePath}.addressUnknown`} isError={isValidate && !formValues.addressUnknown}/>
      </FormField>
      <FormField label="Возраст визуального осмотра" name={`${sectionValuePath}.ageUnknown`} labelPosition="left">
        <FastInput name={`${sectionValuePath}.ageUnknown`} isError={isValidate && !formValues.ageUnknown}/>
      </FormField>
    </Modal>
  );
};

export default UnknownInfo;
