import React, { useCallback, useMemo } from 'react';
import { LockOutlined } from '@ant-design/icons';
import Popover from 'antd/lib/popover';
import Descriptions from 'antd/lib/descriptions';

import './styles.scss';
import {ItemProps} from "./types";

const ScheduleActionItem: React.FC<ItemProps> = ({
  info,
  tickets,
  width,
  mode,
  onModeChange,
  onDateChange,
  date
}) => { 
 /* const onClosedClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
*/

  const onWeekClick = useCallback(()=>{
    date? onDateChange(date) : onDateChange();
    onModeChange('day')
  },[])

  const getTypeAction = useMemo(() => {
    const widthStyle = {
      flex: `${width}`
    };

    if(mode=='day') { 
        if(!tickets) {
          return (
            <div
              style={{ backgroundColor: '#ddd',  ...widthStyle }}
              className={'schedule-action-item'}>
            </div>
          );
        } else if(tickets.client == null) {
          return (
            <Popover
            placement={'bottom'}
            content={
              <Descriptions column={1} className={'action-description'}>
                <Descriptions.Item label={'Время'}>
                {`${tickets.begDateTime.slice(0,-3)} - ${tickets.endDateTime.slice(0,-3)}`}
                </Descriptions.Item>
              </Descriptions>
            }>
              <div
                style={{ backgroundColor: '#7fd3fd', cursor: 'pointer', ...widthStyle }}
                className={'schedule-action-item'}
              ></div>
            </Popover>
          );
        } else if(tickets.client != null) {
          return (
            <Popover
            placement={'bottom'}
            content={
              <Descriptions column={1} className={'action-description'}>
                <Descriptions.Item label={'Время '}>
                {`${tickets.begDateTime.slice(0,-3)} - ${tickets.endDateTime.slice(0,-3)}`}
                </Descriptions.Item>
                <Descriptions.Item label={'Записан'}>
                  {tickets.client.lastName + ' ' + tickets.client.firstName[0] + '.' + tickets.client.patrName[0] + '.'}
                </Descriptions.Item>
              </Descriptions>
            }>
              <div
                style={{ backgroundColor: '#FFBC7D', cursor: 'pointer', ...widthStyle }}
                className={'schedule-action-item'}>
              </div>
            </Popover>
          );
        }
      } else if (mode=='week') { 
        if(!info) {
          return (
            <div
              style={{ backgroundColor: '#ddd',  ...widthStyle }}
              className={'schedule-action-item'}>
            </div>
          );
        } else if(info.roa) {
          return (
            <div
              style={{ ...widthStyle }}
              className={'schedule-action-item'}>
              <LockOutlined />
            </div>
          );
        } else if(info.busy) {
          return (
            <div
              style={{ backgroundColor: '#FFBC7D', cursor: 'pointer', ...widthStyle }}
              className={'schedule-action-item'}
              onClick={onWeekClick}
            ></div>
          );
        } else if(!info.busy) {
          return (
            <div
              style={{ backgroundColor: '#7fd3fd', cursor: 'pointer', ...widthStyle }}
              className={'schedule-action-item'}
              onClick={onWeekClick}
            ></div>
          );
        }
    }

  }, [width]);

  return <>{getTypeAction}</>;
};

export default ScheduleActionItem;
