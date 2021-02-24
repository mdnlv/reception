import React, { useCallback, useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { useDebouncedCallback } from 'use-debounce';

import {FieldProps} from "./types";

const InputNumberFastField: React.FC<FieldProps> = ({value, onChange}) => {
  const [innerValue, setInnerValue] = useState(0);

  useEffect(() => {
    if (value) {
      setInnerValue(value);
    } else {
      setInnerValue(0);
    }
  }, [value]);

  const debouncedCallback = useDebouncedCallback(
    (value: number | string | undefined) => {
      if (onChange) {
        onChange(value);
      }
    },
    500,
  );

  const handleOnChange = useCallback((value: number | string | undefined | null) => {
    const stringValue = value?.toString().replace('-', '');
    const numValue = stringValue ? parseInt(stringValue) : 0;
    setInnerValue(numValue as number);
    debouncedCallback.callback(numValue);
  }, []);

  return <InputNumber value={innerValue} onChange={handleOnChange} />;
};

export default InputNumberFastField;
