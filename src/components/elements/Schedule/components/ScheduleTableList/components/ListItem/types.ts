import { ScheduleTableModeType, Schedule} from "../../../../types";
import { ActionData  } from "../../../../types"

export interface ItemProps {
  isLoading: boolean;
  id: number;
  name: string;
  toggle: boolean;
  onToggle(id: number): void;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
  person_list: Person[];
  child: PersonTree[];
  selected: any;
  level: number;
  loadSchedule(id: number[], beg_date: string, end_date: string): void;
  schedule: Schedule;
  currentDate: Date;
  rangeWeekDate: Date;
  onModeChange(mode: ScheduleTableModeType): void;
  startHour: number;
  endHour: number;
  speciality: {
    [k: number]: string;
  };
  showModal?(data: ActionData): void;
  client : {
    fullName: string;
    id: number;
  };
  setCurrentDay(date?: Date): void;
  currentDay? : Date | undefined;
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

