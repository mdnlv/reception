import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from 'antd';

import {FieldProps} from "./types";

const TextFastField: React.FC<FieldProps> = ({
  value,
  onChange,
  disabled,
  name
}) => {
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    if (value) {
      setInnerValue(value);
    } else {
      setInnerValue('');
    }
  }, [value]);

  const debouncedCallback = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    },
    200,
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();

      const newVal = event.target.value;
      setInnerValue(newVal);
      debouncedCallback.callback(event);
    },
    [],
  );

  return (
    <Input
      {...{value, onChange, disabled, name}}
      disabled={disabled}
      value={innerValue}
      name={name}
      onChange={handleOnChange}
    />
  );
};

export default TextFastField;
