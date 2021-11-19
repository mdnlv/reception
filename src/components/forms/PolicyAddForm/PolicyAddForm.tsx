import React, {useCallback, useState, useEffect} from 'react';
import {Button, Col, Row, Select, Space} from 'antd';
import { useFormikContext } from 'formik';
import { useParams } from 'react-router';
import {useSelector} from "react-redux";

import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import {FormProps, ListOptionItem} from './types';
import {WizardStateType} from "../wizards/RegCardWizard/types";
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
  kladr
}) => {
  const { id } = useParams<{ id: string }>();
  const form = useFormikContext<WizardStateType>();
  const formValues = policyKey === 'policyOms' ? form.values.personDocs.policies[0] : form.values.passportGeneral.policyDms;
  const sectionValuePath = policyKey === 'policyOms' ? `personDocs.policies[0]` : `passportGeneral.policyDms`;
  const fieldNames = ['cmo', 'type', 'timeType', 'from', 'to', 'serial', 'number', 'note', 'name'];
  const filterNames = ['smoShort', 'inn', 'ogrn', 'cmoArea'];
  const {policyBuffer} = useSelector((state: RootState) => state.registrationCard.form);

  const firstName = form.values.personal.firstName;
  const lastName = form.values.personal.lastName;
  const birthDate = form.values.personal.birthDate;
  const docNumber = form.values.personDocs.documents[0].number;

  const [policyMask, setPolicyMask] = useState('' as string);
  const [showModal, setShowModal] = useState(false);
  const [showOrgChoice, setShowOrgChoice] = useState(false);
  const [errorsData, setErrorsData] = useState([] as string[]);
  const [cmoFiltered, setCmoFiltered] = useState([] as ListOptionItem[]);

  // useEffect(() => {
  //   console.log('cmoFiltered', cmoFiltered);
  // }, [cmoFiltered]);

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
    if (formValues && !Object.keys(formValues).every((k) => !formValues[k]) && policyKey === "policyDms") {
      fieldNames.map((item) => form.setFieldValue(`personDocs.policies[1].${item}`, formValues[item]))
    }
  }, [formValues, policyKey]);

  useEffect(() => {
    if (formValues && !formValues?.cmoArea && Object.keys(formValues).length > 2) {
      const result = cmoType.find((item) => item.id === parseInt(formValues?.cmo));
      form.setFieldValue(`${sectionValuePath}.cmoArea`, result?.extraData || '');
    }
  }, [formValues?.cmo]);

  useEffect(() => {
    if (foundPolicy) {
      fieldNames.map((item) => form.setFieldValue(`${sectionValuePath}.${item}`, foundPolicy[item]));
      const timeType = foundPolicy?.timeType;
      if (timeType === "1" /*|| formValues?.serial === 'ВС'*/) {
        setPolicyMask('')
        setTimeout(()=>setPolicyMask('111111111'), 100);
      } else if (timeType === "3" /* || formValues?.serial === 'ЕП'*/) {
        setPolicyMask('')
        setTimeout(()=>setPolicyMask('1111111111111111'), 100);
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
      form.setFieldValue(`${sectionValuePath}.number`, formValues?.number.substr(0, 9));
    } else if (timeType === "3" /* || formValues?.serial === 'ЕП'*/) {
      setPolicyMask('')
      setTimeout(()=>setPolicyMask('1111111111111111'), 100);
      form.setFieldValue(`${sectionValuePath}.number`, formValues?.number.substr(0, 16));
    } else {
      setPolicyMask('')
    }
  }, [formValues?.timeType, formValues?.serial]);

  useEffect(() => {
    formValues?.serial === 'ЕП' && form.setFieldValue(`${sectionValuePath}.to`, '2200-01-01');
  }, [formValues?.serial]);

  useEffect(() => {
    if (policyKey === 'policyDms') {
      const res = policyTimeType.find((item) => item.name === 'ДМС');
      form.setFieldValue(`${sectionValuePath}.timeType`, res?.id || 1);
    }
  }, [policyKey]);

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
        {
          name: 'docNumber',
          value: values.docNumber,
        },
      ];
      let data = [] as string[];
      fields.map((item) => {
        if (!item.value) {
          item.name === 'lastName' && data.push('Не заполнена фамилия!');
          item.name === 'firstName' && data.push('Не заполнено имя!');
          item.name === 'birthDate' && data.push('Не заполнена дата рождения!');
          item.name === 'docNumber' && data.push('Не заполнен номер документа!');
        }
      });
      setErrorsData(data);
      onFindPolicy && data.length === 0 && onFindPolicy(values, 'oms');
    },
    [onFindPolicy, errorsData],
  );

  const cleanFields = () => {
    fieldNames.map((item) => {
      form.setFieldValue(`${sectionValuePath}.${item}`, '')
    })
  };

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
          <>
            <Col>
              <Button
                type="primary"
                loading={isLoading}
                onClick={() => {
                  console.log('birthDate', birthDate);
                  onFindPolicyHandler({
                    birthDate,
                    firstName,
                    lastName,
                    docNumber,
                  });
                }}>
                Искать
              </Button>
            </Col>
            <Col xl={5} xxl={4}>
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
          </>
        )}
        <Col xl={7} xxl={5}>
          <FormField label={'С'} name={`${sectionValuePath}.from`}>
            <FastDatePicker
              disabled={isLoading}
              name={`${sectionValuePath}.from`}
            />
          </FormField>
        </Col>
        <Col xl={7} xxl={5}>
          <FormField label={'До'} name={`${sectionValuePath}.to`}>
            <FastDatePicker
              disabled={isLoading}
              name={`${sectionValuePath}.to`}
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
              ? (<FastMaskedInput
                  mask={policyMask}
                  disabled={isLoading}
                  name={`${sectionValuePath}.number`}
                />)
              : (<FastInput
                  disabled={isLoading}
                  name={`${sectionValuePath}.number`}
                />)
            }
          </FormField>
        </Col>
      </Row>
      <Row className="form-row" gutter={16} align={'bottom'}>
        <Col xl={20} xxl={13}>
          <FormField label="СМО" name={`${sectionValuePath}.cmo`}>
            <FastSearchSelect
              style={{width: '19vw'}}
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
        <Col xl={24} xxl={8}>
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
      <Row className="form-row" justify={'end'}>
        <Col>
          <Space>
            {id !== 'new' && (
              <Button
                onClick={() => {
                  cleanFields()
                }}
                disabled={isLoading}
                type={'primary'}>
                Добавить полис
              </Button>
            )}
          </Space>
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
