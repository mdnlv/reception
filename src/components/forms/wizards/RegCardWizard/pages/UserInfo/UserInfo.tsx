import React from 'react';
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
import moment from 'moment';
import RadioGroup from 'antd/es/radio/group';
import { useSelector } from 'react-redux';

import { WizardStateType } from '../../types';
import { detailedPersonsSelector } from '../../../../../../reduxStore/slices/rb/selectors';

import FormField from '../../../../components/FormField/FormField';
import FastInput from '../../../../components/fields/FastInput/FastInput';
import FastMaskedInput from '../../../../components/fields/FastMaskedInput/FastMaskedInput';
import FastInputNumber from '../../../../components/fields/FastInputNumber/FastInpuNumber';
import FastDatePicker from '../../../../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';

const UserInfo: React.FC = () => {
  const formProps = useFormikContext<WizardStateType>();
  const persons = useSelector(detailedPersonsSelector);

  const sectionValuePath = `personal`;

  const personsOptions = persons.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

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
      <div className="registration-form__dates">
        <Row gutter={16}>
          <Col span={12}>
            <FormField label="Дата рождения">
              <FastDatePicker
                name={`${sectionValuePath}.birthDate`}
                value={
                  formProps.values.personal.birthDate
                    ? moment(formProps.values.personal.birthDate)
                    : undefined
                }
              />
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
      </div>
      <div className="registration-form__general">
        <Row gutter={16}>
          <Col>
            <FormField label="Рост">
              <FastInputNumber min={0} name={'personal.height'} />
            </FormField>
          </Col>
          <Col>
            <FormField label="Вес">
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
        <FormField label="СНИЛС">
          <FastMaskedInput name={'personal.snils'} mask="111-111-111 11"/>
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
          <FastDatePicker
            name={`${sectionValuePath}.startCardDate`}
            value={
              formProps.values.personal.startCardDate
                ? moment(formProps.values.personal.startCardDate)
                : undefined
            }
          />
        </FormField>
        <div>
          <Checkbox
            name={`${sectionValuePath}.hasCard`}
            checked={formProps.values.personal.hasCard}
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
            formProps.handleSubmit();
          }}
          className="save-btn">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default UserInfo;
