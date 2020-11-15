import {ScheduleTableModeType} from "../../types";

export interface HeaderProps {
  currentDate: Date;
  onDateChange(date: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  onRangeWeekChange(date: Date): void;
  mode: ScheduleTableModeType;
  rangeWeekDate: Date;
}
