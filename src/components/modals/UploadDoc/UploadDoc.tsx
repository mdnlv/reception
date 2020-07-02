import React from 'react'
import {Modal, Upload, } from "antd";
import {InboxOutlined} from "@ant-design/icons/lib";
import './styles.scss'
import {UploadChangeParam} from "antd/es/upload";

const { Dragger } = Upload;

type ModalProps = {
    isVisible: boolean
    onClose(): void
}

const UploadDoc: React.FC<ModalProps> = (props) => {    

    const onUploadChange = (info: UploadChangeParam) => {
        console.log(info.file)
    }

    return (
        <Modal
            className={'upload-doc-modal'}
            visible={props.isVisible}
            onCancel={props.onClose}
            footer={null}
            closable={false}
        >
            <Dragger onChange={onUploadChange}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Нажмите для выбора  документа или
                    ператащите его в это окно</p>
                <p>Требования к загружаемому документу</p>
            </Dragger>
        </Modal>
    )

}

export default UploadDoc
