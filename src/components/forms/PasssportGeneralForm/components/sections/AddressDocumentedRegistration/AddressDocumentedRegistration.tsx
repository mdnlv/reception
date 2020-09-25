import React, { FC, useEffect, useState } from 'react';
import { Checkbox, Col, Input, Radio, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import FormState from '../../../types';
import { useFormikContext } from 'formik';
import { KladrDocType } from '../../../../../../store/registrationCard/types';

interface KladrItem {
  id: string;
  name: string;
  socr: string;
}

interface PrefixKladrItem extends KladrItem {
  prefix: string;
}

interface SectionProps {
  kladr: PrefixKladrItem[];
  nestedKladr: PrefixKladrItem[];
  kladrStreets: KladrItem[];
  isLoadingKladr: boolean;
  isLoadingKladrNested: boolean;
  isLoadingKladrStreets: boolean;
  getKladrNested(id: string, type: KladrDocType): void;
  getKladrStreets(id: string, type: KladrDocType): void;
}

const AddressDocumentedRegistration: FC<SectionProps> = (props) => {
  const form = useFormikContext<FormState>();

  function getKladrDetailed(kladrArr: KladrItem[]) {
    return kladrArr.map((item) => (
      <Select.Option
        key={item.id}
        name={`${item.socr}. ${item.name}`}
        value={item.id}>
        {`${item.socr}. ${item.name}`}
      </Select.Option>
    ));
  }

  //clear select fields after top-level select changed
  useEffect(() => {
    const toEmptyFields = ['houseNumber', 'flatNumber', 'houseCharacter'];
    toEmptyFields.map((item) => {
      form.setFieldValue(`passportInfo.documentedAddress.${item}`, '');
    });
  }, [form.values.passportInfo.documentedAddress.street]);

  useEffect(() => {
    form.setFieldValue('passportInfo.documentedAddress.street', '');
  }, [form.values.passportInfo.documentedAddress.city]);

  useEffect(() => {
    form.setFieldValue('passportInfo.documentedAddress.city', '');
  }, [form.values.passportInfo.documentedAddress.area]);

  return (
    <div className="form-section address-registration">
      <h2>Адрес регистрации</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <Radio.Group
            value={form.values.passportInfo.documentedAddress.isKLADR}
            name={'passportInfo.documentedAddress.isKLADR'}
            onChange={form.handleChange}>
            <Radio value={true}>КЛАДР</Radio>
            <Radio value={false}>Сельский житель</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {form.values.passportInfo.documentedAddress.isKLADR && (
        <>
          <Row gutter={16} className="form-row">
            <Col span={8}>
              <FormField>
                <Select
                  value={form.values.passportInfo.documentedAddress.area}
                  onChange={(val) => {
                    form.setFieldValue(
                      'passportInfo.documentedAddress.area',
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
                  loading={props.isLoadingKladrNested}
                  disabled={!form.values.passportInfo.documentedAddress.area}
                  onFocus={() => {
                    console.log(form.values.passportInfo);
                    props.getKladrNested(
                      form.values.passportInfo.documentedAddress.area,
                      'documented',
                    );
                  }}
                  value={form.values.passportInfo.documentedAddress.city}
                  onChange={(val) => {
                    if (form.values.passportInfo.documentedAddress.street) {
                      form.setFieldValue(
                        'passportInfo.documentedAddress.street',
                        '',
                      );
                    }
                    form.setFieldValue(
                      'passportInfo.documentedAddress.city',
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
                <Select
                  loading={props.isLoadingKladrStreets}
                  disabled={!form.values.passportInfo.documentedAddress.city}
                  onFocus={() => {
                    props.getKladrStreets(
                      form.values.passportInfo.documentedAddress.city,
                      'registration',
                    );
                  }}
                  value={form.values.passportInfo.documentedAddress.street}
                  onChange={(val) => {
                    form.setFieldValue(
                      'passportInfo.documentedAddress.street',
                      val,
                    );
                  }}
                  placeholder={'Улица'}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(props.kladrStreets)}
                </Select>
              </FormField>
            </Col>
            <Col span={8}>
              <Row gutter={16}>
                <Col span={8}>
                  <FormField>
                    <Input
                      name={'passportInfo.documentedAddress.houseNumber'}
                      value={
                        form.values.passportInfo.documentedAddress.houseNumber
                      }
                      placeholder={'Дом'}
                      onChange={form.handleChange}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <Input
                      name={'passportInfo.documentedAddress.houseCharacter'}
                      value={
                        form.values.passportInfo.documentedAddress
                          .houseCharacter
                      }
                      placeholder={'Корпус'}
                      onChange={form.handleChange}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <Input
                      name={'passportInfo.documentedAddress.flatNumber'}
                      value={
                        form.values.passportInfo.documentedAddress.flatNumber
                      }
                      placeholder={'Литера'}
                      onChange={form.handleChange}
                    />
                  </FormField>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
      {!form.values.passportInfo.documentedAddress.isKLADR && (
        <>
          <Row gutter={8}>
            <Col span={16}>
              <FormField>
                <Input
                  name={'passportInfo.documentedAddress.freeInput'}
                  value={form.values.passportInfo.documentedAddress.freeInput}
                  placeholder={'Адрес'}
                  onChange={(val) =>
                    form.setFieldValue(
                      'passportInfo.documentedAddress.freeInput',
                      val.target.value,
                    )
                  }
                />
              </FormField>
            </Col>
          </Row>
        </>
      )}
      <Row gutter={8}>
        <Col span={16}>
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

export default AddressDocumentedRegistration;
