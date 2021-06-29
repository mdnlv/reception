import React, { useCallback, useMemo } from 'react';
import { LockOutlined } from '@ant-design/icons';
import Popover from 'antd/lib/popover';
import Descriptions from 'antd/lib/descriptions';
import moment from "moment"
import './styles.scss';
import {ItemProps} from "./types";
import { ActionPost } from "../../types"
import {RootState} from "../../../../../reduxStore/store";
import {useSelector} from "react-redux";

const ScheduleActionItem: React.FC<ItemProps> = ({
  info,
  ticket,
  width,
  mode,
  onModeChange,
  setDay,
  date,
  showModal,
  person,
  orgId
}) => {
  const postLoading = useSelector((state: RootState) => state.schedule.postLoading);
  const onDayClick = (data: ActionPost)=>{
    showModal && showModal(  {
      date: date? moment(date).format("DD.MM.YYYY") : '',
      time: ticket && ticket.begDateTime ? ticket.begDateTime.slice(0,-3): '',
      client: (ticket?.client && ticket.client.id)? ticket.client.lastName + ' ' + ticket.client.firstName[0] + '.' + ticket.client.patrName[0] + '.': '',
      person: person? person.fullName : '',
      speciality:  person? person.speciality : '',
      type: "1",
      data: data,
      org: orgId? orgId : -1,
      tickets: info && info.tickets ? info.tickets: []
    })
  }

  const onWeekClick = useCallback(()=>{
    setDay(date);
    onModeChange('day')
  },[])

  const getTypeAction = useMemo(() => {
    const widthStyle = {
      flex: `${width}`
    };

    if(mode=='day' && showModal && orgId) {
        if(!ticket) {
          return (
            <div
              style={{ backgroundColor: '#ddd',  ...widthStyle }}
              className={'schedule-action-item'}>
            </div>
          );
        } else if(ticket.client == null) {
          return (
            <Popover
            placement={'bottom'}
            content={
              <Descriptions column={1} className={'action-description'}>
                <Descriptions.Item label={'Время'}>
                {ticket.begDateTime && `${ticket.begDateTime.slice(0,-3)} - ${ticket.endDateTime.slice(0,-3)}`}
                </Descriptions.Item>
              </Descriptions>
            }>
              <div
                style={{ backgroundColor: '#7fd3fd', cursor: 'pointer', ...widthStyle }}
                className={'schedule-action-item'}
                onClick={()=>{onDayClick({
                  action_id: info? info.action_id : 0, 
                  idx:  ticket.idx, 
                  client_id: (ticket.client && ticket.client.id)? ticket.client.id : -1, 
                  person_id:  person? person.id : 0, 
                  user_id: 614, 
                  index: ticket? ticket.index: '',
                  old_action_id: 0,
                  old_idx: 0,
                  type: 'new'
                })}}
              ></div>
            </Popover>
          );
        } else if(ticket.client != null) {
          return (
            <Popover
            placement={'bottom'}
            content={
              <Descriptions column={1} className={'action-description'}>
                <Descriptions.Item label={'Время '}>
                {ticket.begDateTime && `${ticket.begDateTime.slice(0,-3)} - ${ticket.endDateTime.slice(0,-3)}`}
                </Descriptions.Item>
                <Descriptions.Item label={'Записан'}>
                  {ticket.client.lastName + ' ' + ticket.client.firstName[0] + '.' + ticket.client.patrName[0] + '.'}
                </Descriptions.Item>
              </Descriptions>
            }>
              <div
                style={{ backgroundColor: '#FFBC7D', cursor: 'pointer', ...widthStyle }}
                className={'schedule-action-item'}
                onClick={()=>{onDayClick({
                  action_id: info? info.action_id : 0, 
                  idx:  ticket.idx, 
                  client_id: (ticket.client && ticket.client.id)? ticket.client.id : -1, 
                  person_id:  person? person.id : 0, 
                  user_id: 614, 
                  index: ticket? ticket.index: '',
                  old_action_id: 0,
                  old_idx: 0,
                  type: 'new'
                })}}
              >                
              </div>
            </Popover>
          );
        }
      } else if (mode=='week') {
        if(!info /*|| moment(date).isBefore(new Date())*/) {
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
  }, [width, ticket, info]);
  
  return <>{postLoading ? '' : getTypeAction}</>;
};

export default ScheduleActionItem;
