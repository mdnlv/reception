import React, { FC, useEffect, useState } from 'react';
import { Checkbox, Col, Radio, Row, Select } from 'antd';
import { useFormikContext } from 'formik';

import {KladrDocType} from "../../../../../../../../reduxStore/slices/registrationCard/types";
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
  const [isDocumentedAddress, setIsDocumentedAddress] = useState(false);
  const form = useFormikContext<WizardStateType>();

  const formValues = form.values.passportGeneral;
  const sectionValuePath = `passportGeneral.passportInfo.${passportType}`;

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

  useEffect(() => {
    formValues.passportInfo['addressRegistration'].isDocumentedAddress ? setIsDocumentedAddress(true) : setIsDocumentedAddress(false);
  }, [formValues.passportInfo['addressRegistration'].isDocumentedAddress]);

  useEffect(() => {
    if (formValues.passportInfo[passportType].isKLADR) {
      form.setFieldValue(`${sectionValuePath}.freeInput`, '');
    } else {
      for (let key in formValues.passportInfo[passportType]) {
        if (key !== 'freeInput' && key !== 'isKLADR' && key !== 'isDocumentedAddress') {
          form.setFieldValue(`${sectionValuePath}[${key}]`, '');
        }
      }
    }
  }, [formValues.passportInfo[passportType].isKLADR]);

  useEffect(() => {
    if (isDocumentedAddress && passportType !== 'documentedAddress') {
      form.setFieldValue(`${sectionValuePath}.isKLADR`, formValues.passportInfo['documentedAddress'].isKLADR);
    } else {
      form.setFieldValue(`${sectionValuePath}.isKLADR`, formValues.passportInfo[passportType].isKLADR);
    }
  }, [isDocumentedAddress, formValues.passportInfo['documentedAddress'].isKLADR]);

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
        return 'Адрес регистрации';
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

  const setValue = (field: string) => {
    if (isDocumentedAddress && passportType !== 'documentedAddress') {
      return formValues.passportInfo['documentedAddress'][field]
    } else {
      return formValues.passportInfo[passportType][field]
    }
  }

  const setDisabled = () => isDocumentedAddress && (passportType !== 'documentedAddress');

  // const setInputDisabled = () => {
  //   if (!formValues.passportInfo[passportType].area && !formValues.passportInfo[passportType].street)
  // };

  return (
    <div className="form-section address-registration">
      <h2>{getTitle()}</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <Radio.Group
            value={
              isDocumentedAddress && passportType !== 'documentedAddress'
                ? formValues.passportInfo['documentedAddress'].isKLADR
                : formValues.passportInfo[passportType].isKLADR
            }
            disabled={setDisabled()}
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
                  valueSet={setValue('area')}
                  value={setValue('area')}
                  placeholder={'Область'}
                  showSearch
                  filterOption
                  isDisabled={setDisabled()}
                  optionFilterProp={'name'}>
                  {getKladrDetailed(kladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladrNested}
                  isDisabled={setDisabled()
                  || !formValues.passportInfo[passportType].area
                  || formValues.passportInfo[passportType].area === '7800000000000'
                  || formValues.passportInfo[passportType].area === '7700000000000'
                  || formValues.passportInfo[passportType].area === '9200000000000'
                  }
                  onFocus={() => {
                    getKladrNested(
                      formValues.passportInfo[passportType].area,
                      getType(),
                    );
                  }}
                  valueSet={setValue('city')}
                  value={setValue('city')}
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
                  isDisabled={
                    setDisabled()
                    ||
                    (
                      formValues.passportInfo[passportType].area !== '7800000000000'
                      && formValues.passportInfo[passportType].area !== '7700000000000'
                      && formValues.passportInfo[passportType].area !== '9200000000000'
                      && !formValues.passportInfo[passportType].city
                    )
                  }
                  onFocus={() => {
                    getKladrStreets(
                      (
                        formValues.passportInfo[passportType].area === '7800000000000'
                        || formValues.passportInfo[passportType].area === '7700000000000'
                        || formValues.passportInfo[passportType].area === '9200000000000'
                          ? formValues.passportInfo[passportType].area
                          : formValues.passportInfo[passportType].city
                      ),
                      getType(),
                    );
                  }}
                  valueSet={setValue('street')}
                  value={setValue('street')}
                  placeholder={'Улица'}
                  name={`${sectionValuePath}.street`}
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
                    <FastInput
                      name={`${sectionValuePath}.houseNumber`}
                      disabled={setDisabled() || !formValues.passportInfo[passportType].area || !formValues.passportInfo[passportType].street}
                      valueSet={setValue('houseNumber')}
                      value={setValue('houseNumber')}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.houseCharacter`}
                      disabled={setDisabled() || !formValues.passportInfo[passportType].area || !formValues.passportInfo[passportType].street}
                      valueSet={setValue('houseCharacter')}
                      value={setValue('houseCharacter')}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.flatNumber`}
                      disabled={setDisabled() || !formValues.passportInfo[passportType].area || !formValues.passportInfo[passportType].street}
                      valueSet={setValue('flatNumber')}
                      value={setValue('flatNumber')}
                    />
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
                <FastInput
                  name={`${sectionValuePath}.freeInput`}
                  disabled={setDisabled()}
                  valueSet={setValue('freeInput')}
                  value={setValue('freeInput')}
                />
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
                  formValues.passportInfo['addressRegistration'].isDocumentedAddress
                }
                name={`${sectionValuePath}.isDocumentedAddress`}
                onChange={form.handleChange}
              >
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
