import {InputProps} from "antd/es/input";

export interface FastInputProps extends InputProps {
  name: string;
  valueSet?: string | number;
}
