import React, {useEffect} from 'react';
import { Descriptions, List } from 'antd/lib';
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

import './styles.scss';
import { PaneProps, PatientPolicyPane } from './types';
import {kladrSelector} from '../../../../../../reduxStore/slices/registrationCard/selectors';
import {
  detailedDocumentTypesSelector,
  detailedAttachTypesSelector,
  detailedOrganisationsSelector,
  detailedOrgStructureSelector,
} from "../../../../../../reduxStore/slices/rb/selectors";
import {getAddress} from "../../../../../../utils/getAddress";
import PatientAttach from "../../../../../../types/data/PatientAttach";

const PersonInfoPane: React.FC<PaneProps> = ({ patient }) => {
  const { rbKladrRegistration, rbKladrStreetsRegistration } = useSelector(
    kladrSelector,
  );
  const documentTypesList = useSelector(detailedDocumentTypesSelector);
  const attachTypes = useSelector(detailedAttachTypesSelector);
  const orgs = useSelector(detailedOrganisationsSelector);
  const orgStructure = useSelector(detailedOrgStructureSelector);

  const getDocumentType = (type: string) => {
    const typeData = parseInt(type);
    return documentTypesList.find((item) => item.id === typeData)?.name;
  }

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

  const getAttaches = (data: PatientAttach[]) => {
    const result = data.map((item, index) => (
      `${getAttachData(item.type, attachTypes)} ${getAttachData(item.lpu, orgs)} ${getAttachData(item.unit, orgStructure)}${index + 1 !== data.length ? ', ' : ''}`
    ));
    return result.join('');
  };

  const getAttachData = (id: number, data: {id: number; name: string}[]) => {
    return data.find((item) => item.id === id)?.name;
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
        <Descriptions.Item label={'Прикрепление'}>
          {getAttaches(patient?.attachments || [])}
        </Descriptions.Item>
        <Descriptions.Item label={'Полис ОМС'}>
          {getPolicyString()}
        </Descriptions.Item>
        <Descriptions.Item label={'Документ'}>
          {getDocumentType(patient?.client_document_info?.passportType || '1')} {patient?.client_document_info?.serial} {patient?.client_document_info?.number}
        </Descriptions.Item>
        <Descriptions.Item label={'Адрес проживания'}>
          {getAddress(patient, 0, rbKladrRegistration, rbKladrStreetsRegistration)}
        </Descriptions.Item>
        <Descriptions.Item label={'Адрес регистрации'}>
          {getAddress(patient, 1, rbKladrRegistration, rbKladrStreetsRegistration)}
        </Descriptions.Item>
        <Descriptions.Item label={'Занятость'}>
          {patient?.work && patient?.work[0] ? patient?.work[0].post : ''}
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
