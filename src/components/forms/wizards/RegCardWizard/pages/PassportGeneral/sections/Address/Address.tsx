import React, {FC, useEffect, useState} from 'react';
import {Checkbox, Col, Radio, Row, Select} from 'antd';
import {useFormikContext} from 'formik';
import {useDispatch, useSelector} from "react-redux";

import {KladrDocType} from "../../../../../../../../reduxStore/slices/registrationCard/types";
import {WizardStateType} from '../../../../types';
import {SectionProps, KladrItem} from "./types";
import {kladrSelector} from "../../../../../../../../reduxStore/slices/registrationCard/selectors";
import {setCityBuffer, setStreetBuffer} from '../../../../../../../../reduxStore/slices/registrationCard/registrationCardSlice'

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
  const [prevCity, setPrevCity] = useState('');
  const [prevStreet, setPrevStreet] = useState('');
  const form = useFormikContext<WizardStateType>();
  const {cityDocumented, streetDocumented} = useSelector(kladrSelector);
  const dispatch = useDispatch();
  const formValues = form.values.passportGeneral;
  const sectionValuePath = `passportGeneral.passportInfo.${passportType}`;
  // console.log(formValues)

  // useEffect(() => {
  //   console.log('formValues', formValues.passportInfo)
  // });

  //clear select fields after top-level select changed
  useEffect(() => {
    if (!formValues.passportInfo[passportType].street) {
      const toEmptyFields = ['houseNumber', 'flatNumber', 'houseCharacter'];
      toEmptyFields.map((item) => {
        form.setFieldValue(`${sectionValuePath}.${item}`, '');
      });
    }
  }, [formValues.passportInfo[passportType].street]);

  useEffect(() => {
    formValues.passportInfo[passportType].city && setPrevCity(formValues.passportInfo[passportType].city);
    formValues.passportInfo[passportType].city !== prevCity
      && form.setFieldValue(`${sectionValuePath}.street`, '');
  }, [formValues.passportInfo[passportType].city]);

  useEffect(() => {
    form.setFieldValue(`${sectionValuePath}.city`, '');
    if (
      formValues.passportInfo[passportType].area !== '7800000000000'
      && formValues.passportInfo[passportType].area !== '7700000000000'
      && formValues.passportInfo[passportType].area !== '9200000000000'
    ) {
      form.setFieldValue(`passportGeneral.passportInfo.documentedAddress.street`, '');
      form.setFieldValue(`passportGeneral.passportInfo.addressRegistration.street`, '');
    }
  }, [formValues.passportInfo[passportType].area]);

  useEffect(() => {
    formValues.passportInfo['addressRegistration'].isDocumentedAddress
      ? setIsDocumentedAddress(true)
      : setIsDocumentedAddress(false);
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

  useEffect(() => {
    const city = formValues.passportInfo['documentedAddress'].city;
    if (passportType === 'documentedAddress' && nestedKladr.length > 0) {
      const kladrItem = nestedKladr.find((item) => item.id === city)
      if (kladrItem) {
        dispatch(setCityBuffer({
          value: `${kladrItem.socr}. ${kladrItem.name}`,
          type: 'setCityBuffer'
        }))
      }
    }
    if (!formValues.passportInfo['documentedAddress'].city) {
      dispatch(setCityBuffer({
        value: '',
        type: 'setCityBuffer'
      }))
    }
  }, [formValues.passportInfo['documentedAddress'].city]);

  useEffect(() => {
    const street = formValues.passportInfo['documentedAddress'].street;
    if (passportType === 'documentedAddress' && kladrStreets.length > 0) {
      const kladrItem = kladrStreets.find((item) => item.id === street)
      if (kladrItem) {
        dispatch(setStreetBuffer({
          value: `${kladrItem.socr}. ${kladrItem.name}`,
          type: 'setStreetBuffer'
        }))
      }
    }
    if (!formValues.passportInfo['documentedAddress'].street) {
      dispatch(setStreetBuffer({
        value: '',
        type: 'setStreetBuffer'
      }))
    }
  }, [formValues.passportInfo['documentedAddress'].street]);

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
      if (field === 'city') {
        return cityDocumented
      } else if (field === 'street') {
        return streetDocumented
      }
      return formValues.passportInfo['documentedAddress'][field]
    } else {
      return formValues.passportInfo[passportType][field]
    }
  }

  const setDisabled = () => isDocumentedAddress && (passportType !== 'documentedAddress');

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
