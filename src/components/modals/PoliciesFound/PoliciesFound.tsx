import React from 'react';
import {Modal, Row, Button, Typography, Col} from "antd";
import {format} from "date-fns";

import {ModalProps} from "./types";

const PoliciesFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  policy,
  onOk
}) => {
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
            <Col span={11}>{policy?.cmo || ''}</Col>
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
              <Col span={11}>с {format(policy.from, 'd.MM.yyyy')} до {format(policy.to, 'd.MM.yyyy')}</Col>
            ) : null}
          </Row>
        </>
        ) : null}
    </Modal>
  );
};

export default PoliciesFound;
