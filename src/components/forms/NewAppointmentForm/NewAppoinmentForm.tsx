import React, { Suspense, useEffect, useState } from 'react'
import { Col, Row, Select, TreeSelect } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { PersonTree } from '../../../reduxStore/slices/personTree/types'
import FormField from "../components/FormField/FormField";
import { RootState } from '../../../reduxStore/store';
import { FormState } from "./types";
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker'
import { fetchQueryPatients } from '../../../reduxStore/slices/patients/patientsSlice';
import { getPersonList,filterDoctors,clearLists,clearDoctors  } from '../../../reduxStore/slices/deferredCalls/deferredCallsSlice';
import TreeSelectField from "../components/fields/TreeSelect";
import moment from 'moment';
import { useFormikContext } from 'formik';
import { fetchItem } from "../../../reduxStore/slices/scheduleSlice/scheduleSlice";
import TicketSelect from '../components/fields/TicketSelect.tsx/TicketSelect';
const FastSearchSelect = React.lazy(() => import('../components/fields/FastSearchSelect/FastSearchSelect'));

const NewAppointmentForm: React.FC<FormState> = ({data}) => {
    const dispatch = useDispatch()
    const patients = useSelector((state: RootState) => state.patients.foundPatients);
    const doctors = useSelector((state: RootState) => state.deferredCalls.filteredDoctors);
    const specialty = useSelector((state: RootState) => state.deferredCalls.specialty);
    const personTree = useSelector((state:RootState) => state.person_tree.person_tree);
    const schedule = useSelector((state:RootState) => state.schedule.schedule);
    const isLoading = useSelector((state: RootState) => state.schedule.isLoading);
    const { values }  = useFormikContext<{[u: string]: any}>();
    const [date, setDate] = useState(values.date);
    const [person_id, setDoctor] = useState(values.person_id);
    const [org, setOrg] = useState(values.organisation);
    const { setFieldValue } = useFormikContext();

    const searchPatients = (query: string) => {
      dispatch(fetchQueryPatients({ query: query, limit: 10 }))
    }

    const clearDoctorsAndSpeciality = () =>{
      setFieldValue('speciality','');
      setFieldValue('person_id','');
      setFieldValue('person','');
      dispatch(clearLists())
    }

    const onSelectTreeNode = (value:number,tree:PersonTree) =>{
      clearDoctorsAndSpeciality()
      dispatch(getPersonList({data:tree.person_list}))
      setOrg(value)
    }
    
    const onSelectSpecialityId  = (id:number) =>{
      setFieldValue('person_id','');
      setFieldValue('person','');
      dispatch(filterDoctors({id:id}))
    }

    const onSelectDoctor  = (id:number) =>{
      setDoctor(id)
      if(values.person_id != id) {
        setFieldValue('doctor',doctors[0].fullName);
        setFieldValue('speciality',specialty.filter((v:any)=> v.id == doctors[0].speciality_id)[0].name);
      }
      onSelectDate();
    }

    const onSelectDate = () =>{
      setFieldValue('idx', undefined);
      setFieldValue('action_id', -1);
      setFieldValue('time', '');
    }

    const clearDoctor = (() => { 
      setFieldValue('person_id','');
      setFieldValue('person','');
      dispatch(clearDoctors())
    })
    const clearSpeciality = () => setFieldValue('speciality','')
  
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
  
    const getPropsOptionsSpecialty = (props: any) =>
    props.map((item: any) => {
      return (
        <Select.Option key={item.id} name={item.name} value={item.id}>
            {item.name}
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

    useEffect(()=>{
      dispatch(fetchItem({
        id: person_id,
        date: moment(date).format('YYYY-MM-DD')
      }));
    },[person_id, date]);

    return (   
        <form className={'appointment-form'}>
            <Row>
              <Col span={24}>
              <FormField label={'ФИО пациента:'} name={'client'}>
              <Suspense fallback={<div>Загрузка...</div>}>
                <FastSearchSelect
                  onInput={(e) => {
                    const value = e.target.value
                    searchPatients(value)
                  }}
                  placeholder={'Пациент'}
                  name={'client'}
                  showSearch
                  filterOption
                  allowClear
                  optionFilterProp={'name'}
                >
                  {getPropsOptions(patients)}
                  </FastSearchSelect>
                </Suspense>
                </FormField>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <FormField label={'Дата приема'}  name={'date'} >
                  <FastDatePicker 
                    name={'date'} 
                    setDate={setDate}
                    onSelectDate={onSelectDate}
                  />
                </FormField>
              </Col>
            </Row>
            <Row>
                <Col span={24}>
                  <FormField label={'Подразделение:'} name={'organisation'}>
                    <TreeSelectField 
                      defaultValue={data && data.org ? data.org : null}
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
                <FormField label={'Специальность врача:'} name={'speciality'}>
                <Suspense fallback={<div>Загрузка...</div>}>
                  <FastSearchSelect
                    defaultValue={data && data.speciality ? data.speciality: ''}
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
            </Row>
            <Row>
              <Col span={24}>
                <FormField label={'Врач:'}  name={'person'}>
                <Suspense fallback={<div>Загрузка...</div>}>
                  <FastSearchSelect
                    defaultValue={data && data.person ? data.person: ''}
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

            <Row>
              <Col span={24}>
                <FormField name={'idx'}>
                  <TicketSelect 
                    name={'idx'}
                    schedule={schedule} 
                    date={date}
                    person_id={person_id}
                    org={org}
                    isLoading={isLoading}
                  />
                </FormField>
              </Col>
            </Row>
        </form>
    )  
}

export default NewAppointmentForm
