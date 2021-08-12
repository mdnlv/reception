import React, {useCallback, useEffect} from 'react';
import {Modal, Descriptions, List} from "antd";

import {ValidationModalProps} from "./types";

const RegCardValidation: React.FC<ValidationModalProps> = ({
  isVisible,
  onClose,
  errors,
}) => {
  const getTabName = (name: string) => {
    switch (name) {
      case 'personal':
        return 'Персональные данные';
      case 'passportGeneral':
        return 'Паспортные данные';
      case 'personDocs':
        return 'Прикрепленные документы';
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

  const onModalClose = () => {
    const keyNames = Object.keys(errors);
    const tab = keyNames[0] === 'personal' ? 'passportGeneral' : keyNames[0];
    onClose && onClose();
  }

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
            if (typeof innerItem === 'string') {
              !errNameArr.includes(innerItem)
              && errNameArr.push(getNameItem(innerItem) || '');
            } else if (typeof innerItem === 'object' && innerItem !== null) {
              for (let nestedKey in innerItem) {
                const nestedItem = innerItem[nestedKey];
                errNameArr.push(getNameItem(nestedItem) || '');
              }
            }
          }
        }
      } else if (typeof item === 'object' && item !== null) {
        for (let innerKey in item) {
          const innerItem = item[innerKey];
          if (typeof innerItem === 'string') {
            errNameArr.push(getNameItem(innerItem) || '');
          } else if (Array.isArray(innerItem)) {
            for (let i = 0; i < innerItem.length; i++) {
              for (let nestedKey in innerItem[i]) {
                const nestedItem = innerItem[i][nestedKey];
                !errNameArr.includes(nestedItem)
                && errNameArr.push(getNameItem(nestedItem) || '');
              }
            }
          }
        }
      }
    }
    const errNameArrFiltered = errNameArr.filter((a, pos, self) => self.indexOf(a) == pos);
    return (
      <List
        dataSource={errNameArrFiltered}
        size="small"
        renderItem={(item) => <List.Item style={{paddingTop: 0, paddingBottom: 0}}>{item}</List.Item>}
      />
    )
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
      onCancel={onModalClose}
      visible={isVisible}
      title={'Незаполненные поля!'}
      footer={null}
      bodyStyle={{overflowY: 'scroll', height: 500}}
    >
      <Descriptions column={1}>
        {modalContent()}
      </Descriptions>
    </Modal>
  );
};

export default RegCardValidation;
