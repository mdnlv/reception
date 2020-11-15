import React, { useCallback } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

import {WrapperProps} from "./types";

const ArrayFieldWrapper = ({
  onAddItem,
  onRemoveItem,
  showActions,
  values,
  renderChild,
}: WrapperProps) => {
  const onAddHandler = useCallback(() => {
    if (onAddItem) onAddItem();
  }, [onAddItem]);

  const onRemoveHandler = useCallback(() => {
    if (onRemoveItem) onRemoveItem();
  }, [onRemoveItem]);

  const renderFunc = useCallback(() => {
    if (Array.isArray(values)) {
      return values?.map((item, index) => renderChild(item, index));
    }
  }, [values]);

  return (
    <div>
      {showActions && (
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
              disabled={values.length <= 0}
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
