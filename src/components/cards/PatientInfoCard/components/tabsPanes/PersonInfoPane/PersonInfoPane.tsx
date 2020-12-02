import React from 'react';
import { Descriptions, List, Spin } from 'antd/lib';
import moment from 'moment';
import { useSelector } from 'react-redux';

import './styles.scss';
import { PaneProps } from './types';
import {
  kladrLoadingsSelector,
  kladrSelector,
} from '../../../../../../reduxStore/slices/registrationCard/selectors';
import {getAddress} from "../../../../../../utils/getAddress";

const PersonInfoPane: React.FC<PaneProps> = ({ patient }) => {
  const { rbKladrDocumented, rbKladrStreetsDocumented } = useSelector(
    kladrSelector,
  );
  const {
    isLoadingKladrStreetsDocumented,
    isLoadingKladrStreetsRegistration,
  } = useSelector(kladrLoadingsSelector);

  const getMainPolicy = () => {
    return patient?.policy?.find((item) => item.id === 1);
  };

  const getPolicyString = () => {
    const mainPolicy = getMainPolicy();
    if (mainPolicy !== undefined && mainPolicy.id === 1) {
      return `${mainPolicy.serial} ${mainPolicy.number} выдан с ${moment(
        mainPolicy.begDate,
      ).format('DD.MM.YYYY')} до ${moment(mainPolicy?.endDate).format(
        'DD.MM.YYYY',
      )}`;
    } else {
      return '';
    }
  };

  const getWork = () => {
    const workItem = patient?.work?.find((item) => item.id === 1);
    if (workItem) {
      return workItem.freeInput;
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
      {isLoadingKladrStreetsRegistration || isLoadingKladrStreetsDocumented ? (
        <div className={'person-info-loading__wrapper'}>
          <Spin />
        </div>
      ) : (
        <Descriptions column={1}>
          <Descriptions.Item className={'person-info-item'} label={'Фио'}>
            {patient?.fullName}
          </Descriptions.Item>
          <Descriptions.Item
            className={'person-info-item'}
            label={'Дата рождения'}>
            {moment(patient?.birthDate).format('DD.MM.YYYY')}
          </Descriptions.Item>
          <Descriptions.Item className={'person-info-item'} label={'Код'}>
            {patient?.code}
          </Descriptions.Item>
          <Descriptions.Item className={'person-info-item'} label={'Полис ОМС'}>
            {getPolicyString()}
          </Descriptions.Item>
          <Descriptions.Item
            className={'person-info-item'}
            label={'Адрес проживания'}>
            {getAddress(patient, 0, rbKladrDocumented, rbKladrStreetsDocumented)}
          </Descriptions.Item>
          <Descriptions.Item
            className={'person-info-item'}
            label={'Адрес регистрации'}>
            {getAddress(patient, 1, rbKladrDocumented, rbKladrStreetsDocumented)}
          </Descriptions.Item>
          <Descriptions.Item className={'person-info-item'} label={'Занятость'}>
            {getWork()}
          </Descriptions.Item>
          <Descriptions.Item className={'person-info-item'} label={'Телефоны'}>
            {getContactPhones()}
          </Descriptions.Item>
          <Descriptions.Item
            className={'person-info-item'}
            label={'Место рождения'}>
            {patient?.birthPlace}
          </Descriptions.Item>
          <Descriptions.Item
            className={'person-info-item'}
            label={'Примечания'}>
            {patient?.notes}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default PersonInfoPane;
