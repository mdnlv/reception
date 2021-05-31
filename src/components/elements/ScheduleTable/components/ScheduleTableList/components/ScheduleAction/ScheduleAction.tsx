import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Input, Select, DatePicker } from 'antd';
import { ActionProps } from './types';
import './styles.scss';
import { currentPatientInfoSelector } from '../../../../../../../reduxStore/slices/patients/selectors';

const ScheduleAction: React.FC<ActionProps> = ({
  data,
  visible,
  loading,
  handleOk,
  handleCancel
}) => { 
  const currentPatientMemo = useSelector(currentPatientInfoSelector);
  return (data ?
    <Modal title="Запись на приём" visible={visible} closable={false} footer={[
      <Button danger key="back" onClick={handleCancel}>Отмена</Button>,
      <Button
          key="link"
          type="primary"
          loading={loading}
          onClick={()=>{handleOk({
            action_id: data.data.action_id,
            idx: data.data.idx,
            client_id:  data.data.client_id == - 1? (currentPatientMemo ? currentPatientMemo.code : 0) : data.data.client_id,
            person_id: data.data.person_id,
            user_id: data.data.user_id,
            index: data.data.index
          })}}
      >Записать</Button>]}>
      <div className='date-time'>
        <div>Дата приёма: {data.date}</div>
        <div>Время приёма: {data.time}</div>
      </div>
      ФИО пациента 
      <Input value={data.data.client_id == - 1? (currentPatientMemo ? currentPatientMemo.fullName : ''): data.client}/>
      Врач
      <Input value={data.person}/>
      Специальность врача
      <Input value={data.speciality}/>
    </Modal> : null
  );
};

export default ScheduleAction;
