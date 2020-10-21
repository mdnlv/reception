import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { usePaginationList } from '../../../hooks/paginationList';
import { Pagination } from 'antd';
import './styles.scss';

interface ListProps<T> {
  len: number;
  numberPerPage: number;
  data: T[];
  renderBody: (item: T) => React.ReactNode;
}

function PaginationList<T>(props: PropsWithChildren<ListProps<T>>) {
  const { currentPage, setCurrentPage, totalPages } = usePaginationList({
    ...props,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [props.data]);

  const listBody = useMemo(() => {
    const startIndex = (currentPage - 1) * props.numberPerPage;
    let endIndex = startIndex + props.numberPerPage;
    if (endIndex > props.len) {
      endIndex = props.len;
    }
    return props.data
      .slice(startIndex, endIndex)
      .map((item) => props.renderBody(item));
  }, [currentPage, props.data, props.renderBody]);

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
            pageSize={props.numberPerPage}
            total={props.len - 1}
          />
        </div>
      )}
    </>
  );
}

export default PaginationList;
