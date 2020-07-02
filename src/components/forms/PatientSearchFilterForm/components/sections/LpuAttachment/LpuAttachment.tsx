import React from 'react'
import {Button, Checkbox, Col, Input, Row} from "antd";
import FormField from "../../../../components/FormField/FormField";
import './styles.scss'

const LpuAttachment: React.FC = (props) => {
    return (
        <div className={'form-section lpu-section'}>
            <h2>Прикрепление к ЛПУ</h2>
            <Row>
                <Col span={24}>
                    <FormField>
                        <Input size={'small'}/>
                    </FormField>
                </Col>
            </Row>
            <Row className={'lpu-section__actions'} justify={'space-between'}>
                <Col>
                    <FormField>
                        <Checkbox>любое ЛПУ кроме базового</Checkbox>
                    </FormField>
                </Col>
                <Button type={'primary'} size={'small'}>
                    Выбор организации
                </Button>
            </Row>
        </div>
    )
}

export default LpuAttachment
