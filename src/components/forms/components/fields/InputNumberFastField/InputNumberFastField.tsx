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
    200,
  );

  const handleOnChange = useCallback((value: number | string | undefined) => {
    setInnerValue(value as number);
    debouncedCallback.callback(value);
  }, []);

  return <InputNumber value={innerValue} onChange={handleOnChange} />;
};

export default InputNumberFastField;
