import React from 'react'
import {Button, Modal, Row} from "antd";

import {AppointmentProps} from "./types";

import NewAppointmentForm from "../../forms/NewAppointmentForm/NewAppoinmentForm";

const NewAppointment: React.FC<AppointmentProps> = ({
    isVisible,
    onClose,
    onSubmit
}) => {
    return (
        <Modal
            wrapClassName={'app-modal'}
            onCancel={onClose}
            onOk={onClose}
            visible={isVisible}
            title={'Записать на прием'}
            footer={<Row justify={'end'}>
                <Button type="primary" onClick={onClose} danger>
                    Отмена
                </Button>
                <Button type="primary" onClick={onClose} className={'save-btn'}>
                    Записать
                </Button>
            </Row>}
        >
              <NewAppointmentForm/>
        </Modal>
    )
}

export default NewAppointment
