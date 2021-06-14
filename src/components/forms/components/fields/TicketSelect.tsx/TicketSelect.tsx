import React from 'react';
import {useField, useFormikContext} from 'formik';
import moment from 'moment';
import {TicketSelectProps} from "./types";
import './styles.scss';

const TicketSelect: React.FC<any> = (props) => {
  const [field, meta, form] = useField<any>(props.name);
  const { values }  = useFormikContext<{[u: string]: number}>();
  
 /* const onTicketClick = (item) =>{ 
      form.setValue(item)
  };*/
  
  return (
    <div className='tickets'>
      {props.data && props.data.tickets ?  
        props.data.tickets.map((item: any) => {
          let c = '';
          if(item.idx == props.data.data.idx) c = '__active' ;
          else if(!item.client) c = '__free';

          return(<div className={'ticket'+ c} /*onClick={()=>{onTicketClick(item)}}*/>{item.begDateTime.slice(0,-3)}</div>)
        }) 
      :        
        props.schedule && values && props.schedule[values.organisation]  ? props.schedule[values.organisation][values.doctor].schedule[moment(values.date).format('YYYY-MM-DD')][0].tickets.map((item: any) => {
          let c = '';
          if(!item.client) c = '__free';

          return(<div className={'ticket' + c} /*onClick={()=>{onTicketClick(item)}}*/>{item.begDateTime.slice(0,-3)}</div>)
        }): 'нет свободных номерков'
      }
    </div>
  );
};

export default TicketSelect;
