import React from 'react';
import { useField } from 'formik';
import { TreeSelect } from 'antd'

const TreeSelectField: React.FC<any> = (props) => {
    const [field, , form] = useField<string>(props.name);
    const { SHOW_PARENT } = TreeSelect;

    const onChange = (val: string) => {
        form.setValue(val)
        if(!val){
            props.onClear()
        }
    }

    return (
        <TreeSelect
            showSearch
            showCheckedStrategy={SHOW_PARENT}
            style={{ width: '100%' }}
            defaultValue={props.defaultValue}
            value={props.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Выберите подразделение"
            allowClear
            onChange={onChange}
            treeNodeFilterProp={'title'}
            onSelect={props.onSelect}
            treeDefaultExpandAll
        >
            {props.children}
        </TreeSelect>
    );
};

export default TreeSelectField;