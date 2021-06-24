import {DatePickerProps} from "antd/es/date-picker";

export type PickerProps = DatePickerProps & {
  name: string;
  valueSet?: string;
  setDate?(arg: Date): void;
  onSelectDate?(): void;
};
