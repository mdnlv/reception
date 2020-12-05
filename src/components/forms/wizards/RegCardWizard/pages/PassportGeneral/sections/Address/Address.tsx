import React, { FC, useEffect, useState } from 'react';
import { Checkbox, Col, Radio, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { KladrDocType } from '../../../../../../../../reduxStore/slices/registrationCard/types';
import { WizardStateType } from '../../../../types';
import { SectionProps, KladrItem } from './types';
import { kladrSelector } from '../../../../../../../../reduxStore/slices/registrationCard/selectors';
import {setDocumentedBuffer, fetchKladr} from '../../../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';

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
  getKladrStreets,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isDocumentedAddress, setIsDocumentedAddress] = useState(false);
  const [prevCity, setPrevCity] = useState('');
  const [cleanable, setCleanable] = useState(false);
  const form = useFormikContext<WizardStateType>();
  const {documentedBuffer} = useSelector(kladrSelector);
  const dispatch = useDispatch();
  const formValues = form.values.passportGeneral;
  const formInitialValues = form.initialValues.passportGeneral.passportInfo[passportType];
  const sectionValuePath = `passportGeneral.passportInfo.${passportType}`;

  useEffect(() => {
    if (formInitialValues.area) {
      form.setFieldValue(`${sectionValuePath}.area`, '');
      form.setFieldValue(`${sectionValuePath}.area`, formInitialValues.area);
    } else if (!formInitialValues.area && id === 'new') {
      dispatch(fetchKladr({}));
      form.setFieldValue(`${sectionValuePath}.area`, '7800000000000');
    }
  }, [formInitialValues.area])

  useEffect(() => {
    dispatch(setDocumentedBuffer({value: formValues.passportInfo.documentedAddress, type: 'setDocumentedBuffer'}))
  }, [formValues.passportInfo.documentedAddress]);

  useEffect(() => {
    if (isDocumentedAddress && passportType !== 'documentedAddress') {
      if (formValues.passportInfo[passportType].area ===
        '7800000000000' ||
        formValues.passportInfo[passportType].area ===
        '7700000000000' ||
        formValues.passportInfo[passportType].area ===
        '9200000000000') {
        getKladrStreets(formValues.passportInfo[passportType].area, getType());
      } else {
        getKladrNested(formValues.passportInfo[passportType].area, getType());
      }
    }
  },[
    isDocumentedAddress,
    formValues.passportInfo.documentedAddress.city,
    formValues.passportInfo.documentedAddress.area
  ]);

  useEffect(() => {
    if (isDocumentedAddress && passportType !== 'documentedAddress') {
      if (formValues.passportInfo[passportType].area ===
        '7800000000000' ||
        formValues.passportInfo[passportType].area ===
        '7700000000000' ||
        formValues.passportInfo[passportType].area ===
        '9200000000000') {
        getKladrStreets(formValues.passportInfo[passportType].area, getType());
      } else {
        getKladrStreets(formValues.passportInfo[passportType].city, getType());
      }
    }
  },[
    isDocumentedAddress,
    formValues.passportInfo.documentedAddress.street,
  ]);

  useEffect(() => {
    if (formInitialValues.street) {
      if (formValues.passportInfo[passportType].area ===
        '7800000000000' ||
        formValues.passportInfo[passportType].area ===
        '7700000000000' ||
        formValues.passportInfo[passportType].area ===
        '9200000000000') {
        getKladrStreets(formValues.passportInfo['documentedAddress'].area, getType());
      } else {
        getKladrStreets(formValues.passportInfo['documentedAddress'].city, getType());
      }
    }
  }, [formInitialValues.street]);

  //clear select fields after top-level select changed
  useEffect(() => {
    if (!formValues.passportInfo[passportType].street) {
      const toEmptyFields = ['houseNumber', 'flatNumber', 'houseCharacter'];
      toEmptyFields.map((item) => {
        form.setFieldValue(`${sectionValuePath}.${item}`, '');
      });
    }
  }, [formValues.passportInfo[passportType].street]);

  //очистка улицы и текстовых инпутов после изменения города
  useEffect(() => {
    formValues.passportInfo[passportType].city &&
      setPrevCity(formValues.passportInfo[passportType].city);
    formValues.passportInfo[passportType].city !== prevCity &&
      form.setFieldValue(`${sectionValuePath}.street`, '');
  }, [formValues.passportInfo[passportType].city]);

  // очистка города после изменения области
  useEffect(() => {
    if (cleanable) {
      form.setFieldValue(`${sectionValuePath}.city`, '');
      form.setFieldValue(`${sectionValuePath}.street`, '');
    }
  }, [formValues.passportInfo[passportType].area]);

  useEffect(() => {
    passportType !== 'documentedAddress' && formValues.passportInfo[passportType].isDocumentedAddress
      ? setIsDocumentedAddress(true)
      : setIsDocumentedAddress(false);
  }, [formValues.passportInfo[passportType].isDocumentedAddress]);

  //очистка форм в зависимости от радиокнопок
  useEffect(() => {
    if (formValues.passportInfo[passportType].isKLADR) {
      form.setFieldValue(`${sectionValuePath}.freeInput`, '');
    } else {
      for (let key in formValues.passportInfo[passportType]) {
        if (
          key !== 'freeInput' &&
          key !== 'isKLADR' &&
          key !== 'isDocumentedAddress'
        ) {
          form.setFieldValue(`${sectionValuePath}[${key}]`, '');
        }
      }
    }
  }, [formValues.passportInfo[passportType].isKLADR]);

  //изменение состояния радиокнопок обеих форм в зависимости от isDocumentedAddress
  useEffect(() => {
    if (isDocumentedAddress && passportType !== 'documentedAddress') {
      form.setFieldValue(
        `${sectionValuePath}.isKLADR`,
        formValues.passportInfo['documentedAddress'].isKLADR,
      );
    } else {
      form.setFieldValue(
        `${sectionValuePath}.isKLADR`,
        formValues.passportInfo[passportType].isKLADR,
      );
    }
  }, [
    isDocumentedAddress,
    formValues.passportInfo['documentedAddress'].isKLADR,
  ]);

  const getKladrDetailed = (kladrArr: KladrItem[]) => {
    return kladrArr.map((item) => (
      <Select.Option
        key={item.id}
        name={`${item.socr}. ${item.name}`}
        value={item.id}>
        {`${item.socr}. ${item.name}`}
      </Select.Option>
    ));
  };

  const getTitle = () => {
    switch (passportType) {
      case 'documentedAddress':
        return 'Адрес регистрации';
      case 'addressRegistration':
        return 'Адрес проживания';
    }
  };

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
  };

  const setValue = (field: string) => {
    if (isDocumentedAddress && passportType !== 'documentedAddress' && formValues.passportInfo['documentedAddress'].area) {
      formValues.passportInfo[passportType][field] = documentedBuffer[field];
      return formValues.passportInfo[passportType][field]
    } else {
      return formValues.passportInfo[passportType][field];
    }
  };

  const setDisabled = () =>
    isDocumentedAddress && passportType !== 'documentedAddress';

  return (
    <div className="form-section address-registration">
      <h2>{getTitle()}</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <Radio.Group
            value={setValue('isKLADR')}
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
                  value={setValue('area')}
                  placeholder={'Область'}
                  onFocus={() => setCleanable(true)}
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
                  isDisabled={
                    setDisabled() ||
                    !formValues.passportInfo[passportType].area ||
                    formValues.passportInfo[passportType].area ===
                      '7800000000000' ||
                    formValues.passportInfo[passportType].area ===
                      '7700000000000' ||
                    formValues.passportInfo[passportType].area ===
                      '9200000000000'
                  }
                  onFocus={() => {
                    getKladrNested(
                      formValues.passportInfo[passportType].area,
                      getType(),
                    );
                  }}
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
                    setDisabled() ||
                    (formValues.passportInfo[passportType].area !==
                      '7800000000000' &&
                      formValues.passportInfo[passportType].area !==
                        '7700000000000' &&
                      formValues.passportInfo[passportType].area !==
                        '9200000000000' &&
                      !formValues.passportInfo[passportType].city)
                  }
                  onFocus={() => {
                    getKladrStreets(
                      formValues.passportInfo[passportType].area ===
                        '7800000000000' ||
                        formValues.passportInfo[passportType].area ===
                          '7700000000000' ||
                        formValues.passportInfo[passportType].area ===
                          '9200000000000'
                        ? formValues.passportInfo[passportType].area
                        : formValues.passportInfo[passportType].city,
                      getType(),
                    );
                  }}
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
                      placeholder='Дом'
                      disabled={
                        setDisabled() ||
                        !formValues.passportInfo[passportType].area ||
                        !formValues.passportInfo[passportType].street
                      }
                      value={setValue('houseNumber')}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.houseCharacter`}
                      placeholder='Корпус'
                      disabled={
                        setDisabled() ||
                        !formValues.passportInfo[passportType].area ||
                        !formValues.passportInfo[passportType].street
                      }
                      value={setValue('houseCharacter')}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.flatNumber`}
                      placeholder='Квартира'
                      disabled={
                        setDisabled() ||
                        !formValues.passportInfo[passportType].area ||
                        !formValues.passportInfo[passportType].street
                      }
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
                  formValues.passportInfo['addressRegistration']
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
