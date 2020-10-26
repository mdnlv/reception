import React, { useMemo } from 'react';
import { Row } from 'antd';
import { ActionItems, ScheduleTableModeType } from '../../ScheduleTable';
import ScheduleActionItem from '../ScheduleActionItem/ScheduleActionItem';
import './styles.scss';

interface RowProps {
  planned: number;
  items: ActionItems;
  onNewScheduleItem(): void;
  mode: ScheduleTableModeType;
}

const ScheduleActionsRow: React.FC<RowProps> = ({
  items,
  planned,
  onNewScheduleItem,
  mode,
}) => {
  const itemWidth = Math.floor(480 / planned) * 2;

  const rowContent = useMemo(() => {
    switch (mode) {
      case 'week':
        return new Array(14).fill(0).map((item, index) => {
          if (Object.keys(items).length === planned) {
            return (
              <ScheduleActionItem
                onNewScheduleItem={onNewScheduleItem}
                type={'closed'}
                width={65}
              />
            );
          } else if (Object.keys(items).length > 0) {
            return (
              <ScheduleActionItem
                onNewScheduleItem={onNewScheduleItem}
                type={'default'}
                width={65}
              />
            );
          }
        });
      case 'day':
        return new Array(planned).fill(0).map((item, index) => {
          if (items[index]) {
            return (
              <ScheduleActionItem
                key={index}
                width={itemWidth}
                onNewScheduleItem={onNewScheduleItem}
                type={'closed'}
                info={{
                  ...(items[index] as { name: string; clientId: number }),
                }}
              />
            );
          } else {
            return (
              <ScheduleActionItem
                key={index}
                width={itemWidth}
                onNewScheduleItem={onNewScheduleItem}
                onClick={onNewScheduleItem}
                type={'default'}
              />
            );
          }
        });
    }
  }, [items, planned, mode]);

  return <Row className={'schedule-action-row'}>{rowContent}</Row>;
};

export default ScheduleActionsRow;
