import React from 'react'
import {Button, Modal, Row} from "antd";
import NewAppointmentForm from "../../forms/NewAppointmentForm/NewAppoinmentForm";

type AppointmentProps = {
    isVisible: boolean
    onClose?(): void
    onSubmit?(): void
}

const NewAppointment: React.FC<AppointmentProps> = (props) => {
    return (
        <Modal
            wrapClassName={'app-modal'}
            onCancel={props.onClose}
            onOk={props.onClose}
            visible={props.isVisible}
            title={'Записать на прием'}
            footer={<Row justify={'end'}>
                <Button type="primary" onClick={props.onClose} danger>
                    Отмена
                </Button>
                <Button type="primary" onClick={props.onClose} className={'save-btn'}>
                    Записать
                </Button>
            </Row>}
        >
              <NewAppointmentForm/>
        </Modal>
    )
}

export default NewAppointment
