import React, {useCallback, useState, useEffect} from 'react';
import {Button, Col, Row, Select} from 'antd';
import { useFormikContext } from 'formik';
import { useParams } from 'react-router';
import { useDispatch, useSelector} from 'react-redux';

import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import {FormProps, ListOptionItem} from './types';
import {WizardStateType} from "../wizards/RegCardWizard/types";
import {setPolicyBuffer} from "../../../reduxStore/slices/registrationCard/registrationCardSlice";
import {RootState} from "../../../reduxStore/store";

import FormField from '../components/FormField/FormField';
import FastInput from '../components/fields/FastInput/FastInput';
import FastDatePicker from '../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../components/fields/FastSearchSelect/FastSearchSelect';
import FastMaskedInput from "../components/fields/FastMaskedInput/FastMaskedInput";
import PolSearchValidation from "../../modals/PolSearchValidation/PolSearchValidation";
import SmoParams from "../../modals/SmoParams/SmoParams";

const PolicyAddForm: React.FC<FormProps> = ({
  policyKey,
  policyType,
  policyTimeType,
  onFindPolicy,
  foundPolicy,
  isLoading,
  isCmoLoading,
  cmoType,
  kladr,
  policyMask,
  setPolicyMask
}) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.personDocs.policies[0];
  const sectionValuePath = `personDocs.policies[0]`;
  const fieldNames = ['cmo', 'type', 'timeType', 'from', 'to', 'serial', 'number', 'note', 'name', 'enp'];
  const filterNames = ['smoShort', 'inn', 'ogrn'];
  const {policyBuffer} = useSelector((state: RootState) => state.registrationCard.form);
  const {policiesFoundMessage} = useSelector(
    (state: RootState) => state.registrationCard,
  );

  const firstName = form.values.personal.firstName;
  const lastName = form.values.personal.lastName;
  const birthDate = form.values.personal.birthDate;

  const [showModal, setShowModal] = useState(false);
  const [showOrgChoice, setShowOrgChoice] = useState(false);
  const [errorsData, setErrorsData] = useState([] as string[]);
  const [cmoFiltered, setCmoFiltered] = useState([] as ListOptionItem[]);

  // useEffect(() => {
  //   console.log('formValues.number', formValues.number);
  // }, [formValues.number]);

  useEffect(() => {
    !policiesFoundMessage && dispatch(setPolicyBuffer({value: formValues, type: 'setPolicyBuffer'}))
  }, [formValues, policiesFoundMessage]);

  useEffect(() => {
    if (cmoType.length > 0) {
      const result = formValues?.cmoArea && id
        ? cmoType.filter((item) => item.extraData === formValues?.cmoArea)
        : !id
          ? cmoType.filter((item) => item.extraData === '7800000000000')
          : cmoType;
      setCmoFiltered(result);
    }
  }, [cmoType, formValues?.cmoArea]);

  useEffect(() => {
    if (foundPolicy) {
      fieldNames.map((item) => form.setFieldValue(`${sectionValuePath}.${item}`, foundPolicy[item]))
      const timeType = foundPolicy?.timeType;
      if (timeType === "1" /*|| formValues?.serial === 'ВС'*/) {
        setPolicyMask('')
        setTimeout(()=>setPolicyMask('111111111'), 100);
      } else if (timeType === "3" /* || formValues?.serial === 'ЕП'*/) {
        setPolicyMask('')
        setTimeout(()=>setPolicyMask('11111111111'), 100);
      } else {
        setPolicyMask('')
      }
    }
  }, [foundPolicy]);

  useEffect(() => {
    if (formValues && Object.keys(formValues).length > 2) {
      if (formValues?.timeType === '1') {
        form.setFieldValue(`${sectionValuePath}.serial`, 'ВС');
      } else if (formValues?.timeType === '3') {
        form.setFieldValue(`${sectionValuePath}.serial`, 'ЕП');
        form.setFieldValue(`${sectionValuePath}.to`, '2200-01-01');
      } else {
        !formValues?.timeType && form.setFieldValue(`${sectionValuePath}.serial`, '');
      }
    }
  }, [formValues?.timeType]);

  useEffect(() => {
    const timeType = formValues?.timeType;
    if (timeType === "1" /*|| formValues?.serial === 'ВС'*/) {
      setPolicyMask('')
      setTimeout(()=>setPolicyMask('111111111'), 100);

    } else if (timeType === "3" /* || formValues?.serial === 'ЕП'*/) {
      setPolicyMask('')
      setTimeout(()=>setPolicyMask('11111111111'), 100);
    } else {
      setPolicyMask('')
    }
  }, [formValues?.timeType, formValues?.serial]);

  useEffect(() => {
    errorsData.length > 0 && setShowModal(true);
  }, [errorsData]);

  const sectionTitle = () => {
    switch (policyKey) {
      case 'policyDms':
        return 'Полис ДМС';
      case 'policyOms':
        return 'Полис ОМС';
    }
  };

  const getPropsOptions = useCallback(
    (props: ListOptionItem[]) =>
      props.map((item) => (
        <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      )),
    [policyTimeType, policyType, cmoFiltered],
  );

  const getKladrDetailed = () => {
    return kladr.map((item) => (
      <Select.Option
        key={item.id}
        name={`${item.socr}. ${item.name}`}
        value={item.id}>
        {`${item.socr}. ${item.name}`}
      </Select.Option>
    ));
  };

  const onFindPolicyHandler = useCallback(
    (values: FindPolicyParams) => {
      let fields = [
        {
          name: 'lastName',
          value: values.lastName
        },
        {
          name: 'firstName',
          value: values.firstName
        },
        {
          name: 'birthDate',
          value: values.birthDate
        },
      ];
      let data = [] as string[];
      fields.map((item) => {
        if (!item.value) {
          item.name === 'lastName' && data.push('Не заполнена фамилия!');
          item.name === 'firstName' && data.push('Не заполнено имя!');
          item.name === 'birthDate' && data.push('Не заполнена дата рождения!');
        }
      });
      setErrorsData(data);
      onFindPolicy && data.length === 0 && onFindPolicy(values, 'oms');
    },
    [onFindPolicy, errorsData],
  );

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onCloseOrgsChoice = () => {
    setShowOrgChoice(false);
  };

  const onSubmitCmoFilter = () => {
    if (policyKey === 'policyOms') {
      const result = formValues.cmoArea
        ? cmoType.filter(
          (item) =>
            item.extraData === formValues.cmoArea
            && item.name.toLowerCase().includes(formValues.smoShort?.toLowerCase() || '')
            && item.inn?.includes(formValues.inn || '')
            && item.ogrn?.includes(formValues.ogrn || '')
          )
        : cmoType;
      setCmoFiltered(result);
    }
  };

  const onCancelCmoFilter = () => {
    console.log('policyBuffer cancel', policyBuffer);
    filterNames.map((item) => {
      form.setFieldValue(`${sectionValuePath}.${item}`, policyBuffer[item])
    })
  };

  return (
    <div
      className={`form-section policy-${
        policyKey === 'policyOms' ? 'omc' : 'dmc'
      }`}>
      <h2>{sectionTitle()}</h2>
      <Row className="form-row" align={'bottom'} gutter={16}>
        {policyKey === 'policyOms' && (
          <Col>
            <Button
              type="primary"
              loading={isLoading}
              onClick={() => {
                onFindPolicyHandler({
                  birthDate,
                  firstName,
                  lastName,
                });
              }}>
              Искать
            </Button>
          </Col>
        )}
        <Col lg={5} xl={5} xxl={5}>
          <FormField label={'Вид'} name={`${sectionValuePath}.timeType`}>
            <FastSearchSelect
              allowClear
              loading={isLoading}
              placeholder={"Вид"}
              name={`${sectionValuePath}.timeType`}
            >
              {getPropsOptions(policyTimeType)}
            </FastSearchSelect>
          </FormField>
        </Col>
        <Col lg={5} xl={7} xxl={3}>
          <FormField label={'С'} name={`${sectionValuePath}.from`}>
            <FastDatePicker
              disabled={isLoading}
              name={`${sectionValuePath}.from`}
            />
          </FormField>
        </Col>
        <Col lg={5} xl={7} xxl={3}>
          <FormField label={'До'} name={`${sectionValuePath}.to`}>
            <FastDatePicker
              disabled={isLoading}
              name={`${sectionValuePath}.to`}
            />
          </FormField>
        </Col>
        <Col lg={5} xl={5} xxl={4}>
          <FormField label={'ЕНП'} name={`${sectionValuePath}.enp`}>
            <FastMaskedInput
              mask={'1111111111111111'}
              disabled={isLoading}
              name={`${sectionValuePath}.enp`}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" gutter={16}>
        <Col span={6}>
          <FormField label={'Серия'} name={`${sectionValuePath}.serial`}>
            <FastInput
              disabled={isLoading}
              name={`${sectionValuePath}.serial`}
            />
          </FormField>
        </Col>
        <Col span={18}>
          <FormField label={'Номер'} name={`${sectionValuePath}.number`}>
            {policyMask
              ? <FastMaskedInput
                  mask={policyMask}
                  disabled={isLoading}
                  name={`${sectionValuePath}.number`}
                />
              : <FastInput
                  disabled={isLoading}
                  name={`${sectionValuePath}.number`}
                />
            }
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" gutter={16} align={'bottom'}>
        <Col lg={22} xl={24} xxl={13}>
          <FormField label="СМО" name={`${sectionValuePath}.cmo`}>
            <FastSearchSelect
              filterOption
              loading={isLoading || isCmoLoading}
              optionFilterProp={'name'}
              showSearch
              disabled={isLoading}
              name={`${sectionValuePath}.cmo`}
              allowClear
            >
              {getPropsOptions(cmoFiltered)}
            </FastSearchSelect>
          </FormField>
        </Col>
        <Col>
          <Button onClick={() => setShowOrgChoice(true)}>...</Button>
        </Col>
        <Col lg={24} xl={24} xxl={9}>
          <FormField name={`${sectionValuePath}.type`}>
            <FastSearchSelect
              disabled={isLoading}
              name={`${sectionValuePath}.type`}
            >
              {getPropsOptions(policyType)}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row className="form-row">
        <Col span={24}>
          <FormField labelPosition="left" label="Название">
            <FastInput
              disabled={isLoading}
              name={`${sectionValuePath}.name`}
            />
          </FormField>
        </Col>
      </Row>
      <Row className="form-row">
        <Col span={24}>
          <FormField labelPosition="left" label="Примечание">
            <FastInput
              disabled={isLoading}
              name={`${sectionValuePath}.note`}
            />
          </FormField>
        </Col>
      </Row>
      <PolSearchValidation isVisible={showModal} errors={errorsData} onClose={onCloseModal}/>
      <SmoParams
        isVisible={showOrgChoice && !isCmoLoading && !isLoading}
        policyKey={policyKey}
        getKladrDetailed={getKladrDetailed}
        onClose={onCloseOrgsChoice}
        onOk={onSubmitCmoFilter}
        onCancel={onCancelCmoFilter}
        index={0}
      />
    </div>
  );
};

export default PolicyAddForm;
