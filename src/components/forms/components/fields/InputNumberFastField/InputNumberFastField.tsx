import React, { useCallback, useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';
import { useDebouncedCallback } from 'use-debounce';

interface FieldProps extends InputNumberProps {
  name: string;
  value?: number;
}

const InputNumberFastField: React.FC<FieldProps> = (props) => {
  const [innerValue, setInnerValue] = useState(0);

  useEffect(() => {
    if (props.value) {
      setInnerValue(props.value);
    } else {
      setInnerValue(0);
    }
  }, [props.value]);

  const debouncedCallback = useDebouncedCallback(
    (value: number | string | undefined) => {
      if (props.onChange) {
        props.onChange(value);
      }
    },
    200,
  );

  const handleOnChange = useCallback((value: number | string | undefined) => {
    setInnerValue(value as number);
    debouncedCallback.callback(value);
  }, []);

  return <InputNumber value={innerValue} onChange={handleOnChange} />;
};

export default InputNumberFastField;
