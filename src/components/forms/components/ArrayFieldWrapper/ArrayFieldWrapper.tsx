import React, { useCallback } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

import {WrapperProps} from "./types";

function ArrayFieldWrapper<T>({
  onAddItem,
  showActions,
  values,
  renderChild,
}: WrapperProps<T>) {
  const onAddHandler = useCallback(() => {
    if (onAddItem) onAddItem();
  }, [onAddItem]);

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
        </Space>
      )}
      {renderFunc()}
    </div>
  );
}

export default ArrayFieldWrapper;
