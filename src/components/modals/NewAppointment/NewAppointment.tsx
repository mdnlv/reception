import React from 'react'
import { Modal } from "antd";
import {Formik} from "formik";
import {AppointmentProps} from "./types";
import moment from 'moment';
import NewAppointmentForm from "../../forms/NewAppointmentForm/NewAppoinmentForm";
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore/store';

const NewAppointment: React.FC<AppointmentProps> = ({
    visible,
    loading,
    postLoading,
    setVisible,
    data,
    actionTicket,
    currentPatientMemo,
    setResult
  }) => {
  const patients = useSelector((state: RootState) => state.patients.patients);
  return (
    <Formik
      initialValues={data?  
        {
          action_id: data.data.action_id,
          idx: data.data.idx,
          client_id:  data.data.client_id == - 1? (currentPatientMemo ? currentPatientMemo.code : 0) : data.data.client_id,
          client: currentPatientMemo ? currentPatientMemo.fullName: '',
          person_id: data.data.person_id,
          user_id: data.data.user_id,
          index: data.data.index,
          type: 'new',
          pacient: data.client,
          person: data.person,
          date: moment(data.date, "DD.MM.YYYY").format('MM DD YYYY'),
          speciality: data.speciality,
          time: '',
          organisation: data.org
        }: {}
      }
      onSubmit={(values) => {
        actionTicket({
          action_id: values.action_id ? values.action_id : -1,
          idx: values.idx ? values.idx : 0,
          old_action_id: 0,
          old_idx: 0,
          client_id: values.client.length > 6 ? values.client_id : Number(values.client),
          person_id: values.person_id ? values.person_id : -1,
          user_id: values.user_id ? values.user_id : -1,
          type: 'new'
        }, values.organisation? values.organisation: -1)
        setResult({
          pacient: values.client.length > 6 ? values.client : patients[values.client].fullName,
          date: values.date ? values.date :'',
          time: values.time ? values.time :'',
          person: values.person ? values.person: '',
          speciality: values.speciality ? values.speciality : ''
        })
      }}
    >
      {propsForm => (
        <Modal 
          wrapClassName={'app-modal'}
          title={'Запись на приём'}
          visible={visible || loading}  
          onCancel={()=>{setVisible(false)}}
          okText={'Записать'}
          cancelText={'Отмена'}
          okButtonProps={{style:{backgroundColor: '#52c41a', borderColor: '#00000000', color: '#fff'}}}
          cancelButtonProps={{style:{backgroundColor: '#ff4d4f', borderColor: '#00000000', color: '#fff'}}}
          onOk={()=>{propsForm.handleSubmit()}}
        >
          <NewAppointmentForm data={data} currentPatientMemo={currentPatientMemo}/>
        </Modal>
      )}
    </Formik>
  )
}

export default NewAppointment
