import React, {useCallback} from 'react';
import {Modal, Descriptions} from "antd";

import {ValidationModalProps} from "./types";

const RegCardValidation: React.FC<ValidationModalProps> = ({
  isVisible,
  onClose,
  errors
}) => {
  const getTabName = (name: string) => {
    switch (name) {
      case 'personal':
        return 'Персональные данные';
      case 'passportGeneral':
        return 'Паспортные данные';
      case 'socialStatus':
        return 'Социальный статус';
      case 'employment':
        return 'Занятость';
      case 'attachments':
        return 'Прикрепление';
    }
  };

  const getNameItem = (item: string) => {
    const itemArr = item.match(/[^ ]+/g);
    itemArr?.splice(0, 2);
    return itemArr?.join(' ');
  };

  const getErrorNames = useCallback((obj) => {
    const errNameArr = [] as string[];
    for (let key in obj) {
      const item = obj[key];
      if (typeof item === 'string') {
        errNameArr.push(getNameItem(item) || '');
      } else if (Array.isArray(item)) {
        for (let i = 0; i < item.length; i++) {
          for (let innerKey in item[i]) {
            const innerItem = item[i][innerKey];
            !errNameArr.includes(innerItem)
              && errNameArr.push(getNameItem(innerItem) || '');
          }
        }
      } else if (typeof item === 'object' && item !== null) {
        for (let innerKey in item) {
          const innerItem = item[innerKey];
          if (typeof innerItem === 'string') {
            errNameArr.push(getNameItem(innerItem) || '');
          }
        }
      }
    }
    return errNameArr.join(', ')
  }, [isVisible]);

  const modalContent = useCallback(() => {
    const errNameArr = [] as string[];
    for (let key in errors) {
      errNameArr.push(key)
    }
    return errNameArr.map((item, index) => (
      // @ts-ignore
      <Descriptions.Item key={index} label={getTabName(item)}>{getErrorNames(errors[item])}</Descriptions.Item>
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

export default RegCardValidation;
