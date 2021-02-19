import {SelectProps, SelectValue} from "antd/es/select";

export interface SearchSelectProps extends SelectProps<SelectValue> {
  name: string;
  isDisabled?: boolean;
  onFocus?: () => void;
  onKeyPress?(event: React.ChangeEvent<HTMLInputElement>): unknown;
}
