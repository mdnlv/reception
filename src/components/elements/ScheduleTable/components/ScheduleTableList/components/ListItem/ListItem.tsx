import React, { useCallback } from 'react';
import { Col, Row } from 'antd';
import ScheduleActionsRow from '../../../ScheduleActionsRow/ScheduleActionsRow';
import { ActionItems, ScheduleTableModeType } from '../../../../ScheduleTable';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

interface ItemProps {
  id: number;
  name: string;
  planned: number;
  items: ActionItems;
  onNewScheduleItem(): void;
  toggle: boolean;
  onToggle(id: number): void;
  mode: ScheduleTableModeType;
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
          <ScheduleActionsRow
            mode={mode}
            onNewScheduleItem={onNewScheduleItem}
            planned={planned}
            items={items}
          />
        </Col>
      )}
    </Row>
  );
};

export default ListItem;
