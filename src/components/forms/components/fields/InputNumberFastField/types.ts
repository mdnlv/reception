import {InputNumberProps} from "antd/es/input-number";

export interface FieldProps extends InputNumberProps {
  name: string;
  value?: number;
}
