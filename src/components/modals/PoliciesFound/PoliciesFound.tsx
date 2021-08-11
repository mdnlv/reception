import React, {useEffect} from 'react';
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
  return (
    <Modal
      wrapClassName='app-modal'
      onCancel={onClose}
      visible={isVisible}
      title={policy ? 'Найден полис' : undefined}
      footer={
        policy ? (
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
        ) : null
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
            <Col span={13}>ЕНП:</Col>
            <Col span={11}>{policy?.enp}</Col>
          </Row>
          <Row>
            <Col span={13}>действителен:</Col>
            {policy?.from && policy?.to ? (
              //@ts-ignore
              <Col span={11}>с {format(policy.from, 'd.MM.yyyy')} до {format(policy.to, 'd.MM.yyyy')}</Col>
            ) : null}
          </Row>
          {/*{policy.attachList && policy.attachList.length > 0 ? (*/}
          {/*  <>*/}
          {/*    <Row justify={'start'}>*/}
          {/*      <Typography.Text strong>Список прикреплений</Typography.Text>*/}
          {/*    </Row>*/}
          {/*    {policy?.attachList?.map((item, index) => (*/}
          {/*      <Row justify={'start'} key={index}>*/}
          {/*        <Typography.Text>({item.net.code}) {item.mo.shortName} {item.net.name}</Typography.Text>*/}
          {/*      </Row>*/}
          {/*    ))}*/}
          {/*  </>*/}
          {/*) : null}*/}
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
