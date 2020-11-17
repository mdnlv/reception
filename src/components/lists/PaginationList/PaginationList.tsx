import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { Pagination } from 'antd/lib';

import {ListProps} from "./types";
import './styles.scss';

import { usePaginationList } from '../../../hooks/paginationList';

function PaginationList<T>({len, numberPerPage, data, renderBody}: PropsWithChildren<ListProps<T>>) {
  const { currentPage, setCurrentPage, totalPages } = usePaginationList({
    ...{len, numberPerPage, data, renderBody},
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const listBody = useMemo(() => {
    const startIndex = (currentPage - 1) * numberPerPage;
    let endIndex = startIndex + numberPerPage;
    if (endIndex > len) {
      endIndex = len;
    }
    return data
      .slice(startIndex, endIndex)
      .map((item) => renderBody(item));
  }, [currentPage, data, renderBody]);

  const onPaginationChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      {listBody}
      {totalPages > 1 && (
        <div className="pagination-list__pagination-wrapper">
          <Pagination
            disabled={totalPages <= 1}
            onChange={onPaginationChange}
            current={currentPage}
            pageSize={numberPerPage}
            total={len - 1}
          />
        </div>
      )}
    </>
  );
}

export default PaginationList;
