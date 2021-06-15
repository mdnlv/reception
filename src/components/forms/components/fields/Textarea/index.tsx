import React from 'react';
import { Input } from 'antd';
import { useField } from 'formik';


const Textarea: React.FC<any> = (props) => {
    const [field, , form] = useField<string>(props.name);
    const { TextArea } = Input;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        form.setValue(e.target.value)
    }

    return (
        <TextArea value={field.value} onChange={onChange} />
    );
};
export default Textarea;


