import React, {Suspense} from 'react';
import {Col, Row, Select, TreeSelect} from 'antd/lib';
import {RootState} from "../../../../../reduxStore/store";
import FormField from '../../../components/FormField/FormField';
import FastSearchSelect from '../../../components/fields/FastSearchSelect/FastSearchSelect';
import TreeSelectField from '../../../components/fields/TreeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { PersonTree } from '../../../../elements/Schedule/types';
import { useFormikContext } from 'formik';
import { fetchFiltersDoctors } from '../../../../../reduxStore/slices/personTree/personTreeSlice';

const Fields: React.FC<any> = (props) => {
  const dispatch = useDispatch()
  const personTree = useSelector((state:RootState) => state.person_tree.person_tree_full);
  const specialty = useSelector((state: RootState) => state.rb.rbSpeciality);
  const post = useSelector((state: RootState) => state.rb.rbPost);
  const person = useSelector((state: RootState) => state.person_tree.foundDoctors);
  const { values }  = useFormikContext<{[u: string]: any}>();

  const renderTreeNodes = (data: any) =>
    data.map((item: PersonTree) => {
      return (
        <TreeSelect.TreeNode  value={item.id} key={item.id}  title={item.name}  {...item}>
          {item.child.length && renderTreeNodes(item.child)}
        </TreeSelect.TreeNode>
      );
    });

  const getPropsOptions = (props: any) =>
    props && props.map((item: any,index:number) => {
      return (
        <Select.Option key={item.id} name={item.name} value={item.id}>
            {item.name}
        </Select.Option>
      )
    });

  const getPropsOptionsPerson = (props: any) =>
    props && props.map((item: any,index:number) => {
      return (
        <Select.Option key={item.id} name={item.name} value={item.id}>
            {item.lastName}
        </Select.Option>
      )
    });

  const onSelectOrg = (v?: any) => {
    dispatch(
      fetchFiltersDoctors({
        limit: 100,
        offset: 0,
        orgStructure_id: v ? v : 0,
        speciality_id: !values.speciality? 0: values.speciality,
        post_id: !values.post? 0: values.post
      }),
    );
  }

  const onSelectSpec = (v?: any) => {
    dispatch(
      fetchFiltersDoctors({
        limit: 100,
        offset: 0,
        orgStructure_id: values.organisation,
        speciality_id: v ? v: 0,
        post_id: !values.post? 0: values.post
      }),
    );
  }

  const onSelectPost = (v?: any) => {
    dispatch(
      fetchFiltersDoctors({
        limit: 100,
        offset: 0,
        orgStructure_id: values.organisation,
        speciality_id: !values.speciality? 0: values.speciality,
        post_id: v? v: 0
      }),
    );
  }
  
  const onSelectDoctor = (v?: any) => {
  }

  return (
    <div className={'form-section'}>
      <Row gutter={8} >
        <Col span={6}>
          <FormField label={'Подразделение:'} name={'organisation'}>
            <TreeSelectField 
              name={'organisation'}
              onClear={onSelectOrg}
              onSelect={onSelectOrg}>
              {renderTreeNodes(personTree)}
            </TreeSelectField>
          </FormField>
        </Col>

          <Col span={6}>
          <FormField label={'Специальность врача:'} name={'speciality'}>
          <Suspense fallback={<div>Загрузка...</div>}>
            <FastSearchSelect
              placeholder='Специальность'
              name={'speciality'}
              showSearch
              allowClear
              onClear={onSelectSpec}
              onSelect={onSelectSpec}
              filterOption
              optionFilterProp={'name'}
            >
              {getPropsOptions(specialty)}
            </FastSearchSelect>
            </Suspense>
          </FormField>
          </Col>

          <Col span={6}>
          <FormField label={'Должность:'} name={'post'}>
          <Suspense fallback={<div>Загрузка...</div>}>
            <FastSearchSelect
              placeholder='Должность'
              name={'post'}
              showSearch
              allowClear
              onClear={onSelectPost}
              onSelect={onSelectPost}
              filterOption
              optionFilterProp={'name'}
            >
              {getPropsOptions(post)}
            </FastSearchSelect>
            </Suspense>
          </FormField>
          </Col>

        <Col span={6}>
          <FormField label={'Врач:'}  name={'person'}>
          <Suspense fallback={<div>Загрузка...</div>}>
          <FastSearchSelect
              placeholder='Врач'
              name={'person'}
              showSearch
              allowClear
              onClear={onSelectDoctor}
              onSelect={onSelectDoctor}
              filterOption
              optionFilterProp={'name'}
              mode="multiple"
            >
              {getPropsOptionsPerson(person)}
            </FastSearchSelect>
            </Suspense>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default Fields;
