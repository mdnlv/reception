import React from 'react';
import { Select } from 'antd';

export interface ListItem {
  id: string | number;
  name: string;
}

export default function <T extends ListItem>(
  list: T[],
  renderFunc?: (item: T, index: number) => React.ReactNode,
) {
  if (renderFunc) {
    return list.map(renderFunc);
  } else {
    return list.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }
}
