import React, { FC, useEffect } from 'react';
import PassportGeneralForm from '../../../../forms/PasssportGeneralForm/PassportGeneralForm';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { fetchKladr } from '../../../../../store/registrationCard/actions';

const PassportGeneralPage: FC = (props) => {
  const dispatch = useDispatch();

  //fetch top-level kladr
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
