import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col} from "antd";

import './styles.scss';
import {fetchKladr} from "../../reduxStore/slices/registrationCard/registrationCardSlice";
import {fetchPersonTreeFull} from "../../reduxStore/slices/personTree/personTreeSlice";
import PatientsSearchTable from '../../components/tables/PatientsSearchTable/PatientsSearchTable';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKladr({}));
  }, []);

  useEffect(() => {
    dispatch(fetchPersonTreeFull({}))
  }, []);

  return (
    <div className={'main-page'}>
      <Row style={{position: "relative"}}>
        <Col span={24} className={'main-page__tables'}>
          <Row>
            <Col span={24}>
              <PatientsSearchTable/>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
