import {Schedule, ScheduleTableModeType} from "../../types";

export interface ListProps {
  list: Schedule;
  onNewScheduleItem(): void;
  onToggleRow(id: number): void;
  selected: number[];
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
  person_tree: PersonTree[];
  loadSchedule(id: number, beg_date: string, end_date: string): void;
  currentDate: Date;
  rangeWeekDate: Date;
  onDateChange(date: Date): void;
  onModeChange(mode: ScheduleTableModeType): void;
  startHour: number;
  endHour: number;
  speciality: {
    [k: number]: string;
  }
}

export interface PersonTree {
  id: number;
  name: string;
  child: PersonTree[];
  person_list: Person[];
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  patrName: string;
}
