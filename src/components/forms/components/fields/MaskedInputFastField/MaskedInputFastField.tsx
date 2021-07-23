import React, { useCallback, useEffect, useState } from 'react';
import { MaskedInput } from 'antd-mask-input';
import { useDebouncedCallback } from 'use-debounce';

import { FieldProps } from './types';

const MaskedInputFastField: React.FC<FieldProps> = (props) => {
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
    <MaskedInput
      {...props}
      value={innerValue}
      onChange={handleOnChange}
      mask={props.mask}
      name={props.name}
      style={props.error ? {borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.2)'} : {}}
    />
  );
};

export default MaskedInputFastField;
