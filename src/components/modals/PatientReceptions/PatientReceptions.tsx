import React, { useMemo, useState } from 'react';
import { Col, Divider, Input, Modal, Row, Tabs } from 'antd';
import _ from 'lodash';
import { isPast } from 'date-fns';

import PersonAppointment from '../../../types/data/PersonAppointment';
import './styles.scss';
import {PatientReceptionsProps} from "./types";

import PatientReceptionCard from '../../cards/PatientReceptionCard/PatientReceptionCard';

const PatientReceptions: React.FC<PatientReceptionsProps> = ({
  onClose,
  isVisible,
  title,
  receptions
}) => {
  const [activeTab, setActiveTab] = useState('all');

  const passedReceptions = useMemo(() => {
    return receptions.filter((item) => isPast(item.date));
  }, [receptions]);

  const futureReceptions = useMemo(() => {
    return receptions.filter((item) => !isPast(item.date));
  }, [receptions]);

  const getReceptionsGrid = useMemo(() => {
    let chunkArr = [] as PersonAppointment[];
    switch (activeTab) {
      case 'past':
        chunkArr = passedReceptions;
        break;
      case 'future':
        chunkArr = futureReceptions;
        break;
      default:
        chunkArr = receptions;
    }
    const chunkReceptions = _.chunk<PersonAppointment>(chunkArr, 2);
    return (
      <div className={'patient-receptions-grid'}>
        {chunkReceptions.map((group, index) => {
          return (
            <>
              <Row key={index} gutter={8}>
                {group[0] && (
                  <Col span={12}>
                    <PatientReceptionCard {...group[0]} />
                  </Col>
                )}
                {group[1] && (
                  <Col span={12}>
                    <PatientReceptionCard {...group[1]} />
                  </Col>
                )}
              </Row>
              <Divider />
            </>
          );
        })}
      </div>
    );
  }, [activeTab, receptions]);

  return (
    <Modal
      width={720}
      className={'patient-receptions-modal'}
      wrapClassName={'app-modal'}
      visible={isVisible}
      title={title}
      footer={null}>
      <Tabs
        centered={true}
        onChange={(key) => {
          console.log(key);
          setActiveTab(key);
        }}>
        <Row>
          <Input />
        </Row>
        <Tabs.TabPane key={'all'} tab={'Все приемы'}>
          {getReceptionsGrid}
        </Tabs.TabPane>
        <Tabs.TabPane key={'past'} tab={'Прошедшие приемы'}>
          {getReceptionsGrid}
        </Tabs.TabPane>
        <Tabs.TabPane key={'future'} tab={'Будущие приемы'}>
          {getReceptionsGrid}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default PatientReceptions;
