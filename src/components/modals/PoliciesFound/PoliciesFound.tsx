import React, {useEffect} from 'react';
import {Modal, Row, Button, Typography, Col} from "antd";
import {format, parseISO} from "date-fns";
import {useSelector} from "react-redux";

import {ModalProps} from "./types";
import {detailedOrgStructureSelector} from "../../../reduxStore/slices/rb/selectors";

const PoliciesFound: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  policy,
  onOk,
  cmoType
}) => {
  const orgStructure = useSelector(detailedOrgStructureSelector);

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
          {policy.attach ? (
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
          {policy.attachList && policy.attachList.length > 0 ? (
            <>
              <Row justify={'start'}>
                <Typography.Text strong>Список прикреплений:</Typography.Text>
              </Row>
              {policy?.attachList?.map((item, index) => (
                <Row justify={'start'} key={index}>
                  <Typography.Text>
                    {orgStructure.find(
                      (elem) => elem.attachCode === item
                    )?.name || `Неизвестная мед.организация с кодом: ${item}`}
                  </Typography.Text>
                </Row>
              ))}
            </>
          ) : null}
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
