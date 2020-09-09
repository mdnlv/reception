import React from 'react';
import Patient from '../../../../../../types/data/Patient';
import { Descriptions, List } from 'antd';
import './styles.scss';
import moment from 'moment';

type PaneProps = {
  patient?: Partial<Patient>;
  policyTitle?: string;
};

const PersonInfoPane: React.FC<PaneProps> = (props) => {
  function getMainPolicy() {
    return props.patient?.policy?.find((item) => item.policyTypeId === 1);
  }

  function getPolicyString() {
    const mainPolicy = getMainPolicy();
    if (mainPolicy !== undefined && mainPolicy.policyTypeId === 1) {
      return `${mainPolicy.serial} ${mainPolicy.number} выдан с ${moment(
        mainPolicy.begDate,
      ).format('DD.MM.YYYY')} до ${moment(mainPolicy?.endDate).format(
        'DD.MM.YYYY',
      )}`;
    } else {
      return '';
    }
  }

  function getTypeAddress(type: 0 | 1) {
    return (
      props.patient?.address?.find((item) => item.type === type)?.freeInput ||
      ''
    );
  }

  function getContactTypeName(type: number, contact: string) {
    switch (type) {
      case 1:
        return 'домашний ' + contact;
      case 2:
      case 3:
        return 'мобильный ' + contact;
      default:
        return '';
    }
  }

  function getContactPhones() {
    return (
      <List
        size={'small'}
        dataSource={props.patient?.contacts?.map((item) => ({
          contact: item.contact,
          type: item.contactTypeId,
        }))}
        renderItem={(item) => (
          <List.Item>{getContactTypeName(item.type, item.contact)}</List.Item>
        )}
      />
    );
  }

  return (
    <div className={'person-info-tabs__pane person-info-pane'}>
      <Descriptions column={1}>
        <Descriptions.Item className={'person-info-item'} label={'Фио'}>
          {props.patient?.fullName}
        </Descriptions.Item>
        <Descriptions.Item
          className={'person-info-item'}
          label={'Дата рождения'}>
          {moment(props.patient?.birthDate).format('DD.MM.YYYY')}
        </Descriptions.Item>
        <Descriptions.Item className={'person-info-item'} label={'Код'}>
          {props.patient?.code}
        </Descriptions.Item>
        <Descriptions.Item className={'person-info-item'} label={'Полис ОМС'}>
          {getPolicyString()}
        </Descriptions.Item>
        <Descriptions.Item
          className={'person-info-item'}
          label={'Адрес проживания'}>
          {getTypeAddress(0)}
        </Descriptions.Item>
        <Descriptions.Item
          className={'person-info-item'}
          label={'Адрес регистрации'}>
          {getTypeAddress(1)}
        </Descriptions.Item>
        <Descriptions.Item className={'person-info-item'} label={'Занятость'}>
          ''
        </Descriptions.Item>
        <Descriptions.Item className={'person-info-item'} label={'Телефоны'}>
          {getContactPhones()}
        </Descriptions.Item>
        <Descriptions.Item
          className={'person-info-item'}
          label={'Место рождения'}>
          {props.patient?.birthPlace}
        </Descriptions.Item>
        <Descriptions.Item className={'person-info-item'} label={'Примечания'}>
          {props.patient?.note}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default PersonInfoPane;
