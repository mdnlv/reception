import React, { useCallback, useEffect, useState } from 'react';
import { MaskedInput } from 'antd-mask-input';
import { useDebouncedCallback } from 'use-debounce';

import { FieldProps } from './types';

const MaskedInputFastField: React.FC<FieldProps> = ({
  value,
  name,
  onChange,
  mask,
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
    <MaskedInput
      {...{ value, onChange, mask }}
      value={innerValue}
      onChange={handleOnChange}
      mask={mask}
      name={name}
    />
  );
};

export default MaskedInputFastField;
