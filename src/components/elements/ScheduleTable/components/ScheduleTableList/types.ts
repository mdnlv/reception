import {ScheduleListItem, ScheduleTableModeType} from "../../types";

export interface ListProps {
  list: ScheduleListItem[];
  onNewScheduleItem(): void;
  onToggleRow(id: number): void;
  selected: number[];
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
}
