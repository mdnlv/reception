import React, {useEffect, useState, useCallback} from 'react';
import {Descriptions, List} from 'antd/lib';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";

import './styles.scss';
import {PaneProps} from "./types";
import {fetchKladr, fetchKladrStreets} from "../../../../../../reduxStore/slices/registrationCard/registrationCardSlice";
import {kladrSelector} from "../../../../../../reduxStore/slices/registrationCard/selectors";
import {KladrDocType} from "../../../../../../reduxStore/slices/registrationCard/types";

const PersonInfoPane: React.FC<PaneProps> = ({
  patient,
  policyTitle
}) => {
  const dispatch = useDispatch();
  const {rbKladrDocumented, rbKladrStreetsDocumented} = useSelector(kladrSelector);
  // const [cityId, setCityId] = useState('');
  // console.log('rbKladrStreetsDocumented', rbKladrStreetsDocumented);

  useEffect(() => {
    dispatch(fetchKladr({}));
  }, [patient]);

  // useEffect(() => {
  //   dispatch(fetchKladrStreets({id: cityId, type: "documented"}));
  // }, [cityId]);
  // console.log('patient', patient)

  const getMainPolicy = () => {
    return patient?.policy?.find((item) => item.id === 1);
  }

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
  }

  const getTypeAddress = (type: 0 | 1) => {
    return (
      patient?.address?.find((item) => item.type === type)?.freeInput ||
      getAddress(type)
    );
  }

  // const fetchKladrStreetsItems = useCallback((id: string, type: KladrDocType) => {
  //   dispatch(fetchKladrStreets({ id, type }));
  // }, [cityId]);

  const getAddress = (type: 0 | 1) => {
    const number = patient?.address?.find((item) => item.type === type)?.address.house;
    const corpus = patient?.address?.find((item) => item.type === type)?.address.corpus;
    const litera = patient?.address?.find((item) => item.type === type)?.address.litera;
    const flat = patient?.address?.find((item) => item.type === type)?.address.flat;
    let address = '';

    const kladrCode = patient?.address?.find((item) => item.type === type)?.address.KLADRCode;
    // setCityId(kladrCode);
    // fetchKladrStreetsItems(kladrCode, "documented");
    const kladrStreetCode = patient?.address?.find((item) => item.type === type)?.address.KLADRStreetCode;
    // console.log('kladrCode', kladrCode);
    // dispatch(fetchKladrStreets({id: kladrCode, type: "documented"}));
    const kladrCity = rbKladrDocumented.find((item) => item.id === kladrCode);
    const kladrStreet = rbKladrStreetsDocumented.find((item) => item.id === kladrStreetCode);
    const city = kladrCity?.name;
    const street = kladrStreet?.name;
    const socr = kladrStreet?.socr;

    // console.log('kladrItem', kladrItem)
    if (city) {
      address = `г. ${city}`
      if (street && socr) {
        address = address.concat(`, ${socr} ${street}`);
        if (number) {
          address = address.concat(`, д.${number}`);
          if (corpus) {
            address = address.concat(`, к.${corpus}`);
            if (litera) {
              address = address.concat(litera);
            }
          }
          if (flat) {
            address = address.concat(`, кв.${flat}`);
          }
        }
      }
    }

    return address
  }

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
  }

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
  }

  return (
    <div className={'person-info-tabs__pane person-info-pane'}>
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
          {patient?.birthPlace}
        </Descriptions.Item>
        <Descriptions.Item className={'person-info-item'} label={'Примечания'}>
          {patient?.note}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default PersonInfoPane;
