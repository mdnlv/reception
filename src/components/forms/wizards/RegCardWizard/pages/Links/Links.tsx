import React,{useCallback, useEffect, useState} from 'react';
import { Col, Divider, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { RootState } from '../../../../../../reduxStore/store';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchRbRelationTypes
} from '../../../../../../reduxStore/slices/rb/rbSlice';
import {fetchQueryPatients} from '../../../../../../reduxStore/slices/patients/patientsSlice'
import {DROPDOWN_TITLE, LABELS} from "./types";
import {WizardStateType} from "../../types";
import  RbRelationTypeResponse from '../../../../../../interfaces/responses/rb/rbRelationType'
import {PersonLink} from "../../../../PersonLinksForm/types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import FastSearchSelect from "../../../../components/fields/FastSearchSelect/FastSearchSelect";
import AutoCompleteInput from '../../../../components/fields/AutoSelect'
import ArrayFieldWrapper from '../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';

const Links: React.FC = () => {
  const dispatch = useDispatch()
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.links;
  const sectionValuePath = `links`;
  const patientSex = form.values.personal.sex
  const  {rbRelationTypesDirectLink, rbRelationTypesRelativeLink} = useSelector((state: RootState) => state.rb);
  const  patients = useSelector((state: RootState) => state.patients.foundPatients );
  const [directFiltered, setDirectFiltered] = useState([] as PersonLink[]);
  const [backFiltered, setBackFiltered] = useState([] as PersonLink[]);

  useEffect(() => {
    const result = formValues.directLinks.filter((item) => item.deleted !== 1);
    setDirectFiltered(result);
  }, [formValues.directLinks]);

  useEffect(() => {
    const result = formValues.backLinks.filter((item) => item.deleted !== 1);
    setBackFiltered(result);
  }, [formValues.backLinks]);

  useEffect(()=>{
    dispatch(fetchRbRelationTypes({sex:patientSex}))
    form.setFieldValue(
      `links.directLinks`,
      formValues.directLinks.slice(formValues.directLinks.length, formValues.directLinks.length - 1),
    );
    form.setFieldValue(
      `links.backLinks`,
      formValues.directLinks.slice(formValues.backLinks.length, formValues.backLinks.length - 1),
    );
  },[patientSex])

  const onAddAttachment = useCallback((type:'backLinks' | 'directLinks' ) => {
    const links  = {
      forwardRef: '',
      patientLink: '',
      deleted: 0,
    };
    const newArr = [...formValues[type], links];
    form.setFieldValue(`links.${type}`, newArr);
  }, [formValues,patientSex]);

  const onRemoveAttachment = useCallback((type:'backLinks' | 'directLinks' ) => {
    if (formValues[type].length > 0) {
      form.setFieldValue(
        `links.${type}[${formValues[type].length - 1}].deleted`,
        1,
      );
    }
  }, [formValues,patientSex]);


  const getPropsOptions = useCallback(
    (props, type?) =>
      props.map((item:RbRelationTypeResponse) => {
        let name = ''
        if(type === 'directConnection' ){
           name = `${item.leftName} => ${item.rightName}`
        }
        else{
           name = `${item.leftName} <= ${item.rightName}`
        }
       return  (
        <Select.Option key={item.code} name={item.code} value={item.code.toString()}>
          {name}
        </Select.Option>
      )}),
    [],
  );

  const getSearchOptions = ((props:[]) =>{
     return props.map(({fullName})=>{return {value:fullName}})
       })

  const searchPatients = async (query:string) =>{
   await dispatch(fetchQueryPatients({query:query,limit:5}))
  }

  const getSelectionPath = (index: number, linkType:string, fieldChain: string) => {

    return `${sectionValuePath}.${linkType}[${index}].${fieldChain}`;
  };

  return (
    <form className={'wizard-step links-form'}>
      <div className="form-section">
        <DropDownContent title={DROPDOWN_TITLE}>
          <Row>
            <Col span={24}>
               <ArrayFieldWrapper<any>
               values={directFiltered}
               onAddItem={()=>onAddAttachment('directLinks')}
               onRemoveItem={()=>onRemoveAttachment('directLinks')}
               showActions
                name={'directLinks'}
                renderChild={(_, index:number) => {
                  return (
                  <Row key={index} gutter={16}>
                    <Col span={5}>
                      <FormField label={LABELS.DIRECT_LINK}  name={getSelectionPath(index, 'directLinks', 'patientLink')}>
                      <FastSearchSelect
                      loading={false}
                      showSearch
                      filterOption
                      optionFilterProp={'directLinks'}
                    name={getSelectionPath(index, 'directLinks', 'patientLink')}
                      >
                        {getPropsOptions(rbRelationTypesDirectLink, 'directConnection')}
                        </FastSearchSelect>
                      </FormField>
                    </Col>
                    <Col span={7}>
                      <FormField label={LABELS.WITH_PATIENT} name={getSelectionPath(index, 'directLinks', 'forwardRef')}>
                        <AutoCompleteInput
                        onSearch={searchPatients}
                        options={getSearchOptions(patients)}
                        name={getSelectionPath(index, 'directLinks', 'forwardRef')}
                        />

                      </FormField>
                    </Col>
                  </Row>
                )}}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
            <ArrayFieldWrapper<any>
               values={backFiltered}
               onAddItem={()=>onAddAttachment('backLinks')}
               onRemoveItem={()=>onRemoveAttachment('backLinks')}
               showActions
                name={'backLinks'}
                renderChild={(_, index:number) => {
                  return (
                  <Row key={index} gutter={16}>
                    <Col span={5}>
                      <FormField label={LABELS.DIRECT_LINK}  name={getSelectionPath(index, 'backLinks', 'patientLink')}>
                      <FastSearchSelect
                      loading={false}
                      showSearch
                      filterOption
                      optionFilterProp={'backLinks'}
                    name={getSelectionPath(index, 'backLinks', 'patientLink')}
                      >
                        {getPropsOptions(rbRelationTypesRelativeLink)}
                        </FastSearchSelect>
                      </FormField>
                    </Col>
                    <Col span={7}>
                      <FormField label={LABELS.WITH_PATIENT} name={getSelectionPath(index, 'backLinks', 'forwardRef')}>
                        <AutoCompleteInput
                        onSearch={searchPatients}
                        options={getSearchOptions(patients)}
                        name={getSelectionPath(index, 'backLinks', 'forwardRef')}
                        />
                      </FormField>
                    </Col>
                  </Row>
                )}}
              />
            </Col>
          </Row>
        </DropDownContent>
      </div>
    </form>
  );
};

export default Links;

