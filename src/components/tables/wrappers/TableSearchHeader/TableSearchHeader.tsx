import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CloseOutlined, SlidersOutlined } from '@ant-design/icons/lib';
import './style.scss';
import { Button, Card, Input, Row } from 'antd';
import PatientSearchFilterForm from '../../../forms/PatientSearchFilterForm/PatientSearchFilterForm';

type SearchHeaderProps = {
  onOpenSearch?(): void;
  title?: string;
  onCloseClick?(): void;
  onSearchButtonClick?(query: string): void;
  onTableModeChange(mode: 'default' | 'search'): void;
  mode: string;
  onSubmitForm?(): void;
  onClearSearch?(): void;
  searchCount?: number;
  className?: string;
};

const TableSearchHeader: React.FC<SearchHeaderProps> = (props) => {
  const [showSearchForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (props.onOpenSearch) {
      props.onOpenSearch();
    }
  }, [showSearchForm]);

  function submitQuery() {
    if (props.onSearchButtonClick) {
      props.onSearchButtonClick(searchQuery);
    }
  }

  const renderTableBody = useCallback(() => {
    if (props.mode === 'search') {
      return (
        <Card>
          <PatientSearchFilterForm
            onClose={props.onCloseClick}
            onSubmit={props.onSubmitForm}
          />
        </Card>
      );
    } else if (props.children) {
      return props.children;
    } else {
      return null;
    }
  }, [props.mode, props.onCloseClick, props.onSubmitForm, props.children]);

  const getHeaderByType = useMemo(() => {
    switch (props.mode) {
      case 'search':
        return (
          <div className={'table-top__logo table-top__search'}>
            Расширенный поиск
            <div
              onClick={() => {
                props.onTableModeChange('default');
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
              {props.title ? props.title : null}
              <div className="find-filters__wrapper">
                <SlidersOutlined
                  onClick={() => {
                    props.onTableModeChange('search');
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
                  setSearchQuery(e.target.value);
                }}
              />
              <Button onClick={submitQuery} size="small">
                Поиск
              </Button>
            </div>
            {props.searchCount !== undefined ? (
              <div className={'table__top-search-results'}>
                {`Найдено: (${props.searchCount})`}
                <Button
                  type={'primary'}
                  shape={'circle'}
                  icon={<CloseOutlined />}
                  onClick={() => {
                    if (props.onClearSearch) {
                      props.onClearSearch();
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
    props.mode,
    props.searchCount,
    props.onClearSearch,
    props.onTableModeChange,
    searchQuery,
  ]);

  return (
    <div>
      <Row align={'stretch'}>{getHeaderByType}</Row>
      <div>{renderTableBody()}</div>
    </div>
  );
};

export default TableSearchHeader;
