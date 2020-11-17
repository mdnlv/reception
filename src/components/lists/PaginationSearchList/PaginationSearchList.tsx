import React, { PropsWithChildren, useMemo } from 'react';
import { Col, Input, Pagination, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { usePaginationList } from '../../../hooks/paginationList';
import { chunk } from 'lodash';
import './styles.scss';
import {ListProps} from "./types";

function PaginationSearchList<T>({data, perPage, renderItem}: PropsWithChildren<ListProps<T>>) {
  const numberPerPage = perPage ? perPage : 42;
  const { currentPage, totalPages, setCurrentPage } = usePaginationList({
    len: data?.length || 0,
    numberPerPage,
  });

  const listBody = useMemo(() => {
    const bodyRows = [];
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const groupedArr = chunk(data?.slice(startIndex, endIndex), 6);
    for (let i = 0; i < groupedArr.length; i++) {
      const colArr = groupedArr[i].map((item, index) => {
        if (renderItem) {
          return (
            <Col key={index} span={4}>
              {renderItem(item)}
            </Col>
          );
        }
      });
      if (colArr) {
        bodyRows.push(
          <Row key={i} className={'list-content__row'} gutter={8}>
            {colArr}
          </Row>,
        );
      }
    }
    return bodyRows;
  }, [data, renderItem, currentPage, numberPerPage]);

  return (
    <div className={'pagination-search-list'}>
      <Row className={'pagination-search-list__search-header'}>
        <Col span={4}>
          <Input size="small" placeholder="Поиск" prefix={<SearchOutlined />} />
        </Col>
      </Row>
      <Row className={'pagination-search-list__content list-content'}>
        {listBody}
      </Row>
      <Row justify={'center'}>
        <Col>
          <Pagination
            disabled={totalPages <= 1}
            onChange={(page, size) => {
              setCurrentPage(page);
            }}
            defaultCurrent={currentPage}
            pageSize={numberPerPage}
            total={data?.length}
          />
        </Col>
      </Row>
    </div>
  );
}

export default PaginationSearchList;
