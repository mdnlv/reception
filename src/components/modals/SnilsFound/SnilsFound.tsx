import React, {useState, useEffect} from 'react';
import {Modal, Row, Button, Typography, Table} from "antd";

import {ModalProps} from "./types";
import {SnilsFound} from "../../forms/wizards/RegCardWizard/pages/PassportGeneral/types";

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
    title: 'СНИЛС',
    dataIndex: 'snils',
    key: 'snils',
  },
];

const SnilsFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  data,
  onOk
}) => {
  const [currentKey, setCurrentKey] = useState(data[0].key);
  const [currentItem, setCurrentItem] = useState(data[0] as SnilsFound);

  return (
    <Modal
      wrapClassName='app-modal'
      onCancel={onClose}
      visible={isVisible}
      footer={
        data.length ? (
          <Row justify={'end'}>
            <Button type="primary" onClick={() => onOk(currentItem.snils)} className={'save-btn'}>
              Да
            </Button>
            <Button type="primary" onClick={onClose} danger>
              Нет
            </Button>
          </Row>
        ) : null
      }
    >
      data.length && isVisible ? (
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [currentKey],
            onChange: (selectedKey) => typeof selectedKey[0] === 'number' && setCurrentKey(selectedKey[0]),
          }}
          onRow={(record) => ({onClick: () => setCurrentItem(record)})}
        />;
        ) : (
        <Row justify={'center'}>
          <Typography.Text strong style={{fontSize: 18}}>СНИЛС не найден</Typography.Text>
        </Row>
      )
    </Modal>
  );
};

export default SnilsFound;
