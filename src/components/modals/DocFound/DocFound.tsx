import React, {useState, useEffect} from 'react';
import {Modal, Row, Button, Typography, Table} from "antd";
import {useSelector} from "react-redux";
import {format} from "date-fns";

import {ModalProps} from "./types";
import {DocFound as DocFoundType} from "../../../interfaces/responses/patients/patientDocSearch";
import {detailedDocumentTypesSelector} from "../../../reduxStore/slices/rb/selectors";

const DocFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  data,
  onOk,
  errorMessage
}) => {
  const documentTypesList = useSelector(detailedDocumentTypesSelector);
  const [currentKey, setCurrentKey] = useState(null as number | null);
  const [currentItem, setCurrentItem] = useState(null as DocFoundType | null);

  const columns = [
    {
      title: 'Тип документа',
      dataIndex: 'documentType_id',
      key: 'documentType_id',
      render: (text: number) => documentTypesList.find((item) => item.id === text)?.name,
    },
    {
      title: 'Серия',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Дата выдачи',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => text ? format(new Date(text), 'dd.MM.yyyy') : '',
    },
    {
      title: 'Кем выдан',
      dataIndex: 'origin',
      key: 'origin',
    },
  ];

  // useEffect(() => {
  //   console.log('documentTypesList', documentTypesList);
  // }, [documentTypesList]);

  useEffect(() => {
    if (data.length) {
      setCurrentKey(data[0]?.key as number);
      setCurrentItem(data[0]);
    }
  }, [data]);

  useEffect(() => {
    const res = data.find((item) => item.key === currentKey);
    setCurrentItem(res || null);
  }, [currentKey]);

  return (
    <Modal
      wrapClassName='app-modal'
      width={'50%'}
      title="Поиск документа"
      onCancel={onClose}
      visible={isVisible || errorMessage}
      footer={
        data.length && !errorMessage ? (
          <Row justify={'space-between'}>
            <Typography.Text strong style={{fontSize: 18}}>Обновить сведения о документе?</Typography.Text>
            <div>
              <Button
                type="primary"
                disabled={!currentItem}
                onClick={currentItem ? () => onOk(currentItem) : undefined}
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
                  setCurrentKey(record.key as number);
                  setCurrentItem(record);
                },
              };
            }}
          />
        ) : errorMessage ? (
          <Row justify={'center'}>
            <Typography.Text strong style={{fontSize: 18}}>Запрос без фамилии пациента не поддерживается!</Typography.Text>
          </Row>
        ) : (
          <Row justify={'center'}>
            <Typography.Text strong style={{fontSize: 18}}>Документ не найден</Typography.Text>
          </Row>
        )}
    </Modal>
  );
};

export default DocFound;
