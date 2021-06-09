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
      validationSchema={validation}
      onSubmit={(values,d) => {
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        console.log(values,d)
        const data = {
          "client_id": Number(values.patient),
          "comment": "",
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
