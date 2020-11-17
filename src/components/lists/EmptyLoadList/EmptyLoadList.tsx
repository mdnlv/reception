import { List, Skeleton } from 'antd/lib';
import React from 'react';

import {ListProps} from "./types";

const EmptyLoadList: React.FC<ListProps> = ({nums}) => {
  return (
    <List
      dataSource={nums}
      itemLayout={'horizontal'}
      renderItem={(_) => (
        <List.Item>
          <Skeleton />
        </List.Item>
      )}></List>
  );
};

EmptyLoadList.defaultProps = {
  nums: [0, 1, 2],
};

export default EmptyLoadList;
