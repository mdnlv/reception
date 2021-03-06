import React, { useEffect, useMemo, useState } from 'react';
import { CloseOutlined, SlidersOutlined } from '@ant-design/icons/lib';
import { Button, Card, Input, Row } from 'antd/lib';
import {useDispatch} from "react-redux";

import './style.scss';
import {SearchHeaderProps} from "./types";

import PatientSearchFilterForm from '../../../forms/PatientSearchFilterForm/PatientSearchFilterForm';

const TableSearchHeader: React.FC<SearchHeaderProps> = ({
  onOpenSearch,
  title,
  onCloseClick,
  onSearchButtonClick,
  onTableModeChange,
  mode,
  onSubmitForm,
  onClearSearch,
  searchCount,
  children,
  searchQuery,
  onSearchQuery
}) => {
  const dispatch = useDispatch();
  const [showSearchForm, setShowForm] = useState(false);

  useEffect(() => {
    if (onOpenSearch) {
      onOpenSearch();
    }
  }, [showSearchForm]);

  const submitQuery = () => {
    if (onSearchButtonClick) {
      onSearchButtonClick(searchQuery ? searchQuery.trim() : '');
    }
  }

  const submitQueryOnPress = (event: React.KeyboardEvent) => {
    event.key === 'Enter' && onSearchButtonClick && onSearchButtonClick(searchQuery ? searchQuery.trim() : '');
  }

  const tableBody = useMemo(() => {
    if (mode === 'search') {
      return (
        <Card>
          <PatientSearchFilterForm
            onClose={onCloseClick}
            onSubmit={onSubmitForm}
          />
        </Card>
      );
    } else if (children) {
      return children;
    } else {
      return null;
    }
  }, [mode, onCloseClick, onSubmitForm, children]);

  const getHeaderByType = useMemo(() => {
    switch (mode) {
      case 'search':
        return (
          <div className={'table-top__logo table-top__search'}>
            Расширенный поиск
            <div
              onClick={() => {
                onTableModeChange('default');
              }}
              className="find-filters__wrapper">
              <CloseOutlined />
            </div>
          </div>
        );
      case 'default':
        return (
          <>
            <div className={'table-top__logo'}>
              {title ? title : null}
              <div className="find-filters__wrapper">
                <SlidersOutlined
                  onClick={() => {
                    onTableModeChange('search');
                  }}
                />
              </div>
            </div>
            <div className={'table__top-search-wrapper'}>
              <Input
                placeholder="Поиск"
                type={'small'}
                value={searchQuery}
                onChange={(e) => {
                  onSearchQuery && dispatch(onSearchQuery(e.target.value));
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
        );
    }
  }, [
    mode,
    searchCount,
    onClearSearch,
    onTableModeChange,
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
