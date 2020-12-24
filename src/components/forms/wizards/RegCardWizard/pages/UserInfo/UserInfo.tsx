import React, {useState, useEffect} from 'react';
import { useFormikContext } from 'formik';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Radio,
  Row,
  Select,
  TimePicker
} from 'antd';
import RadioGroup from 'antd/es/radio/group';
import { useSelector } from 'react-redux';

import {WizardStateType} from '../../types';
import { detailedPersonsSelector } from '../../../../../../reduxStore/slices/rb/selectors';
import UserInfoTypes from "./types";

import FormField from '../../../../components/FormField/FormField';
import FastInput from '../../../../components/fields/FastInput/FastInput';
import FastMaskedInput from '../../../../components/fields/FastMaskedInput/FastMaskedInput';
import FastInputNumber from '../../../../components/fields/FastInputNumber/FastInpuNumber';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

const UserInfo: React.FC<UserInfoTypes> = ({errors, onOpen}) => {
  const formProps = useFormikContext<WizardStateType>();
  const persons = useSelector(detailedPersonsSelector);
  const formValues = formProps.values.personal;
  const sectionValuePath = `personal`;
  const [snilsWarning, setSnilsWarning] = useState('');

  useEffect(() => {
    const checking = snilsCheck(formValues.snils)
    !checking ? setSnilsWarning('Неправильная контрольная сумма, возможно неправильный СНИЛС') : setSnilsWarning('')
  }, [formValues.snils]);

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

  const personsOptions = persons.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  const snilsAlert = () => (
    <p style={{color: '#c2bd60', fontSize: '12px', fontWeight: 600, marginBottom: 0}}>
      {snilsWarning}
    </p>
  );

  return (
    <form className="wizard-step registration-form">
      <FormField label="Код">
        <FastInput disabled name={'personal.code'} />
      </FormField>
      <FormField label="Фамилия">
        <FastInput name={'personal.lastName'} />
      </FormField>
      <FormField label="Имя">
        <FastInput name={'personal.firstName'} />
      </FormField>
      <FormField label="Отчество">
        <FastInput name={'personal.patrName'} />
      </FormField>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <FormField label="Дата рождения" name={`${sectionValuePath}.birthDate`}>
            <FastDatePicker name={`${sectionValuePath}.birthDate`}/>
          </FormField>
        </Col>
        <Col span={12}>
          <FormField label="Время рождения">
            {/*todo make birthTime correct binding*/}
            {/* todo make correct bindings */}
            <TimePicker
              format={'HH:mm'}
              name={'personal.birthTime'}
              onChange={(_, timeString) => {
                formProps.setFieldValue(
                  `${sectionValuePath}.birthTime`,
                  timeString,
                );
              }}
            />
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
          <Col>
            <FormField label="Пол">
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
        <FormField label="СНИЛС" name={'personal.snils'}>
          <FastMaskedInput
            name={'personal.snils'}
            mask="111-111-111 11"
          />
          {snilsWarning && snilsAlert()}
        </FormField>
        <FormField label="Лечащий врач">
          <FastSearchSelect showSearch filterOption name={'name'}>
            {personsOptions}
          </FastSearchSelect>
        </FormField>
        <Row>
          <Col>
            <Checkbox
              name={`${sectionValuePath}.hasImplants`}
              onChange={formProps.handleChange}
              checked={formProps.values.personal.hasImplants}>
              импланты
            </Checkbox>
          </Col>
          <Col>
            <Checkbox
              name={`${sectionValuePath}.hasProsthesis`}
              onChange={formProps.handleChange}
              checked={formProps.values.personal.hasProsthesis}>
              протезы
            </Checkbox>
          </Col>
        </Row>
      </div>
      <Divider />
      <div>
        <FormField label="Дата начала карты">
          <FastDatePicker name={`${sectionValuePath}.startCardDate`}/>
        </FormField>
        <div>
          <Checkbox
            name={`${sectionValuePath}.hasCard`}
            checked={true}
            onChange={formProps.handleChange}>
            Карта заведена
          </Checkbox>
        </div>
        <div>
          <Checkbox
            name={`${sectionValuePath}.onlyTempRegistration`}
            checked={formProps.values.personal.onlyTempRegistration}
            onChange={formProps.handleChange}>
            Есть только временная регистрация
          </Checkbox>
        </div>
      </div>
      <Divider />
      <div>
        <FormField label="Место рождения">
          <FastInput name={'personal.birthPlace'} />
        </FormField>
      </div>
      <div className="registration-form__filter-action">
        <Button type="link" block>
          Обновить данные по фильтрам
        </Button>
      </div>
      <div className="registration-form__actions">
        <Button type="link" danger>
          Отмена
        </Button>
        <Button
          onClick={() => {
            Object.keys(errors).length > 0 && onOpen();
            formProps.handleSubmit()
          }}
          className="save-btn">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default UserInfo;
