import React, { useMemo } from 'react';
import PersonAppointment from '../../../../../../types/data/PersonAppointment';
import './styles.scss';
import PatientReceptionCard from '../../../../PatientReceptionCard/PatientReceptionCard';
import PaginationList from '../../../../../lists/PaginationList/PaginationList';
import EmptyLoadList from '../../../../../lists/EmptyLoadList/EmptyLoadList';

type PaneProps = {
  appointmentsList?: PersonAppointment[];
  isLoading?: boolean;
};

const PersonAppointmentsPane: React.FC<PaneProps> = (props) => {
  const listBody = useMemo(() => {
    if (props.isLoading) {
      return <EmptyLoadList />;
    } else {
      return (
        <PaginationList
          len={props.appointmentsList?.length || 0}
          numberPerPage={3}
          data={props.appointmentsList || []}
          renderBody={(item) => (
            <div key={item.id} className={'person-appointments-list__item'}>
              <PatientReceptionCard {...item} />
            </div>
          )}
        />
      );
    }
  }, [props.isLoading, props.appointmentsList]);

  return (
    <div className={'person-info-tabs__pane'}>
      {props.appointmentsList && listBody}
    </div>
  );
};

export default PersonAppointmentsPane;
