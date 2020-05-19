import React, {FC} from 'react'
import useArrayFieldsHook from "../../../../hooks/arrayHook";
import ArrayFieldBar from "../../../../components/ArrayFieldsBar/ArrayFieldsBar";
import {Col, InputNumber, Row, Select} from "antd";
import FormField from "../../../../components/FormField/FormField";
import {Controller, useFormContext} from "react-hook-form";

const HazardHistoryFields: FC = props => {
    const {control} = useFormContext()
    const {addItem, removeLast, fields} = useArrayFieldsHook('hazardHistory')

    return (
        <div>
            <ArrayFieldBar addNewField={addItem} removeLast={removeLast} isDisabledDelete={fields.length <= 0}/>
        </div>
    )
}

export default HazardHistoryFields
