import React, { FC, useEffect } from 'react';
import { Checkbox, Col, Radio, Row, Select } from 'antd';
import { useFormikContext } from 'formik';

import { KladrDocType } from '../../../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import { WizardStateType } from '../../../../types';
import {SectionProps, KladrItem} from "./types";

import FormField from '../../../../../../components/FormField/FormField';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';

const Address: FC<SectionProps> = ({
  passportType,
  kladr,
  nestedKladr,
  kladrStreets,
  isLoadingKladr,
  isLoadingKladrNested,
  isLoadingKladrStreets,
  getKladrNested,
  getKladrStreets
}) => {
  const form = useFormikContext<WizardStateType>();

  const formValues = form.values.passportGeneral;
  const sectionValuePath = `passportGeneral.passportInfo.${passportType}`;

  const getKladrDetailed = (kladrArr: KladrItem[]) => {
    return kladrArr.map((item) => (
      <Select.Option
        key={item.id}
        name={`${item.socr}. ${item.name}`}
        value={item.id}>
        {`${item.socr}. ${item.name}`}
      </Select.Option>
    ));
  }

  const getTitle = () => {
    switch (passportType) {
      case 'documentedAddress':
        return 'Адрес регистрация';
      case 'addressRegistration':
        return 'Адрес проживания';
    }
  }

  const getType = () => {
    let type: KladrDocType;
    switch (passportType) {
      case 'addressRegistration':
        type = 'registration';
        break;
      case 'documentedAddress':
        type = 'documented';
        break;
    }
    return type;
  }

  //clear select fields after top-level select changed
  useEffect(() => {
    const toEmptyFields = ['houseNumber', 'flatNumber', 'houseCharacter'];
    toEmptyFields.map((item) => {
      form.setFieldValue(`${sectionValuePath}.${item}`, '');
    });
  }, [formValues.passportInfo[passportType].street]);

  useEffect(() => {
    form.setFieldValue(`${sectionValuePath}.street`, '');
  }, [formValues.passportInfo[passportType].city]);

  useEffect(() => {
    form.setFieldValue(`${sectionValuePath}.city`, '');
  }, [formValues.passportInfo[passportType].area]);

  return (
    <div className="form-section address-registration">
      <h2>{getTitle()}</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <Radio.Group
            value={formValues.passportInfo[passportType].isKLADR}
            name={`${sectionValuePath}.isKLADR`}
            onChange={form.handleChange}>
            <Radio value={true}>КЛАДР</Radio>
            <Radio value={false}>Сельский житель</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {formValues.passportInfo[passportType].isKLADR && (
        <>
          <Row gutter={16} className="form-row">
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladr}
                  name={`${sectionValuePath}.area`}
                  value={formValues.passportInfo[passportType].area}
                  placeholder={'Область'}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(kladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladrNested}
                  disabled={!formValues.passportInfo[passportType].area}
                  onFocus={() => {
                    getKladrNested(
                      formValues.passportInfo[passportType].area,
                      getType(),
                    );
                  }}
                  value={formValues.passportInfo[passportType].city}
                  placeholder={'Город'}
                  name={`${sectionValuePath}.city`}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(nestedKladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
          </Row>
          <Row gutter={16} className="form-row">
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladrStreets}
                  disabled={!formValues.passportInfo[passportType].city}
                  onFocus={() => {
                    getKladrStreets(
                      formValues.passportInfo[passportType].city,
                      getType(),
                    );
                  }}
                  value={formValues.passportInfo[passportType].street}
                  placeholder={'Улица'}
                  name={'`${sectionValuePath}.street`'}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(kladrStreets)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={8}>
              <Row gutter={16}>
                <Col span={8}>
                  <FormField>
                    <FastInput name={`${sectionValuePath}.houseNumber`} />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput name={`${sectionValuePath}.houseCharacter`} />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput name={`${sectionValuePath}.flatNumber`} />
                  </FormField>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
      {!formValues.passportInfo[passportType].isKLADR && (
        <>
          <Row gutter={8}>
            <Col span={16}>
              <FormField>
                <FastInput name={`${sectionValuePath}.freeInput`} />
              </FormField>
            </Col>
          </Row>
        </>
      )}
      {passportType === 'addressRegistration' && (
        <Row gutter={8}>
          <Col span={16}>
            <FormField>
              <Checkbox
                checked={
                  formValues.passportInfo[passportType]
                    .isDocumentedAddress
                }
                name={`${sectionValuePath}.isDocumentedAddress`}
                onChange={form.handleChange}>
                Соответствует адресу прописки
              </Checkbox>
            </FormField>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Address;
