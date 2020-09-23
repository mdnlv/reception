import React, { FC, useEffect } from 'react';
import PassportGeneralForm from '../../../../forms/PasssportGeneralForm/PassportGeneralForm';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { fetchKladr } from '../../../../../store/rb/actions';

const PassportGeneralPage: FC = (props) => {
  const dispatch = useDispatch();

  function getNestedKladr(id: string) {
    dispatch(fetchKladr(id));
  }

  useEffect(() => {
    dispatch(fetchKladr());
  }, []);

  return (
    <div className="passport-general-page card-page">
      <PassportGeneralForm />
    </div>
  );
};

export default PassportGeneralPage;
