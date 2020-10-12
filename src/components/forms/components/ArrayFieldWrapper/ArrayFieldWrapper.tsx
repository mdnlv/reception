import React, { useCallback } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

interface WrapperProps<T> {
  name: string;
  values: T[];
  renderChild: (item: T, index: number) => React.ReactNode;
  onAddItem(): void;
  onRemoveItem(): void;
  showActions?: boolean;
}

function ArrayFieldWrapper<T>(props: WrapperProps<T>) {
  const onAddHandler = useCallback(() => {
    props.onAddItem();
  }, [props.onAddItem]);

  const onRemoveHandler = useCallback(() => {
    props.onRemoveItem();
  }, [props.onRemoveItem]);

  const renderFunc = useCallback(() => {
    if (Array.isArray(props.values)) {
      return props.values?.map((item, index) => props.renderChild(item, index));
    }
  }, [props.values]);
  return (
    <div>
      {props.showActions && (
        <Space>
          <Tooltip title={'Добавить'}>
            <Button
              type={'link'}
              size={'small'}
              shape="circle"
              onClick={onAddHandler}
              icon={<PlusCircleTwoTone className={'fields-btn__icon'} />}
              className={'full-icon'}
            />
          </Tooltip>
          <Tooltip title={'Удалить'}>
            <Button
              type={'link'}
              size={'small'}
              disabled={props.values.length <= 0}
              shape="circle"
              onClick={onRemoveHandler}
              icon={<MinusCircleTwoTone className={'fields-btn__icon'} />}
            />
          </Tooltip>
        </Space>
      )}
      {renderFunc()}
    </div>
  );
}

export default ArrayFieldWrapper;
