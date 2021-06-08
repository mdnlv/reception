import React from 'react'
import {Button, Modal, Row} from "antd";
import { Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import {saveDeferredCall } from '../../../reduxStore/slices/deferredCalls/deferredCallsSlice';

import { RootState } from '../../../reduxStore/store';
import {AppointmentProps} from "./types";

import JosAppointmentForm from "../../forms/JosAppointmentForm/JosAppointmentForm"

const JosAppointment: React.FC<AppointmentProps> = ({
  isVisible,
  onClose,
  onSubmit
  }) => {

    const dispatch = useDispatch()


    const { josForm } = useSelector(
      (state: RootState) => state.deferredCalls,
  );



  return (
    <Formik
    initialValues={josForm}
    onSubmit={(values, actions) => {
        console.log('пес')

        const data = {
          "client_id": Number(values.patient.id),
          "comment": "",
          "contact": "",
          "createPerson_id": 0,
          "id": 0,
          "maxDate": "2020-12-12",
          "netrica_Code": "",
          "orgStructure_id": Number(values.organisation.id),
          "person_id": Number(values.doctor.id),
          "speciality_id": Number(values.specialty.id),
          "status_id": 1
        }

        dispatch(saveDeferredCall({data:data}))
    }}
> 

{propsForm => (
    <Modal
      wrapClassName={'app-modal'}
      onCancel={onClose}
      onOk={onClose}
      visible={isVisible}
      title={'Записать на прием'}
      footer={
        <Row justify={'end'}>
          <Button type="primary" onClick={onClose} danger>
            Отмена
          </Button>
          <Button type="primary" onClick={()=>propsForm.handleSubmit()} className={'save-btn'}>
            Записать
          </Button>
        </Row>
      }
    >
      <JosAppointmentForm />
    </Modal>
           )}

    </Formik>
  )
}

export default JosAppointment;
