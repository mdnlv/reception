import {SelectProps, SelectValue} from "antd/es/select";

export interface SearchSelectProps extends SelectProps<SelectValue> {
  name: string;
  isDisabled?: boolean;
  valueSet?: boolean| string | number | undefined;
  onFocus?: () => void;
}
