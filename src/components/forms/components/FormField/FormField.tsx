import React, {FC} from 'react'
import './styles.scss'

type FieldProps = {
    label?: string,
    labelPosition?: string
}

const FormField: FC<FieldProps> = (props) => {

    function getFieldLabel() {
        if(!props.label){
            return null
        }else{
            let className = ''
            if(props.labelPosition === 'left'){
                className = 'form-field__label--left'
            }

            return (
                <label className={`form-field__label ${className}`}>
                    {props.label}
                </label>
            )
        }
    }

    function getFormBody() {
        let className = ''
        if(props.labelPosition === 'top'){
            className = 'form-field__body--top'
        }else if(props.labelPosition === 'left'){
            className = 'form-field__body--left'
        }

        return <div className={`form-field__body ${className}`}>
            {getFieldLabel()}
            <div className='form-field__content'>
                {props.children}
            </div>
        </div>
    }

    return (
        <div className='form-field'>
            {getFormBody()}
        </div>
    )
}

FormField.defaultProps = {
    labelPosition: 'top'
}

export default FormField
