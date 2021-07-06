import React from 'react';
import {Modal, Row, Button} from "antd";

import {ModalProps} from "./types";

import FormField from "../../forms/components/FormField/FormField";
import FastSearchSelect from "../../forms/components/fields/FastSearchSelect/FastSearchSelect";
import FastInput from "../../forms/components/fields/FastInput/FastInput";

const SmoParams: React.FC<ModalProps> = ({isVisible, onClose, policyKey, getKladrDetailed}) => {
  const sectionValuePath = `passportGeneral.${policyKey}`;

  return (
    <Modal
      wrapClassName={'app-modal'}
      onCancel={onClose}
      visible={isVisible}
      title="Выбор организации"
      footer={(
        <Row justify={'end'}>
          <Button type="primary" className={'save-btn'}>
            ОК
          </Button>
          <Button type="primary" danger>
            Отмена
          </Button>
        </Row>
      )}
    >
      <FormField label="Название содержит" name={`${sectionValuePath}.name`} labelPosition="left">
        <FastInput name={`${sectionValuePath}.name`}/>
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
