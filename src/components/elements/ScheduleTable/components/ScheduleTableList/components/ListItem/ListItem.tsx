import React, { useCallback } from 'react';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';

import {ItemProps} from "./types";

import ScheduleActionsRow from '../../../ScheduleActionsRow/ScheduleActionsRow';
import ScheduleScrollContainer from '../../../ScheduleScrollContainer/ScheduleScrollContainer';

const ListItem: React.FC<ItemProps> = ({
  onToggle,
  toggle,
  items,
  onNewScheduleItem,
  name,
  planned,
  id,
  mode,
  rangeWeekNum,
}) => {
  const onToggleHandler = useCallback(() => {
    onToggle(id);
  }, [onToggle]);

  return (
    <Row className={'schedule-list__item'}>
      <Col span={4}>
        <div className="item-title">
          <div onClick={onToggleHandler} className="item-title__toggle">
            {!toggle ? <PlusSquareOutlined /> : <MinusSquareOutlined />}
          </div>
          <span className={'item-title__name'}>{name}</span>
        </div>
      </Col>
      {toggle && (
        <Col span={20}>
          <ScheduleScrollContainer left={0}>
            <ScheduleActionsRow
              mode={mode}
              rangeWeekNum={rangeWeekNum}
              onNewScheduleItem={onNewScheduleItem}
              planned={planned}
              items={items}
            />
          </ScheduleScrollContainer>
        </Col>
      )}
    </Row>
  );
};

export default ListItem;
