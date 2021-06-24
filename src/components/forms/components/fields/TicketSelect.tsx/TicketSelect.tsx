import React, {useMemo} from 'react';
import {useField} from 'formik';
import moment from 'moment';
import './styles.scss'

const TicketSelect: React.FC<any> = (props) => {
  const [fieldIdx, metaIdx, formIdx] = useField<any>('idx');
  const [fieldAi, metaAi, formAi] = useField<any>('action_id');
  const [fieldT, metaT, formT] = useField<any>('time');
  
  const onTicketClick = (item: any) =>{ 
    if(item.status == "free") {
      formIdx.setValue(item.idx);
      formAi.setValue(props.schedule[props.org][props.person_id].schedule[moment(props.date).format('YYYY-MM-DD')][0].action_id);
      formT.setValue(item.begDateTime.slice(0,-3) + '-' + item.endDateTime.slice(0,-3));
    }
  };

  const tickets = useMemo(() => 
  props.schedule && 
  props.schedule[props.org] && 
  props.schedule[props.org][props.person_id] &&
  props.schedule[props.org][props.person_id].schedule[moment(props.date).format('YYYY-MM-DD')] ?
  props.schedule[props.org][props.person_id].schedule[moment(props.date).format('YYYY-MM-DD')][0].tickets
  .map((item: any, index: number) => {
    let c = '';
    if(fieldAi.value > -1 && fieldIdx.value > -1 && item.idx == fieldIdx.value && props.schedule[props.org][props.person_id].schedule[moment(props.date).format('YYYY-MM-DD')][0].action_id == fieldAi.value)   
      c = '__active' ;
    else if(!item.client) c = '__free';
    return(<div key={index} className={'ticket' + c} onClick={()=>{onTicketClick(item)}}>{item.begDateTime && item.begDateTime.slice(0,-3)}</div>)
  }) : 'нет данных о номерках', [fieldAi, fieldIdx]);

  return <div id='tickets'>
    {!props.isLoading ?
    <div className='tickets'>
      {tickets}
    </div> : <>загрузка...</>}
  </div>
};

export default TicketSelect;
