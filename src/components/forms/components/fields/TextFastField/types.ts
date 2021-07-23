import {InputProps} from "antd/es/input";
import React from "react";

export interface FieldProps extends InputProps {
  name: string;
  value?: any;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): unknown;
  placeholder?: string;
  error?: boolean;
}
