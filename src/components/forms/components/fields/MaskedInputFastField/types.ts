import {MaskedInputProps} from "antd-mask-input/build/main/lib/MaskedInput";

export interface FieldProps extends MaskedInputProps {
  name: string;
  error?: boolean;
}
