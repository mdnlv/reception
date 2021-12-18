import React, {useState, useEffect} from 'react';
import {Modal, Row, Button, Typography, Table, Checkbox} from "antd";
import {useSelector} from "react-redux";
import {format} from "date-fns";
import {useFormikContext} from "formik";

import {ModalProps, SnilsType} from "./types";
import {DocFound as DocFoundType} from "../../../interfaces/responses/patients/patientDocSearch";
import {detailedDocumentTypesSelector} from "../../../reduxStore/slices/rb/selectors";
import {WizardStateType} from "../../forms/wizards/RegCardWizard/types";
import {getRandomNumberId} from "../../../utils/getRandomNumberId";
import './styles.scss';

const DocFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  data,
  onOk,
  errorMessage,
  snils
}) => {
  const formProps = useFormikContext<WizardStateType>();
  const documentTypesList = useSelector(detailedDocumentTypesSelector);
  const firstName = formProps.values.personal.firstName;
  const lastName = formProps.values.personal.lastName;
  const patrName = formProps.values.personal.patrName;
  const birthDate = formProps.values.personal.birthDate;
  const [snilsData, setSnilsData] = useState([] as SnilsType[]);
  const [currentDocKey, setCurrentDocKey] = useState(null as number | null);
  const [currentDocItem, setCurrentDocItem] = useState(null as DocFoundType | null);
  const [currentSnilsKey, setCurrentSnilsKey] = useState(null as number | null);
  const [currentSnilsItem, setCurrentSnilsItem] = useState(null as SnilsType | null);
  const [snilsChoice, setSnilsChoice] = useState(true);
  const [docChoice, setDocChoice] = useState(true);

  const snilsColumns = [
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
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      key: 'birthDate',
      render: (text: string) => text ? format(new Date(text), 'dd.MM.yyyy') : '',
    },
    {
      title: 'СНИЛС',
      dataIndex: 'snils',
      key: 'snils',
    }
  ];

  const docColumns = [
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
  //   console.log('snilsData', snilsData);
  // }, [snilsData]);

  useEffect(() => {
    if (snils.length) {
      const res = snils.map((item) => ({
        key: getRandomNumberId(8),
        lastName,
        firstName,
        patrName,
        birthDate: birthDate as string,
        snils: item,
      }));
      setSnilsData(res);
    }
  }, [snils]);

  useEffect(() => {
    if (data.length === 1) {
      setCurrentDocKey(data[0]?.key as number);
      setCurrentDocItem(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (snilsData.length === 1) {
      setCurrentSnilsKey(snilsData[0]?.key as number);
      setCurrentSnilsItem(snilsData[0]);
    }
  }, [snilsData]);

  useEffect(() => {
    const res = data.find((item) => item.key === currentDocKey);
    setCurrentDocItem(res || null);
  }, [currentDocKey]);

  useEffect(() => {
    const res = snilsData.find((item) => item.key === currentSnilsKey);
    setCurrentSnilsItem(res || null);
  }, [currentSnilsKey]);

  const onChangeSnilsChoice = (e: any) => setSnilsChoice(e.target.checked);
  const onChangeDocChoice = (e: any) => setDocChoice(e.target.checked);

  const onSubmitModal = () => {
    onOk({
      doc: docChoice ? currentDocItem : null,
      snils: snilsChoice && currentSnilsItem?.snils ? currentSnilsItem?.snils : ''
    });
  };

  const onCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      wrapClassName='app-modal'
      width={'66%'}
      title="Поиск документов"
      onCancel={onClose}
      visible={isVisible || errorMessage}
      footer={
        data.length && !errorMessage ? (
          <Row justify={'space-between'}>
            <Typography.Text strong style={{fontSize: 18}}>Обновить сведения о документе?</Typography.Text>
            <div>
              <Button
                type="primary"
                disabled={(!currentDocItem || !docChoice) && (!currentSnilsItem || !snilsChoice)}
                onClick={currentDocItem || currentSnilsItem ? onSubmitModal : undefined}
                className={'save-btn'}
              >
                Да
              </Button>
              <Button type="primary" onClick={onCloseModal} danger>
                Нет
              </Button>
            </div>
          </Row>
        ) : null
      }
    >
      {(data.length || snils.length) && isVisible ? (
          <div className="doc-found__modal">
            <Checkbox checked={snilsChoice} onChange={onChangeSnilsChoice}>
              <Typography.Text style={{fontSize: 15}}>СНИЛС</Typography.Text>
            </Checkbox>
            <div className={!snilsChoice ? 'doc-found__table--disabled' : ''}>
              <Table
                dataSource={snilsData}
                columns={snilsColumns}
                pagination={false}
                rowSelection={{
                  type: 'radio',
                  selectedRowKeys: currentSnilsKey ? [currentSnilsKey] : [],
                  onChange: (selectedKey) => typeof selectedKey[0] === 'number' && setCurrentSnilsKey(selectedKey[0]),
                  getCheckboxProps: () => ({
                    disabled: !snilsChoice
                  })
                }}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setCurrentSnilsKey(record.key as number);
                      setCurrentSnilsItem(record);
                    },
                  };
                }}
              />
            </div>
            <br/>
            <br/>
            <Checkbox checked={docChoice} onChange={onChangeDocChoice}>
              <Typography.Text style={{fontSize: 15}}>Документ</Typography.Text>
            </Checkbox>
            <div className={!docChoice ? 'doc-found__table--disabled' : ''}>
              <Table
                dataSource={data}
                columns={docColumns}
                pagination={false}
                rowSelection={{
                  type: 'radio',
                  selectedRowKeys: currentDocKey ? [currentDocKey] : [],
                  onChange: (selectedKey) => typeof selectedKey[0] === 'number' && setCurrentDocKey(selectedKey[0]),
                  getCheckboxProps: () => ({
                    disabled: !docChoice
                  })
                }}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      setCurrentDocKey(record.key as number);
                      setCurrentDocItem(record);
                    },
                  };
                }}
              />
            </div>
          </div>
        ) : errorMessage ? (
          <Row justify={'center'}>
            <Typography.Text strong style={{fontSize: 18}}>
              Запрос без фамилии, имени и даты рождения не поддерживается!
            </Typography.Text>
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
