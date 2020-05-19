import React, {FC} from "react";
import {FormContext, useForm} from "react-hook-form";

const AttachemntsForm: FC = (props) => {

    const form = useForm()

    return (
        <FormContext {...form}>S
            <form className={'attachments-form'}>

            </form>
        </FormContext>
    )
}

export default AttachemntsForm
