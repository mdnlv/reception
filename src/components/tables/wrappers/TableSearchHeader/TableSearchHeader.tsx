import React, { useCallback, useEffect, useState } from 'react';
import { CloseOutlined, SlidersOutlined } from '@ant-design/icons/lib';
import './style.scss';
import { Button, Card, Input, Row } from 'antd';
import PatientSearchFilterForm from '../../../forms/PatientSearchFilterForm/PatientSearchFilterForm';
import { useSpring, animated, useTransition } from 'react-spring';

type SearchHeaderProps = {
  onChangeQuery(query: string): void;
  onOpenSearch?(): void;
  type?: 'default' | 'filter';
  title?: string;
  onCloseClick?(): void;
  onSearchButtonClick?(query: string): void;
  className?: string;
};

const TableSearchHeader: React.FC<SearchHeaderProps> = (props) => {
  const [showSearchForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const animationProps = useTransition(props.type, null, {
    from: {
      height: '100%',
      opacity: 0,
    },
    enter: {
      height: '0',
      opacity: 1,
    },
    leave: {
      height: '100%',
      opacity: 0,
    },
  });

  useEffect(() => {
    if (props.onOpenSearch) {
      props.onOpenSearch();
    }
  }, [showSearchForm]);

  const submitQuery = useCallback(() => {
    if (props.onSearchButtonClick) {
      props.onSearchButtonClick(query);
    }
  }, [query]);

  const renderTableBody = () => {
    if (showSearchForm) {
      return animationProps.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <Card>
                <PatientSearchFilterForm />
              </Card>
            </animated.div>
          ),
      );
    } else if (props.children) {
      return props.children;
    } else {
      return null;
    }
  };

  const getHeaderByType = () => {
    switch (props.type) {
      case 'filter':
        return renderSearchHeader();
      case 'default':
        return renderDefaultHeader();
    }
  };

  const renderDefaultHeader = () => {
    return (
      <>
        <div
          className={`table-top__logo table-top__search ${
            props.className ? props.className : ''
          }`}>
          {props.title ? props.title : null}
          <div
            className="find-filters__wrapper"
            onClick={() => {
              if (props.onCloseClick) {
                props.onCloseClick();
              }
            }}>
            <CloseOutlined />
          </div>
        </div>
        <div className={'table__top-search-wrapper'}>
          <Input
            placeholder="Поиск"
            type={'small'}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
      </>
    );
  };

  const renderSearchHeader = () => {
    if (showSearchForm) {
      return (
        <div className={'table-top__logo table-top__search'}>
          Расширенный поиск
          <div
            onClick={() => {
              setShowForm(!showSearchForm);
            }}
            className="find-filters__wrapper">
            <CloseOutlined />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className={'table-top__logo'}>
            {props.title ? props.title : null}
            <div className="find-filters__wrapper">
              <SlidersOutlined
                onClick={() => {
                  setShowForm(!showSearchForm);
                }}
              />
            </div>
          </div>
          <div className={'table__top-search-wrapper'}>
            <Input
              placeholder="Поиск"
              type={'small'}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Button onClick={submitQuery} size="small">
              Поиск
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <Row align={'stretch'}>{getHeaderByType()}</Row>
      <div>{renderTableBody()}</div>
    </div>
  );
};

TableSearchHeader.defaultProps = {
  type: 'default',
};

export default TableSearchHeader;
