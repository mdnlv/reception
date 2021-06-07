import React, {useState, useEffect} from 'react';
import {Modal, Row, Button, Typography, Col} from "antd";
import {format} from "date-fns";

import {ModalProps} from "./types";

const PoliciesFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  policy,
  onOk,
  cmoType
}) => {
  const [emptyPolicy, setEmptyPolicy] = useState(false);

  useEffect(() => {
    console.log('policy', policy);
  }, [policy]);

  return (
    <Modal
      wrapClassName='app-modal'
      onCancel={onClose}
      visible={isVisible}
      title='Найден полис'
      footer={
        <>
          <Row justify={'start'}>
            <Typography.Text strong style={{fontSize: 18}}>Обновить сведения о полисе?</Typography.Text>
          </Row>
          <Row justify={'end'}>
            <Button type="primary" onClick={onOk} className={'save-btn'}>
              Да
            </Button>
            <Button type="primary" onClick={onClose} danger>
              Нет
            </Button>
          </Row>
        </>
      }
    >
      {policy && isVisible ? (
        <>
          <Row>
            <Col span={13}>СМО:</Col>
            <Col span={11}>{cmoType.find((item) => item.id === parseInt(policy?.cmo))?.name || ''}</Col>
          </Row>
          <Row>
            <Col span={13}>серия:</Col>
            <Col span={11}>{policy?.serial}</Col>
          </Row>
          <Row>
            <Col span={13}>номер:</Col>
            <Col span={11}>{policy?.number}</Col>
          </Row>
          <Row>
            <Col span={13}>действителен:</Col>
            {policy?.from && policy?.to ? (
              //@ts-ignore
              <Col span={11}>с {format(policy.from, 'd.MM.yyyy')} до {format(policy.to, 'd.MM.yyyy')}</Col>
            ) : null}
          </Row>
          {policy.attachList && policy.attachList.length > 0 ? (
            <>
              <Row justify={'start'}>
                <Typography.Text strong>Список прикреплений</Typography.Text>
              </Row>
              {policy?.attachList?.map((item, index) => (
                <Row justify={'start'} key={index}>
                  <Typography.Text>({item.net.code}) {item.mo.shortName} {item.net.name}</Typography.Text>
                </Row>
              ))}
            </>
          ) : null}
        </>
        ) : null}
    </Modal>
  );
};

export default PoliciesFound;
