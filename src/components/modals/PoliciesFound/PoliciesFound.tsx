import React, {useEffect, useState} from 'react';
import {Modal, Row, Button, Typography, Col, Divider, Table} from "antd";
import {format, parseISO, isPast} from "date-fns";
import {useSelector} from "react-redux";

import {ModalProps, TableItem} from "./types";
import {detailedOrgStructureSelector, detailedPolicyKindsSelector} from "../../../reduxStore/slices/rb/selectors";

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
  const policyKindsList = useSelector(detailedPolicyKindsSelector);
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
  //   console.log('policyFoundValues', policyFoundValues);
  // }, [policyFoundValues]);

  useEffect(() => {
    if (policy) {
      setTableData([
        {
          key: 'timeType',
          field: 'Вид:',
          newValue: policyKindsList.find((item) => item.id === parseInt(policy.timeType || ''))?.name || ''
        },
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
  }, [policy]);

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
                  <Typography.Text strong style={{fontSize: 18}}>Показать таблицу с выбором данных?</Typography.Text>
                </Row>
              )
            }
            <Divider/>
            <Row justify={'end'}>
              <Button
                type="primary"
                onClick={!showTable ? () => setShowTable(true) : onSubmitModal}
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
          {!showTable && tableData.length && (
              <>
                <Row>
                  <Col span={13}>Вид:</Col>
                  <Col span={11}>{tableData[0].newValue}</Col>
                </Row>
                <Row>
                  <Col span={13}>СМО:</Col>
                  <Col span={11}>{tableData[3].newValue}</Col>
                </Row>
                <Row>
                  <Col span={13}>серия:</Col>
                  <Col span={11}>{tableData[4].newValue}</Col>
                </Row>
                <Row>
                  <Col span={13}>номер:</Col>
                  <Col span={11}>{tableData[5].newValue}</Col>
                </Row>
                <Row>
                  <Col span={13}>ЕНП:</Col>
                  <Col span={11}>{tableData[6].newValue}</Col>
                </Row>
                <Row>
                  <Col span={13}>действителен:</Col>
                  <Col span={11}>
                    {policy.from && `с ${tableData[2].newValue} до ${tableData[1].newValue}`}
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
