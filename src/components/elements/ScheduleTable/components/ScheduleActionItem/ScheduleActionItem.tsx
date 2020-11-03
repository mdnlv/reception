import React, { useCallback, useMemo } from 'react';
import './styles.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import Popover from 'antd/lib/popover';
import Descriptions from 'antd/lib/descriptions';

interface ItemProps {
  type: 'default' | 'closed' | 'empty';
  onClick?(): void;
  info?: {
    clientId: number;
    name: string;
  };
  onNewScheduleItem(): void;
  width: number;
}

const ScheduleActionItem: React.FC<ItemProps> = ({
  onClick,
  type,
  info,
  width,
}) => {
  const onClosedClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const getTypeAction = useMemo(() => {
    const widthStyle = {
      width: `${width}px`,
    };

    switch (type) {
      case 'empty':
        return (
          <div
            style={{ ...widthStyle }}
            className={'schedule-action-item'}></div>
        );
      case 'default':
        return (
          <div
            style={{ ...widthStyle }}
            onClick={onClosedClick}
            className={'schedule-action-item'}>
            <PlusCircleOutlined />
          </div>
        );
      case 'closed':
        if (info) {
          return (
            <Popover
              placement={'bottom'}
              content={
                <Descriptions column={2} className={'action-description'}>
                  <Descriptions.Item label={'Имя'}>
                    {info.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Услуги'}>test</Descriptions.Item>
                  <Descriptions.Item label={'Доп инфо'}>
                    asdas
                  </Descriptions.Item>
                </Descriptions>
              }>
              <div
                style={{ backgroundColor: '#FFBC7D', ...widthStyle }}
                className={'schedule-action-item'}></div>
            </Popover>
          );
        } else {
          return (
            <div
              style={{ backgroundColor: '#FFBC7D' }}
              className={'schedule-action-item'}></div>
          );
        }
    }
  }, [width, type]);

  return <>{getTypeAction}</>;
};

export default ScheduleActionItem;
