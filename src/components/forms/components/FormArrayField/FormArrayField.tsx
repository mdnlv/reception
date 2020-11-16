import React, { useEffect, useMemo, useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

import {FieldProps} from "./types";

function FormArrayField<T>({values, name, renderChild}: FieldProps<T>) {
  const initialValues = values?.length || 0;
  const [fieldsArr, setFieldsArr] = useState<string[]>(
    initialValues
      ? Array.of(initialValues).map((item, index) => {
          return `${name}[${index}]`;
        })
      : [],
  );

  useEffect(() => {
    if (Array.isArray(values)) {
      setFieldsArr(
        Array.of(values.length).map((item, index) => {
          return `${name}[${index}]`;
        }),
      );
    }
  }, [values]);

  const addItem = () => {
    let index = 0;
    if (fieldsArr.length === 0) {
      index = fieldsArr.length;
    } else if (fieldsArr.length === 1) {
      index = fieldsArr.length;
    } else {
      index = fieldsArr.length;
    }
    const fieldName = `${name}[${index}]`;
    setFieldsArr([...fieldsArr, fieldName]);
  }

  const removeItem = () => {
    setFieldsArr(fieldsArr.slice(0, fieldsArr.length - 1));
  }

  const arrayContent = () => {
    return fieldsArr.map((item, index) => {
      return renderChild(item, index);
    });
  }

  const arrayContentMemo = useMemo(() => {
    return fieldsArr.map((item, index) => {
      return renderChild(item, index);
    });
  }, [fieldsArr.length]);

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
            disabled={fieldsArr.length <= 0}
            shape="circle"
            onClick={() => {
              removeItem();
            }}
            icon={<MinusCircleTwoTone className={'fields-btn__icon'} />}
          />
        </Tooltip>
      </Space>

      {arrayContentMemo}
    </>
  );
}

export default FormArrayField;
