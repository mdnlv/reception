import React from 'react';
import { useFormikContext } from 'formik';
import { RegistrationCardState } from '../../../../../../store/registrationCard/types';
import FormField from '../../../../components/FormField/FormField';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  TimePicker,
} from 'antd';
import moment from 'moment';
import RadioGroup from 'antd/es/radio/group';
import { useSelector } from 'react-redux';
import { detailedPersonsSelector } from '../../../../../../store/rb/selectors';
import optionsListMapper from '../../../../../../utils/mappers/optionsListMapper';

const UserInfo: React.FC = (props) => {
  const formProps = useFormikContext<RegistrationCardState>();
  const persons = useSelector(detailedPersonsSelector);

  const sectionValuePath = `personal`;
  const personsOptions = optionsListMapper(persons);

  return (
    <form className="wizard-step registration-form">
      <FormField label="Код">
        <Input
          name={`${sectionValuePath}.code`}
          value={formProps.values.personal.code}
          onChange={formProps.handleChange}
        />
      </FormField>
      <FormField label="Фамилия">
        <Input
          name={`${sectionValuePath}.lastName`}
          value={formProps.values.personal.lastName}
          onChange={formProps.handleChange}
        />
      </FormField>
      <FormField label="Имя">
        <Input
          name={`${sectionValuePath}.firstName`}
          value={formProps.values.personal.firstName}
          onChange={formProps.handleChange}
        />
      </FormField>
      <FormField label="Отчество">
        <Input
          name={`${sectionValuePath}.patrName`}
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
                onChange={(date, dateString) => {
                  formProps.setFieldValue(
                    `${sectionValuePath}.birthDate`,
                    dateString,
                  );
                }}
              />
            </FormField>
          </Col>
          <Col span={12}>
            <FormField label="Время">
              <TimePicker
                format={'HH:mm'}
                value={
                  formProps.values.personal.birthDate
                    ? moment(formProps.values.personal.birthDate)
                    : undefined
                }
                onChange={(date, dateString) => {
                  formProps.setFieldValue(
                    `${sectionValuePath}.birthDate`,
                    date?.toISOString(),
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
              <InputNumber
                min={0}
                name={`${sectionValuePath}.height`}
                value={formProps.values.personal.height}
                onChange={(val) => {
                  formProps.setFieldValue(`${sectionValuePath}.height`, val);
                }}
              />
            </FormField>
          </Col>
          <Col>
            <FormField label="Вес">
              <InputNumber
                min={0}
                name={`${sectionValuePath}.weight`}
                value={formProps.values.personal.weight}
                onChange={(val) => {
                  formProps.setFieldValue(`${sectionValuePath}.weight`, val);
                }}
              />
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
          <Input
            name={`${sectionValuePath}.snils`}
            value={formProps.values.personal.snils}
            onChange={formProps.handleChange}
          />
        </FormField>
        <FormField label="Лечащий врач">
          <Select
            value={formProps.values.personal.docId}
            onChange={(val) => {
              formProps.setFieldValue(`${sectionValuePath}.docId`, val);
            }}
            showSearch
            filterOption
            optionFilterProp={'name'}>
            {personsOptions}
          </Select>
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
          <DatePicker
            value={
              formProps.values.personal.startCardDate
                ? moment(formProps.values.personal.startCardDate)
                : undefined
            }
            onChange={(date, dateTime) => {
              formProps.setFieldValue(
                `${sectionValuePath}.startCardDate`,
                dateTime,
              );
            }}
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
          <Input
            name={`${sectionValuePath}.birthPlace`}
            value={formProps.values.personal.birthPlace}
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

export default UserInfo;
