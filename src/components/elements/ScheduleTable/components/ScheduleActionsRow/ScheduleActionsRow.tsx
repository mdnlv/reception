import React, { useEffect, useMemo, useState } from 'react';
import { Row } from 'antd';
import { ActionItems, ScheduleTableModeType } from '../../ScheduleTable';
import ScheduleActionItem from '../ScheduleActionItem/ScheduleActionItem';
import './styles.scss';

interface RowProps {
  planned: number;
  items: ActionItems;
  onNewScheduleItem(): void;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
}

const ScheduleActionsRow: React.FC<RowProps> = ({
  items,
  planned,
  onNewScheduleItem,
  mode,
  rangeWeekNum,
}) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
  }>({ width: window.innerWidth });

  const getWidthCoef = useMemo(() => {
    if (dimensions.width >= 1600) {
      return 2.75;
    } else if (dimensions.width > 1200) {
      return 2;
    } else if (dimensions.width > 1000) {
      return 1.5;
    } else {
      return 1.5;
    }
  }, [dimensions.width]);

  const getWeekWidth = useMemo(() => {
    if (dimensions.width >= 1600) {
      return 80;
    } else if (dimensions.width > 1200) {
      return 65;
    } else if (dimensions.width > 1000) {
      return 55;
    } else {
      return 55;
    }
  }, [dimensions.width]);

  const handleResize = () => {
    setDimensions({ width: window.innerWidth });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemWidth = useMemo(() => {
    return Math.floor(480 / planned) * getWidthCoef;
  }, [planned, getWidthCoef]);

  const rowContent = useMemo(() => {
    switch (mode) {
      case 'week':
        return new Array(rangeWeekNum).fill(0).map((item, index) => {
          if (Object.keys(items).length === planned) {
            return (
              <ScheduleActionItem
                onNewScheduleItem={onNewScheduleItem}
                type={'closed'}
                width={getWeekWidth}
              />
            );
          } else if (Object.keys(items).length > 0) {
            return (
              <ScheduleActionItem
                onNewScheduleItem={onNewScheduleItem}
                type={'default'}
                width={getWeekWidth}
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
  }, [items, planned, mode, itemWidth, rangeWeekNum]);

  return <Row className={'schedule-action-row'}>{rowContent}</Row>;
};

export default ScheduleActionsRow;
