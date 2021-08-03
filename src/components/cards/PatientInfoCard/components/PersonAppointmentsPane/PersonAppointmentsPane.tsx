import React, {useCallback, useMemo} from 'react';

import PersonAppointment from '../../../../../types/data/PersonAppointment';
import './styles.scss';
import {PaneProps} from "./types";

import PatientReceptionCard from '../../../PatientReceptionCard/PatientReceptionCard';
import PaginationList from '../../../../lists/PaginationList/PaginationList';
import EmptyLoadList from '../../../../lists/EmptyLoadList/EmptyLoadList';

const PersonAppointmentsPane: React.FC<PaneProps> = ({
  appointmentsList,
  isLoading,
}) => {
  const renderListItem = useCallback((item: PersonAppointment) => {
    return (
      <div key={item.id} className={'person-appointments-list__item'}>
        <PatientReceptionCard {...item} />
      </div>
    );
  }, []);

  const listBody = useMemo(() => {
    if (isLoading) {
      return <EmptyLoadList />;
    } else {
      return (
        <PaginationList
          len={appointmentsList?.length || 0}
          numberPerPage={3}
          data={appointmentsList || []}
          renderBody={renderListItem}
        />
      );
    }
  }, [isLoading, appointmentsList, renderListItem]);

  return (
    <div className={'person-info-tabs__pane'}>
      {appointmentsList && listBody}
    </div>
  );
};

export default PersonAppointmentsPane;
