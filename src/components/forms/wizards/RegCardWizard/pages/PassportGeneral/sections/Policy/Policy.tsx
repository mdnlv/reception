import React, {useCallback} from 'react';
import {Button, Col, Input, Row, Select, Space} from 'antd';
import {useFormikContext} from 'formik';
import moment from 'moment';

import {SectionProps, ListOptionItem, LABELS} from "./types";
import {RegistrationCardStateType} from '../../../../../../../../reduxStore/slices/registrationCard/types';

import FormField from '../../../../../../components/FormField/FormField';
import FastDatePicker from '../../../../../../components/fields/FastDatePicker/FastDatePicker';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';

const Policy: React.FC<SectionProps> = ({
    policyKey,
    policyType,
    policyTimeType
}) => {
    const form = useFormikContext<RegistrationCardStateType>();

    const formValues = form.values.form.passportGeneral[policyKey];
    const sectionValuePath = `passportGeneral.${policyKey}`;

    const getPropsOptions = useCallback(
      (props: ListOptionItem[]) =>
        props.map((item) => (
          <Select.Option key={item.id} value={item.id}>
              {item.name}
          </Select.Option>
        )),
      [],
    );

    const sectionTitle = () => {
        switch (policyKey) {
            case 'policyDms':
                return 'Полис ДМС';
            case 'policyOms':
                return 'Полис ОМС';
        }
    };

    return (
      <div
        className={`form-section policy-${
          policyKey === 'policyOms' ? 'omc' : 'dmc'
        }`}>
          <h2>{sectionTitle()}</h2>
          <Row className="form-row" align={'bottom'} gutter={16}>
              <Col span={4}>
                  <FormField>
                      <FastSearchSelect name={`${sectionValuePath}.timeType`}>
                          {getPropsOptions(policyTimeType)}
                      </FastSearchSelect>
                  </FormField>
              </Col>
              <Col span={5}>
                  <FormField label={LABELS.FROM}>
                      <FastDatePicker
                        value={
                            formValues[0].from ? moment(formValues[0].from) : undefined
                        }
                        name={`${sectionValuePath}.from`}
                      />
                  </FormField>
              </Col>
              <Col span={5}>
                  <FormField label={LABELS.TO}>
                      <FastDatePicker
                        value={formValues[0].to ? moment(formValues[0].to) : undefined}
                        name={`${sectionValuePath}.to`}
                      />
                  </FormField>
              </Col>
          </Row>
          <Row className="form-row" gutter={16}>
              <Col span={6}>
                  <FormField label={LABELS.SERIAL}>
                      <Input
                        name={`${sectionValuePath}.serial`}
                        value={formValues[0].serial}
                        onChange={form.handleChange}
                      />
                  </FormField>
              </Col>
              <Col span={18}>
                  <FormField label={LABELS.NUMBER}>
                      <Input
                        name={`${sectionValuePath}.number`}
                        value={formValues[0].number}
                        onChange={form.handleChange}
                      />
                  </FormField>
              </Col>
          </Row>
          <Row className="form-row" gutter={16}>
              <Col span={14}>
                  <FormField label={LABELS.CMO} labelPosition="left">
                      <Select />
                  </FormField>
              </Col>
              <Col span={10}>
                  <FormField>
                      <Select
                        value={formValues[0].type}
                        onChange={(val) => {
                            form.setFieldValue(`${sectionValuePath}.type`, val);
                        }}>
                          {getPropsOptions(policyType)}
                      </Select>
                  </FormField>
              </Col>
          </Row>
          <Row className="form-row">
              <Col span={24}>
                  <FormField labelPosition="left" label={LABELS.NAME}>
                      <Input
                        name={`${sectionValuePath}.name`}
                        value={formValues[0].name}
                        onChange={form.handleChange}
                      />
                  </FormField>
              </Col>
          </Row>
          <Row className="form-row">
              <Col span={24}>
                  <FormField labelPosition="left" label={LABELS.NOTE}>
                      <Input
                        name={`${sectionValuePath}.note`}
                        value={formValues[0].note}
                        onChange={form.handleChange}
                      />
                  </FormField>
              </Col>
          </Row>
          <Row className="form-row" justify={'end'}>
              <Col>
                  <Space>
                      <Button type={'link'} danger>
                          Закрыть полис
                      </Button>
                      <Button type={'primary'}>Добавить полис</Button>
                  </Space>
              </Col>
          </Row>
      </div>
    );
};

export default Policy;
