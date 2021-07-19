import React, { useEffect } from 'react';
import {Table,Dropdown, Menu, Checkbox } from 'antd/lib';
import './styles.scss';
import { TicketsTableProps } from './types';
import { clientAppointment } from "../../../../../../../reduxStore/slices/scheduleSlice/scheduleSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../reduxStore/store';

const TicketsTable: React.FC<TicketsTableProps> = ({ client_id, type }) => {

  const dispatch = useDispatch();
  const tickets = useSelector((state:RootState) => state.schedule.tickets);

  useEffect(()=>{
    dispatch(clientAppointment({
      client_id: client_id,
      is_past_records: type == 'pre' ? true: undefined
    }))
  },[client_id, type])
  
  const columns = [
    {
      title: 'Выполнено',
      dataIndex: 'name',
      width: 104,
      render: (i: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}><Checkbox /></div></Dropdown>)
    },
    {
      title: 'Дата и время',
      dataIndex: 'date',
      width: 118,
      render: (value: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{value}</div></Dropdown>)
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
      width: 90,
      render: (value: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{value}</div></Dropdown>)
    },
    {
      title: 'Записал',
      dataIndex: 'user',
      width: 90,
      render: () => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>user</div></Dropdown>)
    },
    {
      title: 'Примечание',
      dataIndex: 'address',
      width: 170,
      render: (i: any) => (<Dropdown overlay={menu}  trigger={['contextMenu']}><div style={{padding:10}}>{i}</div></Dropdown>)
    }
  ];
 
  const menu = (
    <Menu>
      <Menu.Item key="1">Удалить запись</Menu.Item>
      <Menu.Item key="2">Перенести запись</Menu.Item>
      <Menu.Item key="3">Перейти в расписание - по нажатию на эту запись необходимо переводить фокус в запись в расписании</Menu.Item>
      <Menu.Item key="4">Изменить жалобы/ примечания - дать возможность регистратору изменить поля в записи</Menu.Item>
      <Menu.Item key="5">Напечатать направление - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
      <Menu.Item key="6">Печать предварительной записи - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
      <Menu.Item key="7">Свойства записи - тут будет переход на шаблон печати ( как только модуль печати будет доделан)</Menu.Item>
    </Menu>
  );  
  
  const data:any = [];
  tickets.map((item: any, i: number) => {
    data.push({
      key: i,
      date: item.date + ' ' + item.time,
      person: item.person,
      office: item.office,
    });
  })

  return <div className='tickets-table' >
    <Table columns={columns} dataSource={data} pagination={false} scroll={{ x: true, y: 300 }} style={{marginTop: -16, width: 500}} />    
  </div>
};

export default TicketsTable;
