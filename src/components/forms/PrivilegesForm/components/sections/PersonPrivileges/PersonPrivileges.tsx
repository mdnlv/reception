import React, {FC} from "react";
import DropDownContent from "../../../../../elements/DropDownContent/DropDownContent";
import {Col, DatePicker, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import FormState from "../../../types";
import {useFormikContext} from "formik";
import FormArrayField from "../../../../components/FormArrayField/FormArrayField";


const PersonPrivileges: FC = (props) => {

    const form = useFormikContext<FormState>()

    return (
        <div className={'form-section person-privileges'}>
            <DropDownContent title={'Льготы'}>
                <FormArrayField values={form.values.privileges} name={'privileges'} renderChild={
                    (key, index) => (
                        <Row gutter={16} key={key}>
                            <Col>
                                <FormField label={'Тип'}>
                                    <Select/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата начала'}>
                                    <DatePicker/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Дата окончания'}>
                                    <DatePicker/>
                                </FormField>
                            </Col>
                            <Col>
                                <FormField label={'Причина прекращения наблюдения'}>
                                    <Select/>
                                </FormField>
                            </Col>
                        </Row>
                    )
                }/>
            </DropDownContent>
        </div>
    )
}

export default PersonPrivileges
