import React from 'react';
import {Modal, Button, Row} from "antd";

import {ValidationModalProps} from "./types";

const RegCardValidation: React.FC<ValidationModalProps> = ({
  isVisible,
  onClose
}) => {
  return (
    <Modal
      wrapClassName={'app-modal'}
      onCancel={onClose}
      visible={isVisible}
      title={'Незаполненные поля!'}
      footer={
        <Row justify={'end'}>
          <Button type="primary" danger>
            Отмена
          </Button>
        </Row>
      }
    >

    </Modal>
  );
};

export default RegCardValidation;
