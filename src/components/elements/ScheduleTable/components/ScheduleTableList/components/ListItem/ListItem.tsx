import React, { useCallback } from 'react';
import ScheduleActionsRow from '../../../ScheduleActionsRow/ScheduleActionsRow';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import ScheduleScrollContainer from '../../../ScheduleScrollContainer/ScheduleScrollContainer';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { ActionItems, ScheduleTableModeType } from '../../../../types';

interface ItemProps {
  id: number;
  name: string;
  planned: number;
  items: ActionItems;
  onNewScheduleItem(): void;
  toggle: boolean;
  onToggle(id: number): void;
  mode: ScheduleTableModeType;
  rangeWeekNum: number;
}

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
          <ScheduleScrollContainer>
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
