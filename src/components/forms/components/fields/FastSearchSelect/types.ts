import {SelectProps, SelectValue} from "antd/es/select";

export interface SearchSelectProps extends SelectProps<SelectValue> {
  name: string;
  isDisabled?: boolean;
  onFocus?: () => void;
  onSelect?:(val:any) => void;
  onSearch?: (val:string) => void;
  onInput?(event: React.ChangeEvent<HTMLInputElement>): unknown;
  onChangeExtra?: () => void;
}
