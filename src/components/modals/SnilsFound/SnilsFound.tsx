import React, {useState, useEffect} from 'react';
import {Modal, Row, Button, Typography, Table} from "antd";

import {ModalProps} from "./types";
import {SnilsFound as SnilsFoundType} from "../../forms/wizards/RegCardWizard/pages/PassportGeneral/types";

const columns = [
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Отчество',
    dataIndex: 'patrName',
    key: 'patrName',
  },
  {
    title: 'Дата Рождения',
    dataIndex: 'birthDate',
    key: 'birthDate',
  },
  {
    title: 'СНИЛС',
    dataIndex: 'snils',
    key: 'snils',
  },
];

const SnilsFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  data,
  onOk,
  errorMessage
}) => {
  const [currentKey, setCurrentKey] = useState(null as number | null);
  const [currentItem, setCurrentItem] = useState(null as SnilsFoundType | null);

  useEffect(() => {
    if (data.length) {
      setCurrentKey(data[0]?.key);
      setCurrentItem(data[0]);
    }
  }, [data]);

  return (
    <Modal
      wrapClassName='app-modal'
      width={'50%'}
      title="Поиск СНИЛС"
      onCancel={onClose}
      visible={isVisible || errorMessage}
      footer={
        data.length && !errorMessage ? (
          <Row justify={'space-between'}>
            <Typography.Text strong style={{fontSize: 18}}>Обновить сведения о СНИЛС?</Typography.Text>
            <div>
              <Button
                type="primary"
                disabled={!currentItem}
                onClick={currentItem ? () => onOk(currentItem.snils) : undefined}
                className={'save-btn'}
              >
                Да
              </Button>
              <Button type="primary" onClick={onClose} danger>
                Нет
              </Button>
            </div>
          </Row>
        ) : null
      }
    >
      {data.length && isVisible ? (
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: currentKey ? [currentKey] : [],
              onChange: (selectedKey) => typeof selectedKey[0] === 'number' && setCurrentKey(selectedKey[0]),
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  setCurrentKey(record.key);
                  setCurrentItem(record);
                },
              };
            }}
          />
        ) : errorMessage ? (
          <Row justify={'center'}>
            <Typography.Text strong style={{fontSize: 18}}>Запрос без параметров ФИО не поддерживается!</Typography.Text>
          </Row>
        ) : (
          <Row justify={'center'}>
            <Typography.Text strong style={{fontSize: 18}}>СНИЛС не найден</Typography.Text>
          </Row>
        )}
    </Modal>
  );
};

export default SnilsFound;
