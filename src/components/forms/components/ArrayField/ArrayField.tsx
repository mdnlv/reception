import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Space, Tooltip } from 'antd';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

import {FieldProps} from './types';

const ArrayField = ({fieldName, renderChild}: FieldProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const addItem = () => {
    append({ name: 'item' });
  }

  const removeLast = () => {
    if (fields.length) {
      remove(fields.length - 1);
    }
  }

  const getFieldsContent = () => {
    return fields.map((field, index) => {
      return renderChild(field.id!, index);
    });
  }

  return (
    <>
      <Space>
        <Tooltip title={'Добавить'}>
          <Button
            type={'link'}
            size={'small'}
            shape="circle"
            onClick={() => {
              addItem();
            }}
            icon={<PlusCircleTwoTone className={'fields-btn__icon'} />}
            className={'full-icon'}
          />
        </Tooltip>
        <Tooltip title={'Удалить'}>
          <Button
            type={'link'}
            size={'small'}
            disabled={fields.length <= 0}
            shape="circle"
            onClick={() => {
              removeLast();
            }}
            icon={<MinusCircleTwoTone className={'fields-btn__icon'} />}
          />
        </Tooltip>
      </Space>
      {getFieldsContent()}
    </>
  );
}

export default ArrayField;
