import React, { useMemo, useState } from 'react';
import Radio from 'antd/lib/radio';
import { CloseOutlined, SlidersOutlined } from '@ant-design/icons/lib';
import { Button, Card, Input, Row, Checkbox } from 'antd/lib';

import './style.scss';
import {SearchHeaderProps} from "./types";
import DoctorSearchFilterForm from '../../../../forms/DoctorSearchFilterForm/DoctorSearchFilterForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../reduxStore/store';
import { fetchPersonTree, postFiltersDoctors } from '../../../../../reduxStore/slices/personTree/personTreeSlice';

const ScheduleSearch: React.FC<SearchHeaderProps> = ({
  title,
  onCloseClick,
  onSearchButtonClick,
  onTableModeChange,
  mode,
  onClearSearch,
  searchCount,
  children,
  person_tree,
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
  const [searchQuery, setSearchQuery] = useState('');
  const { isFiltered } = useSelector((state: RootState) => state.person_tree);

  const submitQuery = () => {
    if (onSearchButtonClick) {
      onSearchButtonClick(searchQuery.trim());
    }
  }

  const submitQueryOnPress = (event: React.KeyboardEvent) => {
    event.key === 'Enter' && onSearchButtonClick && onSearchButtonClick(searchQuery.trim());
  }

  const onChangePersonTree = (e: any) => {
    if(isFiltered) {
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
                  setSearchQuery(e.target.value);
                }}
                onKeyPress={submitQueryOnPress}
              />
              <Button onClick={submitQuery} size="small">
                Поиск
              </Button>
            </div>
            {searchCount !== undefined && isFiltered? (
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
    person_tree
  ]);

  return (
    <div>
      <Row align={'stretch'}>
        {getHeaderByType}    
        {isFiltered && <Checkbox checked={showEmpty} onChange={()=>{setShowEmpty(!showEmpty)}}>показать врачей без расписания</Checkbox>}  
        <Radio.Group name='Группировать:' style={{marginLeft: 5}} value={groupBy} onChange={onChangePersonTree}>
          <Radio value={'orgStructure_id'}>по отделениям</Radio>
          <Radio value={'speciality_id'}>по специальностям</Radio>
        </Radio.Group>
      </Row>
      <div>{tableBody}</div>
    </div>
  );
};

export default ScheduleSearch;