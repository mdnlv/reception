import React, {useMemo} from 'react';
import { Col, Descriptions, Row } from 'antd';

import './styles.scss';
import {ListProps} from "./types";
import DetailedPatientEvent from '../../../../../types/data/DetailedPatientEvent';

import PaginationList from '../../../../lists/PaginationList/PaginationList';
import EmptyLoadList from '../../../../lists/EmptyLoadList/EmptyLoadList';

const PatientHappeningsList: React.FC<ListProps> = ({
  data,
  onSelect,
  selectedItem,
  isLoading
}) => {
  const renderListItem = (item: DetailedPatientEvent) => {
    let getSelectedClass = '';
    if (selectedItem && item.id === selectedItem) {
      getSelectedClass = 'happenings-list__item--selected';
    }

    return (
      <div
        key={item.id}
        onClick={() => {
          if (onSelect) {
            onSelect(item.id);
          }
        }}
        className={`happenings-list__item ${getSelectedClass}`}>
        <Row align={'middle'}>
          <Col
            span={4}
            className={'happenings-list__item-title col--border-right'}>
            <h2>{item.type}</h2>
          </Col>
          <Col span={20} className={'happenings-list__info'}>
            <Row>
              <Col span={18}>
                <Descriptions size={'small'} column={5}>
                  <Descriptions.Item label="назначено">
                    {item.executedDoc}
                  </Descriptions.Item>
                  <Descriptions.Item label="тип">{item.type}</Descriptions.Item>
                  <Descriptions.Item label="состояние">
                    {item.state}
                  </Descriptions.Item>
                  <Descriptions.Item label="назначил">
                    {item.assignDoc}
                  </Descriptions.Item>
                  <Descriptions.Item label="выполнил">
                    {item.executedDoc}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  const listBody = useMemo(() => {
    if (isLoading) {
      return <EmptyLoadList />;
    } else {
      return (
        <PaginationList<DetailedPatientEvent>
          len={data.length}
          numberPerPage={10}
          data={data}
          renderBody={renderListItem}
        />
      );
    }
  }, [isLoading, data]);

  return <div className={'happenings-list'}>{listBody}</div>;
};

export default PatientHappeningsList;
