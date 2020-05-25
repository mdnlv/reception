import React, {FC} from 'react'
import {FormContext, useForm, Controller} from 'react-hook-form'
import DropDownContent from "../../elements/DropDownContent/DropDownContent";
import ArrayField from "../components/ArrayField/ArrayField";
import {Row, Col, Select, Divider} from "antd";
import FormField from "../components/FormField/FormField";

const PersonLinksForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>
            <form {...form}>
                 <div className="form-section">
                     <DropDownContent title={'Связи'}>
                         <Row>
                             <Col span={24}>
                                 <ArrayField
                                     fieldName={'personLinks'}
                                     renderChild={() => (
                                         <Row gutter={16}>
                                             <Col span={5}>
                                                 <FormField label={'Прямая связь'}>
                                                     <Controller
                                                         as={<Select/>}
                                                         name={''}
                                                         control={form.control}
                                                     />
                                                 </FormField>
                                             </Col>
                                             <Col span={7}>
                                                 <FormField label={'Связан с пациентом'}>
                                                     <Controller
                                                         as={<Select/>}
                                                         name={''}
                                                         control={form.control}
                                                     />
                                                 </FormField>
                                             </Col>
                                         </Row>
                                     )}/>
                             </Col>
                         </Row>
                         <Divider/>
                         <Row>
                             <Col span={24}>
                                 <ArrayField
                                     fieldName={'personLinks'}
                                     renderChild={() => (
                                         <Row gutter={16}>
                                             <Col span={5}>
                                                 <FormField label={'Прямая связь'}>
                                                     <Controller
                                                         as={<Select/>}
                                                         name={''}
                                                         control={form.control}
                                                     />
                                                 </FormField>
                                             </Col>
                                             <Col span={7}>
                                                 <FormField label={'Связан с пациентом'}>
                                                     <Controller
                                                         as={<Select/>}
                                                         name={''}
                                                         control={form.control}
                                                     />
                                                 </FormField>
                                             </Col>
                                         </Row>
                                     )}/>
                             </Col>
                         </Row>
                     </DropDownContent>
                 </div>
            </form>
        </FormContext>
    )
}

export default PersonLinksForm

