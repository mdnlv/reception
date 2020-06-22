import React from 'react'
import {Button, Checkbox, Col, Input, Row} from "antd";
import FormField from "../../../../components/FormField/FormField";

const LpuAttachment: React.FC = (props) => {
    return (
        <div className={'form-section'}>
            <h2>Прикрепление к ЛПУ</h2>
            <Row>
                <Col span={24}>
                    <FormField>
                        <Input/>
                    </FormField>
                </Col>
            </Row>
            <Row justify={'space-between'}>
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
