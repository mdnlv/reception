export type ScheduleTableModeType = 'day' | 'week';

export interface ActionItems {
  [k: string]:
    | {
        name: string;
        clientId: number;
      }
    | undefined;
}

export interface ScheduleListItem {
  planned: number;
  id: number;
  personName: string;
  items: ActionItems;
}
