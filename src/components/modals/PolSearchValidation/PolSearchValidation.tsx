import React, {useCallback} from 'react';
import {Modal, Descriptions} from "antd";

import {ValidationModalProps} from "./types";

const PolSearchValidation: React.FC<ValidationModalProps> = ({
  isVisible,
  onClose,
  errors
}) => {
  const modalContent = useCallback(() => {
    return errors.map((item, index) => (
      // @ts-ignore
      <Descriptions.Item key={index}>{item}</Descriptions.Item>
    ))
  }, [isVisible]);

  return (
    <Modal
      wrapClassName={'app-modal'}
      onCancel={onClose}
      visible={isVisible}
      title={'Незаполненные поля!'}
      footer={null}
    >
      <Descriptions column={1}>
        {modalContent()}
      </Descriptions>
    </Modal>
  );
};

export default PolSearchValidation;
