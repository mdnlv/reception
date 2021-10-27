import React, {useEffect, useState} from 'react';
import {Modal, Row, Button, Typography, Col, Divider, Table} from "antd";
import {format, parseISO, isPast} from "date-fns";
import {useSelector} from "react-redux";

import {ModalProps, TableItem} from "./types";
import {detailedOrgStructureSelector} from "../../../reduxStore/slices/rb/selectors";

const PoliciesFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  policy,
  onOk,
  cmoType,
  policyFoundValues,
  setPolicyFoundValues
}) => {
  const orgStructure = useSelector(detailedOrgStructureSelector);
  const [isOutside, setOutside] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([] as TableItem[]);

  const columns = [
    {
      title: 'Поле',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Новое значение',
      dataIndex: 'newValue',
      key: 'newValue',
    }
  ];

  // useEffect(() => {
  //   console.log('policy', policy);
  // }, [policy]);

  useEffect(() => {
    policy?.attachList?.map((item, index) => {
      const res = orgStructure.find((elem) => elem.attachCode === item);
      !res ? setOutside(true) : setOutside(false);
    });
  }, [policy]);

  useEffect(() => {
    if (policy && (isOutside || isPast(new Date(policy?.to)))) {
      setTableData([
        {
          key: 'to',
          field: 'Дата окончания:',
          newValue: policy.to ? format(policy.to instanceof Date ? policy.to : parseISO(policy.to), 'd.MM.yyyy') : ''
        },
        {
          key: 'from',
          field: 'Дата начала:',
          newValue: policy.from ? format(policy.from instanceof Date ? policy.from : parseISO(policy.from), 'd.MM.yyyy') : ''
        },
        {
          key: 'cmo',
          field: 'СМО:',
          newValue: cmoType.find((item) => item.id === parseInt(policy?.cmo))?.name || ''
        },
        {
          key: 'serial',
          field: 'Серия:',
          newValue: policy.serial
        },
        {
          key: 'number',
          field: 'Номер:',
          newValue: policy.number
        },
        {
          key: 'enp',
          field: 'ЕНП:',
          newValue: policy.enp || ''
        },
        {
          key: 'cancelReason',
          field: 'Причина аннулирования:',
          newValue: policy.cancelReason
        },
        {
          key: 'lpu',
          field: 'ЛПУ прикрепл.:',
          newValue: orgStructure.find(
            (item) => item.id === parseInt(policy.attach || '')
          )?.name || ''
        },
        {
          key: 'lpuDate',
          field: 'Дата прикрепл. к ЛПУ:',
          newValue: ''
        },
        {
          key: 'doctorLPU',
          field: 'Доктор ЛПУ амб:',
          newValue: ''
        }
      ]);
    }
  }, [policy, isOutside]);

  const onSubmitModal = () => {
    setShowTable(false);
    onOk && onOk();
  }

  const onCloseModal = () => {
    onClose && onClose();
    setShowTable(false);
  }

  return (
    <Modal
      wrapClassName='app-modal'
      width={showTable ? '50%' : undefined}
      onCancel={onCloseModal}
      visible={isVisible}
      title={policy ? !showTable ? 'Найден полис' : 'Укажите данные для обновления' : undefined}
      footer={
        policy ? (
          <>
            {!showTable && (
                <Row justify={'start'}>
                  <Typography.Text strong style={{fontSize: 18}}>
                    {isOutside || isPast(new Date(policy?.to)) ? 'Показать таблицу с выбором данных?' : 'Обновить сведения о полисе?'}
                  </Typography.Text>
                </Row>
              )
            }
            <Divider/>
            <Row justify={'end'}>
              <Button
                type="primary"
                onClick={
                  (isOutside || isPast(new Date(policy?.to)))
                    ? !showTable ? () => setShowTable(true) : onSubmitModal
                    : onSubmitModal
                }
                className={'save-btn'}
              >
                ОК
              </Button>
              <Button
                type="primary"
                onClick={onCloseModal}
                danger
              >
                Отмена
              </Button>
            </Row>
          </>
        ) : null
      }
    >
      {policy && isVisible ? (
        <>
          {!showTable && (
              <>
                <Row>
                  <Col span={13}>СМО:</Col>
                  <Col span={11}>{cmoType.find((item) => item.id === parseInt(policy?.cmo))?.name || ''}</Col>
                </Row>
                <Row>
                  <Col span={13}>серия:</Col>
                  <Col span={11}>{!policy?.enp ? policy?.serial : 'ЕП'}</Col>
                </Row>
                <Row>
                  <Col span={13}>номер:</Col>
                  <Col span={11}>{policy?.number}</Col>
                </Row>
                <Row>
                  <Col span={13}>ЕНП:</Col>
                  <Col span={11}>{policy?.enp}</Col>
                </Row>
                <Row>
                  <Col span={13}>действителен:</Col>
                  <Col span={11}>
                    {policy.from && `с ${
                      //@ts-ignore
                      format(policy.from instanceof Date ? policy.from : parseISO(policy.from), 'd.MM.yyyy')} `
                    }
                    {
                      //@ts-ignore
                      policy.to && `до ${
                        format(policy.to instanceof Date ? policy.to : parseISO(policy.to), 'd.MM.yyyy')
                      }`
                    }
                  </Col>
                </Row>
              </>
            )
          }
          {isPast(new Date(policy?.to)) && !showTable && (
            <Row>
              <Typography.Text strong>По данным ТФОМС полис не действителен.</Typography.Text>
            </Row>
          )}
          {policy.attach  && !showTable ? (
            <>
              <Row justify={'start'}>
                <Typography.Text strong>Найдено прикрепление:</Typography.Text>
              </Row>
              <Row justify={'start'}>
                <Typography.Text>
                  {orgStructure.find(
                    (item) => item.id === parseInt(policy.attach || '')
                  )?.name}
                </Typography.Text>
              </Row>
            </>
          ) : null}
          {policy.attachList && policy.attachList.length > 0 && !showTable && (
            <>
              <Row justify={'start'}>
                <Typography.Text strong>Список прикреплений:</Typography.Text>
              </Row>
              {policy?.attachList?.map((item, index) => (
                <Row justify={'start'} key={index}>
                  <Typography.Text>
                    {orgStructure.find(
                      (elem) => elem.attachCode === item
                    )?.name || `Прикреплен к сторонней МО: ${item}`}
                  </Typography.Text>
                </Row>
              ))}
            </>
          )}
          {isPast(new Date(policy?.to)) && !showTable && (
            <>
              <Row justify={'start'}>
                <Typography.Text strong>Список прикреплений:</Typography.Text>
              </Row>
              <Typography.Text>нет прикреплений</Typography.Text>
            </>
          )}
          {
            showTable && (
              <Table
                dataSource={tableData}
                columns={columns}
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys: policyFoundValues,
                  onChange: (selectedRowKeys) => setPolicyFoundValues(selectedRowKeys as string[])
                }}
                pagination={false}
                bordered
              />
            )
          }
        </>
        ) : (
        <Row justify={'center'}>
          <Typography.Text strong style={{fontSize: 18}}>Полис не найден</Typography.Text>
        </Row>
      )}
    </Modal>
  );
};

export default PoliciesFound;
