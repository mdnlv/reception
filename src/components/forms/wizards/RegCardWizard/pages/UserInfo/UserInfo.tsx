import React, {useState, useEffect, useCallback} from 'react';
import { useFormikContext, useField } from 'formik';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Radio,
  Row,
  TimePicker,
  Select,
} from 'antd';
import RadioGroup from 'antd/es/radio/group';
import {useDispatch, useSelector} from 'react-redux';
import {format} from "date-fns";
import moment, {Moment} from 'moment';
import {WizardStateType} from '../../types';
import UserInfoTypes, {ListOptionItem} from "./types";
import {fetchRbRelationTypes} from "../../../../../../reduxStore/slices/rb/rbSlice";
import {RootState} from "../../../../../../reduxStore/store";
import {
  findPatientSnils,
  setSnilsFoundMessage
} from '../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import {detailedSNILSMissingReasonsSelector} from "../../../../../../reduxStore/slices/rb/selectors";
//import TimePicker from 'react-time-picker';

import FormField from '../../../../components/FormField/FormField';
import FastInput from '../../../../components/fields/FastInput/FastInput';
import FastMaskedInput from '../../../../components/fields/FastMaskedInput/FastMaskedInput';
import FastInputNumber from '../../../../components/fields/FastInputNumber/FastInpuNumber';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';
import SnilsFound from "../../../../../modals/SnilsFound/SnilsFound";
import UnknownInfo from "../../../../../modals/UnknownInfo/UnknownInfo";
import FastSearchSelect from "../../../../components/fields/FastSearchSelect/FastSearchSelect";

const UserInfo: React.FC<UserInfoTypes> = ({errors, onOpen, showUnknown, setShowUnknown}) => {
  const dispatch = useDispatch();
  const formProps = useFormikContext<WizardStateType>();
  const formValues = formProps.values.personal;
  const formIsUnknown = formProps.values.isUnknown;
  const formUnknownValues = formProps.values.personalUnknown;
  const sectionValuePath = `personal`;
  const addressValuePath = 'passportGeneral.passportInfo.addressRegistration';
  const [_, meta] = useField<string>(`${sectionValuePath}.sex`);
  const {isLoading, items} = useSelector((state: RootState) => state.registrationCard.form.foundSnils);
  const {snilsFoundMessage} = useSelector(
    (state: RootState) => state.registrationCard,
  );
  const SNILSMissingReasons = useSelector(detailedSNILSMissingReasonsSelector);
  const {SNILSMissingReasons: isSMRLoading} = useSelector((state: RootState) => state.rb.loading);
  const [snilsWarning, setSnilsWarning] = useState('');
  const [errorSnilsMessage, setErrorSnilsMessage] = useState(false);
  const [tbValue, setTbValue] = useState<Moment | undefined>();

  // useEffect(() => {
  //   console.log('formValues.birthTime', formValues.birthTime);
  // }, [formValues.birthTime]);

  useEffect(() => {
    if (formIsUnknown && formValues.sex !== null) {
      formValues.sex
        ? formProps.setFieldValue(`${sectionValuePath}.lastName`, 'Неизвестная Женщина')
        : formProps.setFieldValue(`${sectionValuePath}.lastName`, 'Неизвестный Мужчина')
    }
  }, [formIsUnknown, formValues.sex]);

  useEffect(() => {
    formValues.sex !== null
      && dispatch(fetchRbRelationTypes({sex: formValues.sex}));
  }, [formValues.sex]);

  useEffect(() => {
    formValues.lastName && formProps.setFieldValue(`${sectionValuePath}.lastName`, dataCapitalize(formValues.lastName));
    formValues.firstName && formProps.setFieldValue(`${sectionValuePath}.firstName`, dataCapitalize(formValues.firstName));
    formValues.patrName && formProps.setFieldValue(`${sectionValuePath}.patrName`, dataCapitalize(formValues.patrName));
  }, [formValues.lastName, formValues.firstName, formValues.patrName]);

  useEffect(() => {
    const checking = snilsCheck(formValues.snils)
    !checking && !formValues.SNILSMissingReason
      ? setSnilsWarning('Неправильная контрольная сумма, возможно неправильный СНИЛС')
      : setSnilsWarning('')
  }, [formValues.snils, formValues.SNILSMissingReason]);

  const getPropsOptions = useCallback(
    (props: ListOptionItem[]) =>
      props.map((item) => (
        <Select.Option key={item.id} name={item.name} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      )),
    [SNILSMissingReasons],
  );

  const snilsCheck = (value: string) => {
    const valueInt = value ? value.replace(/-/g, "").replace(/\s/g, "") : '';
    let sum = 0;
    let checkDigit = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(valueInt[i]) * (9 - i);
    }
    if (sum < 100) {
      checkDigit = sum;
    } else if (sum > 101) {
      checkDigit = sum % 101;
      if (checkDigit === 100) {
        checkDigit = 0
      }
    }

    return checkDigit === parseInt(valueInt.slice(-2))
  };

  const onCancel = useCallback(() => {
    window.top.postMessage(JSON.stringify({action:'closeDialog'}),'*');
  }, []);

  const onSnilsSearch = () => {
    if (!formValues.firstName && !formValues.lastName && !formValues.patrName) {
      setErrorSnilsMessage(true);
    } else {
      //@ts-ignore
      dispatch(findPatientSnils({
        ...(formValues.birthDate
          // @ts-ignore
          && {birthDate: typeof formValues.birthDate === 'string' ? formValues.birthDate : format(formValues.birthDate as Date, 'yyyy-MM-dd')}),
        ...(formValues.sex && {sex: formValues.sex}),
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        patrName: formValues.patrName,
      }));
    }
  };

  const onSelectSnils = (value: string) => {
    formProps.setFieldValue(`${sectionValuePath}.snils`, value);
    dispatch(setSnilsFoundMessage(false));
  };

  const onCloseSnilsFoundModal = () => {
    dispatch(setSnilsFoundMessage(false));
    setErrorSnilsMessage(false);
  };

  const onSubmitUnknown = () => {
    const dateNow = new Date();
    const dayNow = dateNow.getUTCDate();
    const monthNow = dateNow.getUTCMonth() + 1;
    const yearNow = dateNow.getUTCFullYear();
    const yearUnknown = yearNow - parseInt(formUnknownValues.ageUnknown);
    if (showUnknown) {
      formProps.setFieldValue(`${addressValuePath}.isKLADR`, false);
      formProps.setFieldValue(`${addressValuePath}.freeInput`, formUnknownValues.addressUnknown);
      formProps.setFieldValue(`${addressValuePath}.area`, '');
      formProps.setFieldValue(`${addressValuePath}.city`, '');
      formProps.setFieldValue(`${sectionValuePath}.birthDate`, `${yearUnknown}-${monthNow}-${dayNow}`);
    }
    setShowUnknown(false);
  };

  const onCloseUnknownInfoModal = () => {
    setShowUnknown(false);
  };

  const snilsAlert = () => (
    <p style={{color: '#ff4d4f', fontSize: '12px', fontWeight: 600, marginBottom: 0}}>
      {snilsWarning}
    </p>
  );

  const dataCapitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <>
      <form className="wizard-step registration-form">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Checkbox
            name={`isUnknown`}
            onChange={formProps.handleChange}
            checked={formIsUnknown}>
            Неизвестный
          </Checkbox>
          <Checkbox
            name={`${sectionValuePath}.isShiftWorker`}
            onChange={formProps.handleChange}
            checked={formProps.values.personal.isShiftWorker}>
            Вахтовик
          </Checkbox>
        </div>
        <Divider />
        <FormField label="Код">
          <FastInput disabled name={'personal.code'} />
        </FormField>
        <FormField label="Фамилия" name={'personal.lastName'}>
          <FastInput name={'personal.lastName'} />
        </FormField>
        <FormField label="Имя" name={'personal.firstName'}>
          <FastInput name={'personal.firstName'} />
        </FormField>
        <FormField label="Отчество" name={'personal.patrName'}>
          <FastInput name={'personal.patrName'} />
        </FormField>
        <Divider />
        <Row gutter={16}>
          <Col xl={16} xxl={12}>
            <FormField label="Дата рождения" name={`${sectionValuePath}.birthDate`}>
              <FastDatePicker name={`${sectionValuePath}.birthDate`}/>
            </FormField>
          </Col>
          <Col xl={16} xxl={12}>
            <FormField label="Время рождения">
              {/*todo make birthTime correct binding*/}
              {/* todo make correct bindings */}
              <TimePicker
                format='HH:mm'
                name={`personal.birthTime`}
                value={tbValue}
                onChange={(_, timeString) => {
                  _ ? setTbValue(moment(_, "HH:ss")) : setTbValue(undefined);
                  formProps.setFieldValue(
                    `${sectionValuePath}.birthTime`,
                   timeString,
                 );
                }}
              />
              {/*<TimePicker
                name={`personal.birthTime`}
                value={formValues.birthTime}
                onChange={(value) => formProps.setFieldValue(`${sectionValuePath}.birthTime`, value)}
                clockIcon={null}
                format="H:mm"
                disableClock
              />*/}
            </FormField>
          </Col>
        </Row>
        <div className="registration-form__general">
          <Row gutter={16}>
            <Col>
              <FormField label="Рост" name={'personal.height'}>
                <FastInputNumber min={0} name={'personal.height'} />
              </FormField>
            </Col>
            <Col>
              <FormField label="Вес" name={'personal.weight'}>
                <FastInputNumber min={0} name={'personal.weight'} />
              </FormField>
            </Col>
            <Col style={
              meta.error && meta.touched
                ? {border: '1px solid red', backgroundColor: 'rgba(255, 0, 0, 0.1)'}
                : {}
            }>
              <FormField label="Пол" name={`${sectionValuePath}.sex`}>
                <RadioGroup
                  name={`${sectionValuePath}.sex`}
                  value={formProps.values.personal.sex}
                  onChange={formProps.handleChange}>
                  <Radio value={0}>М</Radio>
                  <Radio value={1}>Ж</Radio>
                </RadioGroup>
              </FormField>
            </Col>
          </Row>
        </div>
        <Divider />
        <div>
          <Row gutter={16} align={'top'}>
            <Col span={16}>
              <FormField label="СНИЛС" name={'personal.snils'}>
                <Row>
                  <Col span={16}>
                    <FastMaskedInput
                      name={'personal.snils'}
                      mask="111-111-111 11"
                    />
                  </Col>
                  <Col span={8}>
                    <Button type="primary" loading={isLoading} onClick={onSnilsSearch}>
                      Искать
                    </Button>
                  </Col>
                </Row>
                {snilsWarning && snilsAlert()}
              </FormField>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <FormField label="Причина отсутствия СНИЛС" name={`${sectionValuePath}.SNILSMissingReason`}>
                <FastSearchSelect
                  name={`${sectionValuePath}.SNILSMissingReason`}
                  allowClear
                  loading={isSMRLoading}
                  disabled={isSMRLoading}
                >
                  {getPropsOptions(SNILSMissingReasons)}
                </FastSearchSelect>
              </FormField>
            </Col>
          </Row>
        </div>
        <Divider />
        <div>
          <FormField label="Место рождения">
            <FastInput name={'personal.birthPlace'} />
          </FormField>
        </div>
        <Divider />
        <div className="registration-form__actions">
          <Button type="link" danger onClick={onCancel}>
            Отмена
          </Button>
          <Button
            onClick={() => {
              Object.keys(errors).length > 0 && onOpen();
              formProps.handleSubmit();
            }}
            className="save-btn">
            Сохранить
          </Button>
        </div>
      </form>
      <SnilsFound
        isVisible={snilsFoundMessage && !isLoading}
        onClose={onCloseSnilsFoundModal}
        data={items}
        onOk={onSelectSnils}
        errorMessage={errorSnilsMessage}
      />
      <UnknownInfo
        isVisible={showUnknown}
        onCancel={onCloseUnknownInfoModal}
        onOk={onSubmitUnknown}
      />
    </>
  );
};

export default UserInfo;
