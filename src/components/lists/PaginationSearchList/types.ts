import React from "react";

export interface ListProps<T> {
  data?: T[];
  renderItem?(item: T): React.ReactNode;
  perPage?: number;
}
