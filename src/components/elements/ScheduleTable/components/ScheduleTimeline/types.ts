import {ScheduleTableModeType} from "../../types";

export interface TimeLineProps {
  mode: ScheduleTableModeType;
  currentDate: Date;
  rangeWeekNum: number;
}
