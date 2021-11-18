import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Input, Select } from 'antd';

import { ActionProps } from './types';
import { currentPatientInfoSelector } from '../../../../../../../reduxStore/slices/patients/selectors';
import {RootState} from "../../../../../../../reduxStore/store";

import NewAppointment from '../../../../../../modals/NewAppointment/NewAppointment';

const ScheduleAction: React.FC<ActionProps> = ({
  data,
  visible,
  loading,
  actionTicket,
  setVisible,
  setOldData,
  oldData,
  setResult,
  speciality
}) => {
  const { Option } = Select;
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  const postLoading = useSelector((state: RootState) => state.schedule.postLoading);
  // @ts-ignore
  const [specialityValue] = useState(speciality[data?.speciality || 1]);

  useEffect(() => {
    if(oldData && data && data.data.client_id > -1) {
      Modal.error({
        title: 'Номерок занят',
        content: `Выберите свободный номерок`,
        okText: 'ОК',
        onOk: setVisible
      })
      setVisible(false);
    }

    if(data?.type == 'delete') delRecord();
    if(data?.type == 'edit') chgRecord();
  }, [visible]);

  const delRecord = () => {
    Modal.confirm({
      title: 'Отменить приём?',
      content: `Информация о приёме будет удалена без возможности восстановления`,
      okText: 'Ок',
      cancelText: 'Не отменять',
      onOk: ()=>{
        if(data)
        actionTicket({
          action_id: data.data.action_id,
          idx: data.data.idx,
          client_id:  data.data.client_id == - 1? (currentPatientMemo ? currentPatientMemo.code : 0) : data.data.client_id,
          person_id: 0,
          user_id: data.data.user_id,
          index: data.data.index,
          old_action_id: 0,
          old_idx: 0,
          type: 'delete'
        }, data.org)
      }
    });
  }

  const chgRecord = () => {
    Modal.confirm({
      title: 'Перенести приём',
      content: `Выберите свободную ячейку в расписании чтобы перенести приём`,
      okText: 'Выбрать',
      cancelText: 'Отмена',
      onOk: ()=>{
        setOldData(data)
        setVisible(false)
      }
    });
  }


  return <>{
    oldData === undefined ? (
      (data && data.data.client_id == - 1) ?
        <NewAppointment
          visible={visible}
          loading={loading}
          postLoading={postLoading}
          setVisible={setVisible}
          data={data}
          actionTicket={actionTicket}
          currentPatientMemo={currentPatientMemo}
          setResult={setResult}
        />
      :
      <Modal
        title={data?.date}
        visible={visible || (loading && postLoading)}
        confirmLoading={postLoading}
        onCancel={()=>{setVisible(false)}}
        footer={[
          <Button
            onClick={delRecord}
            style={{backgroundColor: '#ff4d4f', borderColor: '#00000000', color: '#fff'}}
            key={1}
          >
            Отменить приём
          </Button>,
          <Button
            onClick={chgRecord}
            style={{backgroundColor: '#52c41a', borderColor: '#00000000', color: '#fff'}}
            key={2}
          >
            Перенести приём
          </Button>
        ]}
      >
        <div className='date-time'>
          <div>Дата приёма: {data?.date}</div>
          <div>Время приёма: {data?.time}</div>
        </div>
        ФИО пациента
        <Input value={data?.data.client_id == - 1? (currentPatientMemo ? currentPatientMemo.fullName : ''): data?.client}/>
        <div>Врач:</div>
        <Select defaultValue="1" style={{ width: 200 }}>
            <Option value="1">{data?.person}</Option>
        </Select>

        <div>Специальность врача:</div>
        <Select defaultValue={specialityValue} style={{ width: 200 }}>
          <Option value={specialityValue}>{specialityValue}</Option>
        </Select>
      </Modal>
    ) :
      <Modal
        title={'Перенести приём'}
        visible={visible || (loading && postLoading)}
        confirmLoading={postLoading}
        onCancel={()=>{
          setVisible(false)
          setOldData(undefined)
        }}
        okText={'Подтверждаю'}
        cancelText={'Отменить изменения'}
        okButtonProps={{style:{backgroundColor: '#52c41a', borderColor: '#00000000', color: '#fff'}}}
        cancelButtonProps={{style:{backgroundColor: '#ff4d4f', borderColor: '#00000000', color: '#fff'}}}
        onOk={()=>{
          if(data)
          actionTicket({
            action_id: data.data.action_id,
            idx: data.data.idx,
            client_id:  data.data.client_id == - 1? (currentPatientMemo ? currentPatientMemo.code : 0) : data.data.client_id,
            person_id: data.data.person_id,
            user_id: data.data.user_id,
            index: data.data.index,
            old_action_id: oldData.data.action_id,
            old_idx: oldData.data.idx,
            type: 'edit'
          }, data.org)
        }}
      >
        <div className='date-time'>
          <div>ФИО пациента: {oldData.client}</div>
          <div>Врач: {data?.person}</div>
          Специализация: {data?.speciality}
          <div>
            <h2>Текущая дата</h2>
            <div>{oldData?.date}</div>
            <div>{oldData?.time}</div>
          </div>
          <div>
            <h2>Новая дата</h2>
            <div>{data?.date}</div>
            <div>{data?.time}</div>
          </div>
        </div>
      </Modal>
    }
    </>
};

export default ScheduleAction;
