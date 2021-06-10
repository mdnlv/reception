import React from 'react'
import { Button, Modal, Row } from "antd";
import { Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { saveDeferredCall } from '../../../reduxStore/slices/deferredCalls/deferredCallsSlice';
import { format } from "date-fns";
import { RootState } from '../../../reduxStore/store';
import { AppointmentProps } from "./types";
import  validation from './validation'
import JosAppointmentForm from "../../forms/JosAppointmentForm/JosAppointmentForm"

const JosAppointment: React.FC<AppointmentProps> = (props) => {

  const dispatch = useDispatch()


  const { josForm } = useSelector(
    (state: RootState) => state.deferredCalls,
  );



  return (
    <Formik
      initialValues={josForm}
      validationSchema={validation}
      onSubmit={(values,events) => {


        const data = {
          "client_id": Number(values.patient),
          "comment": values.сomment || '',
          "contact": "",
          "createPerson_id": 0,
          "id": 0,
          "maxDate": format(Date.parse(String(values.date)), "yyyy-MM-dd"),
          "netrica_Code": "",
          "orgStructure_id": Number(values.organisation),
          "person_id": Number(values.doctor),
          "speciality_id": Number(values.specialty),
          "status_id": 1
        }
        dispatch(saveDeferredCall({ data: data }))
        events.resetForm()
        props.onClose &&  props.onClose()
      }}
    >

      {propsForm => (
        <Modal
          wrapClassName={'app-modal'}
          onCancel={props.onClose}
          onOk={props.onClose}
          visible={props.isVisible}
          title={'Записать на прием'}
          footer={
            <Row justify={'end'}>
              <Button type="primary" onClick={props.onClose} danger>
                Отмена
          </Button>
              <Button type="primary" onClick={() => propsForm.handleSubmit()} className={'save-btn'}>
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
