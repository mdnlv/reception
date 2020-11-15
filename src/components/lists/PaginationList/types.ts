import React from "react";

export interface ListProps<T> {
  len: number;
  numberPerPage: number;
  data: T[];
  renderBody: (item: T) => React.ReactNode;
}
