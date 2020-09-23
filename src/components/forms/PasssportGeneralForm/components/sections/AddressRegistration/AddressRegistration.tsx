import React, { FC, useEffect } from 'react';
import { Checkbox, Col, Input, Row, Select, Radio } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import FormState from '../../../types';
import { useFormikContext } from 'formik';

interface SectionProps {
  kladr: { id: string; name: string; socr: string; prefix: string }[];
  nestedKladr: { id: string; name: string; socr: string; prefix: string }[];
  kladrStreets: {};
  getKladrNested(id: string): void;
}

const AddressRegistration: FC<SectionProps> = (props) => {
  const form = useFormikContext<FormState>();

  function getKladrDetailed(
    kladrArr: { id: string; name: string; socr: string }[],
  ) {
    return kladrArr.map((item) => (
      <Select.Option
        key={item.id}
        name={`${item.socr}. ${item.name}`}
        value={item.id}>
        {`${item.socr}. ${item.name}`}
      </Select.Option>
    ));
  }

  return (
    <div className="form-section address-registration">
      <h2>Адрес регистрации</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <Radio.Group
            value={form.values.passportInfo.addressRegistration.isKLADR}
            name={'passportInfo.addressRegistration.isKLADR'}
            onChange={form.handleChange}>
            <Radio value={true}>КЛАДР</Radio>
            <Radio value={false}>Сельский житель</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <FormField>
            <Select
              value={form.values.passportInfo.addressRegistration.area}
              onChange={(val) => {
                form.setFieldValue(
                  'passportInfo.addressRegistration.area',
                  val,
                );
              }}
              placeholder={'Область'}
              showSearch
              filterOption
              optionFilterProp={'name'}>
              {getKladrDetailed(props.kladr)}
            </Select>
          </FormField>
        </Col>
        <Col span={8}>
          <FormField>
            <Select
              disabled={!form.values.passportInfo.addressRegistration.area}
              onFocus={() => {
                props.getKladrNested(
                  form.values.passportInfo.addressRegistration.area,
                );
              }}
              value={form.values.passportInfo.addressRegistration.city}
              onChange={(val) => {
                form.setFieldValue(
                  'passportInfo.addressRegistration.city',
                  val,
                );
              }}
              placeholder={'Город'}
              showSearch
              filterOption
              optionFilterProp={'name'}>
              {getKladrDetailed(props.nestedKladr)}
            </Select>
          </FormField>
        </Col>
      </Row>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <FormField>
            <Select placeholder={'Улица'} />
          </FormField>
        </Col>
        <Col span={8}>
          <Row gutter={16}>
            <Col span={8}>
              <FormField>
                <Input
                  name={'passportInfo.addressRegistration.houseNumber'}
                  value={
                    form.values.passportInfo.addressRegistration.houseNumber
                  }
                  onChange={form.handleChange}
                />
              </FormField>
            </Col>
            <Col span={8}>
              <FormField>
                <Input
                  name={'passportInfo.addressRegistration.flatNumber'}
                  value={
                    form.values.passportInfo.addressRegistration.flatNumber
                  }
                  onChange={form.handleChange}
                />
              </FormField>
            </Col>
            <Col span={8}>
              <FormField>
                <Input
                  name={'passportInfo.addressRegistration.flatNumber'}
                  value={
                    form.values.passportInfo.addressRegistration.flatNumber
                  }
                  onChange={form.handleChange}
                />
              </FormField>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <FormField>
            <Checkbox
              checked={
                form.values.passportInfo.documentedAddress.isDocumentedAddress
              }
              name={'passportInfo.documentedAddress.isDocumentedAddress'}
              onChange={form.handleChange}>
              Соответствует адресу прописки
            </Checkbox>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default AddressRegistration;
