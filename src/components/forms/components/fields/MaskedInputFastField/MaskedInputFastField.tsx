import React, { useCallback, useEffect, useState } from 'react';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import { MaskedInput } from 'antd-mask-input';
import { useDebouncedCallback } from 'use-debounce';

interface FieldProps extends MaskedInputProps {
  name: string;
  value: string;
}

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
      {...props}
      value={innerValue}
      onChange={handleOnChange}
      mask={props.mask}
    />
  );
};

export default MaskedInputFastField;
