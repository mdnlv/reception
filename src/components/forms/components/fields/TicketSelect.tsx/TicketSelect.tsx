import React, {useMemo} from 'react';
import {useField} from 'formik';
import moment from 'moment';
import './styles.scss'

const TicketSelect: React.FC<any> = ({
  name,
  schedule,
  date,
  person_id,
  org,
  isLoading,
  setButtonDisabled
}) => {
  const [fieldIdx, metaIdx, formIdx] = useField<any>('idx');
  const [fieldAi, metaAi, formAi] = useField<any>('action_id');
  const [fieldT, metaT, formT] = useField<any>('time');
  
  const onTicketClick = (item: any) =>{ 
    if(item.status == "free") {
      formIdx.setValue(item.idx);
      formAi.setValue(schedule[org][person_id].schedule[moment(date).format('YYYY-MM-DD')][0].action_id);
      formT.setValue(item.begDateTime.slice(0,-3));
    }
  };

  const tickets = useMemo(() => {
    if(schedule && 
      schedule[org] && 
      schedule[org][person_id] &&
      schedule[org][person_id].schedule[moment(date).format('YYYY-MM-DD')] ) 
    {
      return schedule[org][person_id].schedule[moment(date).format('YYYY-MM-DD')][0].tickets
      .map((item: any, index: number) => {
        let c = '';
        if(fieldAi.value > -1 && fieldIdx.value > -1 && item.idx == fieldIdx.value && schedule[org][person_id].schedule[moment(date).format('YYYY-MM-DD')][0].action_id == fieldAi.value)  {
          setButtonDisabled(false);
          c = '__active' ;
        }            
        else if(!item.client) c = '__free';
        return(<div key={index} className={'ticket' + c} onClick={()=>{onTicketClick(item)}}>{item.begDateTime && item.begDateTime.slice(0,-3)}</div>)
      })
    } else {
      setButtonDisabled(true);
      return <div style={{color: "#da7f5e"}}>нет данных о номерках</div>;
    }
  }, [fieldAi, fieldIdx]);

  return <div id='tickets'>
    {!isLoading ?
    <div className='tickets'>
      {tickets}
    </div> : <>загрузка...</>}
  </div>
};

export default TicketSelect;
