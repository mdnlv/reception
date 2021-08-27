import React, {useMemo} from 'react';
import { CloseOutlined } from '@ant-design/icons/lib';
import { Button, Card, Input, Row } from 'antd/lib';

import './style.scss';
import {SearchHeaderProps} from "./types";

const TableSearchHeader: React.FC<SearchHeaderProps> = ({
  title,
  onSearchButtonClick,
  onSubmitForm,
  onClearSearch,
  searchCount,
  children,
  searchQuery,
  onSearchQuery
}) => {
  const submitQuery = () => {
    if (onSearchButtonClick) {
      onSearchButtonClick(searchQuery ? searchQuery.trim() : '');
    }
  }

  const submitQueryOnPress = (event: React.KeyboardEvent) => {
    event.key === 'Enter' && onSearchButtonClick && onSearchButtonClick(searchQuery ? searchQuery.trim() : '');
  }

  const tableBody = useMemo(() => {
    if (children) {
      return children;
    } else {
      return null;
    }
  }, [onSubmitForm, children]);

  const getHeaderByType = useMemo(() => (
    <>
      <div className={'table-top__logo'}>
        {title ? title : null}
      </div>
      <div className={'table__top-search-wrapper'}>
        <Input
          placeholder="Поиск"
          type={'small'}
          value={searchQuery}
          onChange={(e) => {
            onSearchQuery && onSearchQuery(e.target.value);
          }}
          onKeyPress={submitQueryOnPress}
        />
        <Button onClick={submitQuery} size="small">
          Поиск
        </Button>
      </div>
      {searchCount !== undefined ? (
        <div className={'table__top-search-results'}>
          {`Найдено: (${searchCount})`}
          <Button
            type={'primary'}
            shape={'circle'}
            icon={<CloseOutlined />}
            onClick={() => {
              if (onClearSearch) {
                onClearSearch();
              }
            }}
            size={'small'}
          />
        </div>
      ) : null}
    </>
  ), [
    searchCount,
    onClearSearch,
    searchQuery,
  ]);

  return (
    <div>
      <Row align={'stretch'}>{getHeaderByType}</Row>
      <div>{tableBody}</div>
    </div>
  );
};

export default TableSearchHeader;
