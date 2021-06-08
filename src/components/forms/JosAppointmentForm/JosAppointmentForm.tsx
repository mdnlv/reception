import React from 'react'
import { Col, Divider, Row, Select,TreeSelect } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {PersonTree} from '../../../reduxStore/slices/personTree/types'
import FormField from "../components/FormField/FormField";
import { RootState } from '../../../reduxStore/store';
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker'
import { fetchQueryPatients } from '../../../reduxStore/slices/patients/patientsSlice';
import {getPersonList } from '../../../reduxStore/slices/deferredCalls/deferredCallsSlice';
import TreeSelectField from "../components/fields/TreeSelect"
const FastSearchSelect = React.lazy(() => import('../components/fields/FastSearchSelect/FastSearchSelect'));


const JosAppointmentForm: React.FC = (props:any) => {
    
    const dispatch = useDispatch()
    const patients = useSelector((state: RootState) => state.patients.foundPatients);
    const doctors = useSelector((state: RootState) => state.deferredCalls.doctors);
    const specialty = useSelector((state: RootState) => state.deferredCalls.specialty);
    const personTree = useSelector((state:RootState) => state.person_tree.person_tree)



    const searchPatients = (query: string) => {
        dispatch(fetchQueryPatients({ query: query, limit: 10 }))
    }

  
  const renderTreeNodes = (data:PersonTree[]) =>
    data.map((item: PersonTree) => {
      return (
        <TreeSelect.TreeNode  value={item.id}  title={item.name}  {...item}>
          {item.child.length && renderTreeNodes(item.child)}
        </TreeSelect.TreeNode>
      );
    });


    const onSelectTreeNode = (value:number,tree:PersonTree) =>{
        dispatch(getPersonList({data:tree.person_list}))
    }

    const getPropsOptions = (props: any) =>
        props.map((item: any) => {
            return (
                <Select.Option key={item.code} name={item.fullName} value={item.code}>
                    {item.fullName}
                </Select.Option>
            )
        });

        const getPropsOptionsSpecialty = (props: any) =>
        props.map((item: any) => {
            return (
                <Select.Option key={item.id} name={item.name} value={item.id}>
                    {item.name}
                </Select.Option>
            )
        });


    return (
            <form className={'appointment-form'}>
                    <Row gutter={16}>
                        <Col>
                            <FormField label={'Дата приема'}>
                                <FastDatePicker  name={'date'} />
                            </FormField>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <FormField label={'Пациент'}>
                                <FastSearchSelect
                                    onInput={(e) => {
                                        const value = e.target.value
                                        searchPatients(value)
                                    }}
                                    onSelect={((val, selected) => {
                                    })}
                                    id={'patient.id'}
                                    placeholder={'Пациент'}
                                    name={'patient.id'}
                                    showSearch
                                    filterOption
                                    optionFilterProp={'name'}>
                                    {getPropsOptions(patients)}
                                </FastSearchSelect>
                            </FormField>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <FormField label={'Подразделение'}>
                                <TreeSelectField 
                                name={'organisation.id'}
                                onSelect={onSelectTreeNode}>
                                {renderTreeNodes(personTree)}
                                </TreeSelectField>
                            
                            </FormField>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Врач'}>
                                <FastSearchSelect
                                    placeholder={'Врач'}
                                    name={'doctor.id'}
                                    showSearch
                                    filterOption
                                    optionFilterProp={'name'}>
                                    {getPropsOptions(doctors)}
                                </FastSearchSelect>
                            </FormField>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Специальность врача'}>
                                <FastSearchSelect
                                    placeholder={'Специальность'}
                                    name={'specialty.id'}
                                    showSearch
                                    filterOption
                                    optionFilterProp={'name'}>
                                    {getPropsOptionsSpecialty(specialty)}
                                </FastSearchSelect>
                            </FormField>
                        </Col>
                    </Row>
                </form>
            )}


export default JosAppointmentForm
