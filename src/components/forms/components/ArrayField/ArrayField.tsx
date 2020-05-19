import React from 'react'
import {useFieldArray} from "react-hook-form";

type FieldProps<T> = {
    fieldName: string
    renderChild: (field: T & {id: string}) => JSX.Element
}

function ArrayField<T>(props: FieldProps<T>) {

    const {fields, append, remove} = useFieldArray({
        name: props.fieldName
    })

    return (
        <>
            {fields.map((field) => {
                let typedField = field as T &{ id: string }
                return  props.renderChild(typedField)
            })}
        </>
    )
}

export default ArrayField
