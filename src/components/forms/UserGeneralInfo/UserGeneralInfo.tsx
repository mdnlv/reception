import React, { FC } from 'react';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Input,
  Radio,
  Row,
  Select,
  TimePicker,
} from 'antd';
import RadioGroup from 'antd/es/radio/group';
import { useFormikContext } from 'formik';
import moment from 'moment';
import { useSelector } from 'react-redux';

import './styles.scss';
import { detailedPersonsSelector } from '../../../reduxStore/slices/rb/selectors';
import { WizardStateType } from '../wizards/RegCardWizard/types';

import FormField from '../components/FormField/FormField';

const UserGeneralInfo: FC = () => {
  const formProps = useFormikContext<WizardStateType>();
  const personsList = useSelector(detailedPersonsSelector);

  const personsOptions = personsList.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  return (
    <form className="registration-form">
      <FormField label="Код">
        <Input
          name={'code'}
          value={formProps.values.personal.code}
          onChange={formProps.handleChange}
        />
      </FormField>
      <FormField label="Фамилия">
        <Input
          name={'lastName'}
          value={formProps.values.personal.lastName}
          onChange={formProps.handleChange}
        />
      </FormField>
      <FormField label="Имя">
        <Input
          name={'firstName'}
          value={formProps.values.personal.firstName}
          onChange={formProps.handleChange}
        />
      </FormField>
      <FormField label="Отчество">
        <Input
          name={'patrName'}
          value={formProps.values.personal.patrName}
          onChange={formProps.handleChange}
        />
      </FormField>
      <Divider />
      <div className="registration-form__dates">
        <Row gutter={16}>
          <Col span={12}>
            <FormField label="Дата">
              <DatePicker
                value={
                  formProps.values.personal.birthDate
                    ? moment(formProps.values.personal.birthDate)
                    : undefined
                }
                onChange={(_, dateString) => {
                  formProps.setFieldValue('birthDate', dateString);
                }}
              />
            </FormField>
          </Col>
          <Col span={12}>
            <FormField label="Время">
              <TimePicker
                format={'HH:mm'}
                value={
                  formProps.values.personal.birthTime
                    ? moment(formProps.values.personal.birthTime)
                    : undefined
                }
                onChange={(_, dateString) => {
                  formProps.setFieldValue('personal.birthTime', dateString);
                }}
              />
            </FormField>
          </Col>
        </Row>
      </div>
      <div className="registration-form__general">
        <Row gutter={16}>
          <Col span={14}>
            <FormField label="Пол">
              <RadioGroup
                name={'personal.sex'}
                value={formProps.values.personal.sex}
                onChange={formProps.handleChange}>
                <Radio value={0}>М</Radio>
                <Radio value={1}>Ж</Radio>
              </RadioGroup>
            </FormField>
          </Col>
          <Col span={5}>
            <FormField label="Рост">
              <Input
                name={'personal.height'}
                value={formProps.values.personal.height}
                onChange={formProps.handleChange}
              />
            </FormField>
          </Col>
          <Col span={5}>
            <FormField label="Вес">
              <Input
                name={'personal.weight'}
                value={formProps.values.personal.weight}
                onChange={formProps.handleChange}
              />
            </FormField>
          </Col>
        </Row>
      </div>
      <Divider />
      <div>
        <FormField label="СНИЛС">
          <Input
            name={'personal.snils'}
            value={formProps.values.personal.snils}
            onChange={formProps.handleChange}
          />
        </FormField>
        <FormField label="Лечащий врач">
          <Select
            showSearch
            filterOption
            optionFilterProp={'name'}
            value={formProps.values.personal.docPersonId}
            onChange={(val) => {
              formProps.setFieldValue('personal.docPersonId', val);
            }}>
            {personsOptions}
          </Select>
        </FormField>
        <div>
          <Radio>импланты</Radio>
          <Radio>протезы</Radio>
        </div>
      </div>
      <Divider />
      <div>
        <FormField label="Дата начала карты">
          <DatePicker
            value={
              formProps.values.personal.startCardDate
                ? moment(formProps.values.personal.startCardDate)
                : undefined
            }
            onChange={(_, dateString) => {
              formProps.setFieldValue('personal.startCardDate', dateString);
            }}
          />
        </FormField>

        <div>
          <Checkbox
            checked={formProps.values.personal.hasCard}
            name="personal.hasCard"
            onChange={formProps.handleChange}
            className={'is-ready-card is-radio-btn'}>
            карта заведена
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={formProps.values.personal.onlyTempRegistration}
            name={'personal.onlyTempRegistration'}
            onChange={formProps.handleChange}
            className={'is-temporary-registration is-radio-btn'}>
            есть только временная регистрация
          </Checkbox>
        </div>
      </div>
      <Divider />
      <div>
        <FormField label="Место рождения">
          <Input
            value={formProps.values.personal.birthPlace}
            name={'personal.birthPlace'}
            onChange={formProps.handleChange}
          />
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

export default UserGeneralInfo;
