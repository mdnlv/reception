import React, { Suspense, useEffect } from 'react'
import { Col, Divider, Row, Select, TreeSelect } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { PersonTree } from '../../../reduxStore/slices/personTree/types'
import FormField from "../components/FormField/FormField";
import { RootState } from '../../../reduxStore/store';
import { FormState } from "./types";
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker'
import { fetchQueryPatients } from '../../../reduxStore/slices/patients/patientsSlice';
import { getPersonList } from '../../../reduxStore/slices/deferredCalls/deferredCallsSlice';
import { detailedSchedule } from '../../../reduxStore/slices/scheduleSlice/selectors';
import TreeSelectField from "../components/fields/TreeSelect";

import moment from 'moment';
import { useFormikContext } from 'formik';
import { fetchItem } from "../../../reduxStore/slices/scheduleSlice/scheduleSlice";
import TicketSelect from '../components/fields/TicketSelect.tsx/TicketSelect';
const FastSearchSelect = React.lazy(() => import('../components/fields/FastSearchSelect/FastSearchSelect'));

const NewAppointmentForm: React.FC<FormState> = ({
    data,
    currentPatientMemo
  }) => {
    const dispatch = useDispatch()
    const patients = useSelector((state: RootState) => state.patients.foundPatients);
    const doctors = useSelector((state: RootState) => state.deferredCalls.doctors);
    const specialty = useSelector((state: RootState) => state.deferredCalls.specialty);
    const personTree = useSelector((state:RootState) => state.person_tree.person_tree);
    const schedule = useSelector(detailedSchedule);
    const { values }  = useFormikContext<{[u: string]: number}>();
    const searchPatients = (query: string) => {
      dispatch(fetchQueryPatients({ query: query, limit: 10 }))
    }
  
    const renderTreeNodes = (data:PersonTree[]) =>
      data.map((item: PersonTree) => {
        return (
          <TreeSelect.TreeNode  value={item.id} key={item.id}  title={item.name}  {...item}>
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
          <Select.Option key={item.code} name={item.fullName} value={item.id}>
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

    useEffect(()=>{
      if(values.date && values.doctor)
        dispatch(fetchItem({
          id: values.doctor,
          date: moment(values.date).format('YYYY-MM-DD')
        }));
    },[values])

    return (   
        <form className={'appointment-form'}>
            <Row>
              <Col span={24}>
              <FormField label={'ФИО пациента:'} name={'client_id'}>
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

                  />
                </FormField>
              </Col>
            </Row>
            <Row>
                <Col span={24}>
                  <FormField label={'Подразделение:'} name={'organisation'}>
                    <TreeSelectField 
                      value={data && data.org ? data.org : null}
                      name={'organisation'}
                      onSelect={onSelectTreeNode}>
                      {renderTreeNodes(personTree)}
                    </TreeSelectField>
                  </FormField>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <FormField label={'Специальность врача:'} name={'specialty'}>
                <Suspense fallback={<div>Загрузка...</div>}>
                  <FastSearchSelect
                    defaultValue={data && data.speciality ? data.speciality: ''}
                    placeholder={'Специальность'}
                    name={'speciality'}
                    showSearch
                    filterOption
                    optionFilterProp={'name'}>
                    {getPropsOptionsSpecialty(specialty)}
                  </FastSearchSelect>
                  </Suspense>
                </FormField>
                </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormField label={'Врач:'}  name={'person_id'}>
                <Suspense fallback={<div>Загрузка...</div>}>
                  <FastSearchSelect
                    defaultValue={data && data.person ? data.person: ''}
                    placeholder={'Врач'}
                    name={'person'}
                    showSearch
                    filterOption
                    optionFilterProp={'name'}
                  >
                    {getPropsOptions(doctors)}
                  </FastSearchSelect>
                  </Suspense>
                </FormField>
              </Col>
            </Row>
            <Divider/>
            <Row>
              <Col span={24}>
                <FormField label={'Номерки:'}  name={'ticket'}>
                  <TicketSelect schedule={schedule} data={data}/>
                </FormField>
              </Col>
            </Row>
        </form>
    )  
}

export default NewAppointmentForm
