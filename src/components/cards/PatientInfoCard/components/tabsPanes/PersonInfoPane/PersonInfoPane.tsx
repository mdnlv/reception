import React from 'react';
import { Descriptions, List } from 'antd/lib';
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

import './styles.scss';
import { PaneProps, PatientPolicyPane } from './types';
import {kladrSelector} from '../../../../../../reduxStore/slices/registrationCard/selectors';
import {getAddress} from "../../../../../../utils/getAddress";

const PersonInfoPane: React.FC<PaneProps> = ({ patient }) => {
  const { rbKladrRegistration, rbKladrStreetsRegistration } = useSelector(
    kladrSelector,
  );

  const getMainPolicy = () => {
    let policyOms: PatientPolicyPane;
    const omsFound = patient?.policy?.filter((item) => item.type !== 3);
    if (omsFound  && omsFound.length > 0) {
      policyOms = omsFound[omsFound.length - 1];
      return policyOms;
    }
  };

  const getPolicyString = () => {
    const mainPolicy = getMainPolicy();
    if (mainPolicy !== undefined) {
      return `${mainPolicy.serial} ${mainPolicy.number} выдан с ${format(mainPolicy.from, "d.MM.yyyy")} до ${format(mainPolicy.to, "d.MM.yyyy")}`;
    } else {
      return '';
    }
  };

  const getContactTypeName = (type: number, contact: string) => {
    switch (type) {
      case 1:
        return 'домашний ' + contact;
      case 2:
      case 3:
        return 'мобильный ' + contact;
      default:
        return '';
    }
  };

  const getContactPhones = () => {
    return (
      <List
        size={'small'}
        dataSource={patient?.contacts?.map((item) => ({
          contact: item.contact,
          type: item.contactTypeId,
        }))}
        renderItem={(item) => (
          <List.Item>{getContactTypeName(item.type, item.contact)}</List.Item>
        )}
      />
    );
  };

  return (
    <div className={'person-info-tabs__pane person-info-pane'}>
      <Descriptions column={1}>
        <Descriptions.Item label={'Фио'}>
          {patient?.fullName}
        </Descriptions.Item>
        <Descriptions.Item label={'Дата рождения'}>
          {patient?.birthDate}
        </Descriptions.Item>
        <Descriptions.Item label={'Код'}>
          {patient?.code}
        </Descriptions.Item>
        <Descriptions.Item label={'Полис ОМС'}>
          {getPolicyString()}
        </Descriptions.Item>
        <Descriptions.Item label={'Адрес проживания'}>
          {getAddress(patient, 0, rbKladrRegistration, rbKladrStreetsRegistration)}
        </Descriptions.Item>
        <Descriptions.Item label={'Адрес регистрации'}>
          {getAddress(patient, 1, rbKladrRegistration, rbKladrStreetsRegistration)}
        </Descriptions.Item>
        <Descriptions.Item label={'Занятость'}>
          {patient?.work ? patient?.work[0].post : ''}
        </Descriptions.Item>
        <Descriptions.Item label={'Телефоны'}>
          {getContactPhones()}
        </Descriptions.Item>
        <Descriptions.Item label={'Место рождения'}>
          {patient?.birthPlace}
        </Descriptions.Item>
        <Descriptions.Item label={'Примечания'}>
          {patient?.notes}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default PersonInfoPane;
