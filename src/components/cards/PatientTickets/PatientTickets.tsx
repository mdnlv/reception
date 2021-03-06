import React, { useEffect, useState } from 'react';
import {Table,Dropdown, Menu, Checkbox, Descriptions, Radio, Spin } from 'antd/lib';
import moment from 'moment';

import './styles.scss';
import { PatientTicketsProps } from './types';
import { clientAppointment, setStoreActionData } from "../../../reduxStore/slices/scheduleSlice/scheduleSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore/store';

const PatientTickets: React.FC<PatientTicketsProps> = ({ client_id, type, setType }) => {
  const [actionData, setActionData] = useState<any>({});
  const dispatch = useDispatch();
  const {tickets, ticketsLoading} = useSelector((state:RootState) => state.schedule);
  const data:any = [];

  useEffect(()=>{
    dispatch(clientAppointment({
      client_id: client_id,
      is_past_records: type == 'pre' ? true: undefined
    }))
  },[client_id, type]);

  tickets.map((item: any, i: number) => {
    data.push({
      key: i,
      date: item.date + ' ' + item.time,
      person: item.person,
      office: item.office,
      actionData: item.actionData,
      set_person: item.set_person,
      note: item.note,
      visit: item.visit
    });
  })

  const showModal = (a: any) => {
    dispatch(setStoreActionData({
      date: actionData.date,
      time: actionData.time,
      client: actionData.client,
      person: actionData.person,
      speciality:  actionData.speciality,
      type: a,
      data: {
        action_id: actionData.data.action_id,
        idx:  actionData.data.idx,
        client_id: actionData.data.client_id,
        person_id:  actionData.data.person_id,
        user_id: 614,
        index: actionData.data.index,
        old_action_id: 0,
        old_idx: 0,
        type: a
      },
      org: actionData.org,
      orgs: actionData.orgs
    }))
  }

  const columns: any = [
    {
      title: 'Выполнено',
      dataIndex: 'visit',
      width: 110,
      render: (value: any) => (
        <Dropdown overlay={menu}  trigger={['contextMenu']}>
          <div style={{padding:10}}>
            <Checkbox checked={value}/>
          </div>
        </Dropdown>
      )
    },
    {
      title: 'Дата и время',
      dataIndex: 'date',
      width: 118,
      render: (value: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{value}</div></Dropdown>),
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => {
        if(moment(a.date + ' ' + a.time, "DD.MM.YYY h:mm").unix() > moment(b.date + ' ' + b.time, "DD.MM.YYY h:mm").unix())
          return 1
        else return -1
      }
    },
    {
      title: 'Каб',
      dataIndex: 'office',
      width: 60,
      render: (value: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{value}</div></Dropdown>)
    },
    {
      title: 'Врач',
      dataIndex: 'person',
      width: 100,
      render: (value: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{value}</div></Dropdown>)
    },
    {
      title: 'Записал',
      dataIndex: 'set_person',
      width: 90,
      render: (value: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{value}</div></Dropdown>)
    },
    {
      title: 'Примечание',
      dataIndex: 'note',
      width: 162,
      render: (value: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{value}</div></Dropdown>)
    }
  ];

  const menu = (
    <Menu>
      {type == 'post' && <>
        <Menu.Item key="1" onClick={()=>{showModal('delete')}}>Отменить запись</Menu.Item>
        <Menu.Item key="2" onClick={()=>{showModal('edit')}}>Перенести запись</Menu.Item>
      </>}
      <Menu.Item key="3" onClick={()=>{showModal('show')}}>Перейти в расписание</Menu.Item>
      <Menu.Item key="4">Изменить жалобы/ примечания - дать возможность регистратору изменить поля в записи</Menu.Item>
      <Menu.Item key="5">Напечатать направление - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
      <Menu.Item key="6">Печать предварительной записи - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
      <Menu.Item key="7">Свойства записи - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
    </Menu>
  );

  return <div style={{marginTop: 7, width: "100%"}}>
    <Descriptions.Item>
      <Radio.Group style={{marginLeft: 5, marginBottom: 2}} defaultValue={'post'} onChange={(e)=>{setType(e.target.value)}}>
        <Radio value={'post'}>Предварительная запись</Radio>
        <Radio value={'pre'}>Выполнение записи</Radio>
      </Radio.Group>
      </Descriptions.Item>
      <Descriptions.Item contentStyle={{margin: 0, padding: 0, border: 0}}>
      <div className='tickets-table'>
        { ticketsLoading ?
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', background: "40%"}}>
              <Spin style={{margin: "25% auto"}}/>
            </div>
            :
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onContextMenu: event => {
                    setActionData(data[record.key].actionData)
                  },
                };
              }}
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ x: true, y: "37vh"}}
              style={{maxHeight: "40vh"}}
              showSorterTooltip={{title: 'Переключение сортировки списка: по убыванию даты, по фамилии врача, по возрастанию даты'}}
            />
        }
      </div>
    </Descriptions.Item>
  </div>
};

export default PatientTickets;
