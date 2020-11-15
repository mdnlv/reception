export interface ItemProps {
  type: 'default' | 'closed' | 'empty';
  onClick?(): void;
  info?: {
    clientId: number;
    name: string;
  };
  onNewScheduleItem(): void;
  width: number;
}
