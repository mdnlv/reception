import React, {Suspense, useCallback} from 'react';
import {Col, Row, Select, TreeSelect} from 'antd/lib';
import {RootState} from "../../../../../reduxStore/store";
import FormField from '../../../components/FormField/FormField';
import FastSearchSelect from '../../../components/fields/FastSearchSelect/FastSearchSelect';
import TreeSelectField from '../../../components/fields/TreeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { PersonTree } from '../../../../elements/Schedule/types';

const Fields: React.FC<any> = (props) => {
  const dispatch = useDispatch()
  const personTree = useSelector((state:RootState) => state.person_tree.person_tree);
  const specialty = useSelector((state: RootState) => state.deferredCalls.specialty);
  const post =  useSelector((state: RootState) => state.deferredCalls.specialty);
  const doctors = useSelector((state: RootState) => state.deferredCalls.filteredDoctors);

  const getPropsOptionsSpecialty = (props: any) =>
  props.map((item: any) => {
    return (
      <Select.Option key={item.id} name={item.name} value={item.id}>
          {item.name}
      </Select.Option>
    )
  });

  const getPropsOptionsPost = (props: any) => ({
  });

  const renderTreeNodes = (data:PersonTree[]) =>
  data.map((item: PersonTree) => {
    return (
      <TreeSelect.TreeNode  value={item.id} key={item.id}  title={item.name}  {...item}>
        {item.child.length && renderTreeNodes(item.child)}
      </TreeSelect.TreeNode>
    );
  });

  const getPropsOptions = (props: any) =>
    props.map((item: any,index:number) => {
      return (
        <Select.Option key={index} name={item.fullName} value={item.code}>
            {item.fullName}
        </Select.Option>
      )
  });

  const getPropsOptionsDoctors = (props: any) =>
  props.map((item: any, index:number) => {
      return (
          <Select.Option key={index} name={item.fullName} value={item.id}>
              {item.fullName}
          </Select.Option>
      )
  });

  const searchPatients = (query: string) => {
  }

  const clearDoctor = (() => { 
  })

  const clearDoctorsAndSpeciality = () =>{
  }

  const clearSpeciality = () => {
  }

  const onSelectTreeNode = (value:number,tree:PersonTree) =>{
  }
  
  const onSelectSpecialityId  = (id:number) =>{
  }

  const onSelectDoctor  = (id:number) =>{
  }

  return (
    <div className={'form-section'}>
      <Row gutter={8} >
        <Col span={6}>
          <FormField label={'Подразделение:'} name={'organisation'}>
            <TreeSelectField 
              name={'organisation'}
              onClear={clearDoctorsAndSpeciality}
              onSelect={onSelectTreeNode}>
              {renderTreeNodes(personTree)}
            </TreeSelectField>
          </FormField>
        </Col>

          <Col span={6}>
          <FormField label={'Специальность врача:'} name={'speciality'}>
          <Suspense fallback={<div>Загрузка...</div>}>
            <FastSearchSelect
              placeholder={'Специальность'}
              name={'speciality'}
              showSearch
              allowClear
              onClear={clearDoctor}
              onSelect={onSelectSpecialityId}
              filterOption
              optionFilterProp={'name'}
            >
              {getPropsOptionsSpecialty(specialty)}
            </FastSearchSelect>
            </Suspense>
          </FormField>
          </Col>

          <Col span={6}>
          <FormField label={'Должность:'} name={'post'}>
          <Suspense fallback={<div>Загрузка...</div>}>
            <FastSearchSelect
              placeholder={'Должность'}
              name={'post'}
              showSearch
              allowClear
              onClear={clearDoctor}
              onSelect={onSelectSpecialityId}
              filterOption
              optionFilterProp={'name'}
            >
              {getPropsOptionsSpecialty(specialty)}
            </FastSearchSelect>
            </Suspense>
          </FormField>
          </Col>

        <Col span={6}>
          <FormField label={'Врач:'}  name={'person'}>
          <Suspense fallback={<div>Загрузка...</div>}>
            <FastSearchSelect
              placeholder={'Врач'}
              name={'person'}
              showSearch
              allowClear
              onClear={clearSpeciality}
              filterOption
              optionFilterProp={'name'}
              onSelect={onSelectDoctor}
            >
              {getPropsOptionsDoctors(doctors)}
            </FastSearchSelect>
            </Suspense>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default Fields;
