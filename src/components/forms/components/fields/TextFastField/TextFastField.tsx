import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';

interface FieldProps extends InputProps {
  name: string;
  value?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): unknown;
  placeholder?: string;
}

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
      {...props}
      disabled={props.disabled}
      value={innerValue}
      name={props.name}
      onChange={handleOnChange}
    />
  );
};

export default TextFastField;
