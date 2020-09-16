import React, { useMemo } from 'react';
import PersonAppointment from '../../../../../../types/data/PersonAppointment';
import './styles.scss';
import PatientReceptionCard from '../../../../PatientReceptionCard/PatientReceptionCard';
import PaginationList from '../../../../../lists/PaginationList/PaginationList';

type PaneProps = {
  appointmentsList?: PersonAppointment[];
};

const PersonAppointmentsPane: React.FC<PaneProps> = (props) => {
  const listBody = useMemo(() => {
    if (props.appointmentsList && props.appointmentsList.length > 0) {
      return props.appointmentsList.map((item) => (
        <div key={item.id} className={'person-appointments-list__item'}>
          <PatientReceptionCard {...item} />
        </div>
      ));
    } else {
      return null;
    }
  }, [props.appointmentsList]);

  return (
    <div className={'person-info-tabs__pane'}>
      {props.appointmentsList && (
        <PaginationList
          len={props.appointmentsList?.length}
          numberPerPage={3}
          data={props.appointmentsList}
          renderBody={(item) => (
            <div key={item.id} className={'person-appointments-list__item'}>
              <PatientReceptionCard {...item} />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default PersonAppointmentsPane;
