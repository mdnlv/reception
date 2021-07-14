import React, {useEffect} from 'react';
import { Descriptions, List, Table, Radio, Row, Col, Dropdown, Menu } from 'antd/lib';
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
      render: () => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div>jhgj</div></Dropdown>)
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 100,
      render: () => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div>jhgj</div></Dropdown>)
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: () => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div>jhgj</div></Dropdown>)
    },
  ];
 
  const menu = (
    <Menu>
      <Menu.Item key="1">Удалить запись ( видно только для занятых)</Menu.Item>
      <Menu.Item key="2">Перенести запись ( видно только для занятых)</Menu.Item>
      <Menu.Item key="3"> Перейти в расписание ( видно только для занятых) - по нажатию на эту запись необходимо переводить фокус в запись в расписании</Menu.Item>
      <Menu.Item key="4"> Изменить жалобы/ примечания (видно только для занятых) - дать возможность регистратору изменить поля в записи</Menu.Item>
      <Menu.Item key="5">Напечатать направление ( видно только для занятых) - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
      <Menu.Item key="6">   Печать предварительной записи ( видно только для занятых) - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
      <Menu.Item key="7">Свойства записи ( видно только для занятых) - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
    </Menu>
  );  
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

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
      return `
        ${mainPolicy.serial} ${mainPolicy.number} выдан ${mainPolicy.from ? `с ${format(mainPolicy.from, "d.MM.yyyy")}` : ''} ${mainPolicy.to ? `до ${format(mainPolicy.to, "d.MM.yyyy")}` : ''}
      `;
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
        <Descriptions.Item>
        <Radio.Group name='Группировать:' style={{marginLeft: 5}} defaultValue={'pre'}>
          <Radio value={'pre'}>Предварительная запись</Radio>
          <Radio value={'post'}>Выполнение записи</Radio>
        </Radio.Group>
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{margin: 0, padding: 0, border: 0}}>
          
            <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 240 }} style={{marginTop: -16}}  />
          
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default PersonInfoPane;
