import React from 'react'
import {Button, Col, Input, Row} from "antd";
import {DeleteOutlined, DownloadOutlined, PlusOutlined} from "@ant-design/icons/lib";
import './styles.scss'

const PatientHappeningsHeader: React.FC = (props) => {
    return (
        <Row justify={'space-between'} align={'middle'} className={'happenings-actions'}>
            <Col span={8}>
                <Input size={'small'}/>
            </Col>
            <Col span={10}>
                <Row justify={'end'}>
                    <Button className={'save-btn header-actions__item'} icon={<PlusOutlined/>}>
                        загрузить документ
                    </Button>
                    <Button type={'primary'} className={'header-actions__item'} ghost icon={<DownloadOutlined />}>
                        скачать
                    </Button>
                    <Button type={'primary'} danger className={'header-actions__item'} icon={<DeleteOutlined />}>
                        удалить документ
                    </Button>
                </Row>
            </Col>
        </Row>
    )
}

export default PatientHappeningsHeader
