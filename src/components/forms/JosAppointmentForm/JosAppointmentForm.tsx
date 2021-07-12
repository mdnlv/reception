import React from 'react'
import { Col, Divider, Row, Select,TreeSelect } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {PersonTree} from '../../../reduxStore/slices/personTree/types'
import FormField from "../components/FormField/FormField";
import { RootState } from '../../../reduxStore/store';
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker'
import { fetchQueryPatients } from '../../../reduxStore/slices/patients/patientsSlice';
import {getPersonList,filterDoctors,clearLists,clearDoctors } from '../../../reduxStore/slices/deferredCalls/deferredCallsSlice';
import TreeSelectField from "../components/fields/TreeSelect";
import Textarea from '../components/fields/Textarea';
import { useFormikContext } from 'formik';

const FastSearchSelect = React.lazy(() => import('../components/fields/FastSearchSelect/FastSearchSelect'));


const JosAppointmentForm: React.FC = (props:any) => {
    const dispatch = useDispatch()
    const patients = useSelector((state: RootState) => state.patients.foundPatients);
    const doctors = useSelector((state: RootState) => state.deferredCalls.filteredDoctors);
    const specialty = useSelector((state: RootState) => state.deferredCalls.specialty);
    const personTree = useSelector((state:RootState) => state.person_tree.person_tree_full)
    const { setFieldValue } = useFormikContext();
    const searchPatients = (query: string) => {
        dispatch(fetchQueryPatients({ query: query, limit: 10 }))
    }

    const  clearDoctorsAndSpeciality = () =>{
        setFieldValue('specialty','');
        setFieldValue('doctor','');
        dispatch(clearLists())
    }


    const onSelectTreeNode = (value:number,tree:PersonTree) =>{
        
        clearDoctorsAndSpeciality()
        
        dispatch(getPersonList({data:tree.person_list}))
    }
    const onSelectSpecialityId  = (id:number) =>{
        setFieldValue('doctor','');
        dispatch(filterDoctors({id:id}))

    }

    const clearDoctor = (() => { setFieldValue('doctor','');dispatch(clearDoctors())})
    const clearSpeciality = () => setFieldValue('specialty','')


  const renderTreeNodes = (data:PersonTree[]) =>
    data.map((item: PersonTree) => {
      return (
        <TreeSelect.TreeNode  value={item.id}  title={item.name}  {...item}>
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
                            <FormField label={'Дата приема'}  name={'date'} >
                                <FastDatePicker  name={'date'} />
                            </FormField>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <FormField label={'Пациент'} name={'patient'}>
                                <FastSearchSelect
                                    onInput={(e) => {
                                        const value = e.target.value
                                        searchPatients(value)
                                    }}
                                    id={'patient.id'}
                                    placeholder={'Пациент'}
                                    name={'patient'}
                                    showSearch
                                    filterOption
                                    allowClear
                                    optionFilterProp={'name'}>
                                    {getPropsOptions(patients)}
                                </FastSearchSelect>
                            </FormField>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <FormField label={'Подразделение'} name={'organisation'}>
                                <TreeSelectField 
                                name={'organisation'}
                                onClear={clearDoctorsAndSpeciality}
                                onSelect={onSelectTreeNode}>
                                {renderTreeNodes(personTree)}
                                </TreeSelectField>
                            </FormField>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormField label={'Специальность врача'} name={'specialty'}>
                                <FastSearchSelect
                                    placeholder={'Специальность'}
                                    name={'specialty'}
                                    showSearch
                                    allowClear
                                    onClear={clearDoctor}
                                    onSelect={onSelectSpecialityId}
                                    filterOption
                                    optionFilterProp={'name'}>
                                    {getPropsOptionsSpecialty(specialty)}
                                </FastSearchSelect>
                            </FormField>
                            <Row>
                        <Col span={24}>
                            <FormField label={'Врач'}  name={'doctor'}>
                                <FastSearchSelect
                                    placeholder={'Врач'}
                                    name={'doctor'}
                                    showSearch
                                    allowClear
                                    onClear={clearSpeciality}
                                    filterOption
                                    optionFilterProp={'name'}>
                                    {getPropsOptionsDoctors(doctors)}
                                </FastSearchSelect>
                            </FormField>
                        </Col>
                    </Row>
                            <FormField label={'Комментарий'} name={'сomment'}>
                                <Textarea name={'сomment'}  />
                            </FormField>
                
                        </Col>
                    </Row>
                </form>
            )}


export default JosAppointmentForm
