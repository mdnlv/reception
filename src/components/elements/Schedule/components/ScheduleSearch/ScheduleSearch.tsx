import React, {useMemo, useEffect, useState} from 'react';
import Radio from 'antd/lib/radio';
import { CloseOutlined, SlidersOutlined } from '@ant-design/icons/lib';
import { Button, Card, Input, Row, Checkbox } from 'antd/lib';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import {SearchHeaderProps} from "./types";
import { RootState } from '../../../../../reduxStore/store';
import { fetchPersonTree, postFiltersDoctors, setQuery } from '../../../../../reduxStore/slices/personTree/personTreeSlice';
import {detailedPersonTree} from "../../../../../reduxStore/slices/personTree/selectors";

import DoctorSearchFilterForm from '../../../../forms/DoctorSearchFilterForm/DoctorSearchFilterForm';

const ScheduleSearch: React.FC<SearchHeaderProps> = ({
  title,
  onCloseClick,
  onSearchButtonClick,
  onTableModeChange,
  mode,
  onClearSearch,
  searchCount,
  children,
  setShowEmpty,
  showEmpty,
  groupBy,
  setGroupBy,
  setFilter,
  filter,
  setSelectedPerson,
  setSelected
}) => {
  const dispatch = useDispatch();
  const { isFiltered } = useSelector((state: RootState) => state.person_tree);
  const personTree = useSelector(detailedPersonTree);
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect(() => {
  //   console.log('isFiltered', isFiltered);
  // }, [isFiltered]);

  const submitQuery = () => {
    if (onSearchButtonClick) {
      onSearchButtonClick(searchQuery.trim());
      dispatch(setQuery(searchQuery));
    }
  }

  const submitQueryOnPress = (event: React.KeyboardEvent) => {
    event.key === 'Enter' && onSearchButtonClick && onSearchButtonClick(searchQuery.trim());
  }

  const onChangePersonTree = (e: any) => {
    if (isFiltered) {
      dispatch(postFiltersDoctors(Object.assign(filter, {group_by: e.target.value})))
    } else {
      dispatch(fetchPersonTree({group_by: e.target.value}))
    }
    setGroupBy(e.target.value)
  }

  const tableBody = useMemo(() => {
    if (mode === 'search') {
      return (
        <Card>
          <DoctorSearchFilterForm
            onClose={onCloseClick}
            groupBy={groupBy}
            setFilter={setFilter}
            setSelectedPerson={setSelectedPerson}
            setSelected={setSelected}
          />
        </Card>
      );
    } else if (children) {
      return children;
    } else {
      return null;
    }
  }, [mode, onCloseClick, children]);

  const getHeaderByType = useMemo(() => {
    switch (mode) {
      case 'search':
        return (
          <div className={'table-top__logo table-top__search'}>
            ?????????????????????? ??????????
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
                placeholder="??????????"
                type={'small'}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyPress={submitQueryOnPress}
              />
              <Button onClick={submitQuery} size="small">
                ??????????
              </Button>
            </div>
            {searchCount !== undefined && isFiltered ? (
              <div className={'table__top-search-results'}>
                {`??????????????: (${searchCount})`}
                <Button
                  type={'primary'}
                  shape={'circle'}
                  icon={<CloseOutlined />}
                  onClick={() => {
                    if (onClearSearch) {
                      onClearSearch();
                      setSearchQuery('');
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
    personTree
  ]);

  return (
    <div>
      <Row align={'stretch'}>
        {getHeaderByType}
        {isFiltered && <Checkbox checked={showEmpty} onChange={()=>{setShowEmpty(!showEmpty)}}>???????????????? ???????????? ?????? ????????????????????</Checkbox>}
        <Radio.Group name='????????????????????????:' style={{marginLeft: 5}} value={groupBy} onChange={onChangePersonTree}>
          <Radio value={'orgStructure_id'}>???? ????????????????????</Radio>
          <Radio value={'speciality_id'}>???? ????????????????????????????</Radio>
        </Radio.Group>
      </Row>
      <div>{tableBody}</div>
    </div>
  );
};

export default ScheduleSearch;
