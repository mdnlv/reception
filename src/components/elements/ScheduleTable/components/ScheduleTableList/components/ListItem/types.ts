import { ScheduleTableModeType, Schedule} from "../../../../types";

export interface ItemProps {
  id: number;
  name: string;
  onNewScheduleItem(): void;
  toggle: boolean;
  onToggle(id: number): void;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
  person_list: Person[];
  child: PersonTree[];
  selected: any;
  level: number;
  loadSchedule(id: number, beg_date: string, end_date: string): void;
  schedule: Schedule;
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

