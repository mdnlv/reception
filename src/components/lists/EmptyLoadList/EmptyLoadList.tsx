import { List, Skeleton } from 'antd';
import React from 'react';

interface ListProps {
  nums?: number[];
}

const EmptyLoadList: React.FC<ListProps> = (props) => {
  return (
    <List
      dataSource={props.nums}
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
