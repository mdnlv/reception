import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from 'antd';

import {FieldProps} from "./types";

const TextFastField: React.FC<FieldProps> = (props) => {
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    if (props.value) {
      setInnerValue(props.value);
    } else {
      setInnerValue('');
    }
  }, [props.value]);

  const debouncedCallback = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(event);
      }
    },
    500,
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
      {...props}
      disabled={props.disabled}
      value={innerValue}
      name={props.name}
      onChange={handleOnChange}
      style={props.error ? {borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.1)'} : {}}
    />
  );
};

export default TextFastField;
