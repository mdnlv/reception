import React, { FC, useEffect, useState } from 'react';
import { Checkbox, Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { KladrDocType } from '../../../../../../../../reduxStore/slices/registrationCard/types';
import { WizardStateType } from '../../../../types';
import { SectionProps, KladrItem } from './types';
import { kladrSelector } from '../../../../../../../../reduxStore/slices/registrationCard/selectors';
import {setDocumentedBuffer} from '../../../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';

const FormField = React.lazy(() => import('../../../../../../components/FormField/FormField'));
const FastInput = React.lazy(() => import('../../../../../../components/fields/FastInput/FastInput'));
const FastSearchSelect = React.lazy(() => import('../../../../../../components/fields/FastSearchSelect/FastSearchSelect'));

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
  const fieldNames = ['isKLADR', 'area', 'city', 'street', 'houseNumber', 'houseCharacter', 'flatNumber', 'freeInput', 'isVillager'];

  useEffect(() => {
    id === 'new' &&  form.setFieldValue(`${sectionValuePath}.area`, '7800000000000');
  }, [id]);

  useEffect(() => {
    if (formValues.passportInfo['addressRegistration'].isDocumentedAddress && documentedBuffer.area) {
      fieldNames.map((item) => form.setFieldValue(`${sectionValuePath}.${item}`, documentedBuffer[item]))
    }
  }, [formValues.passportInfo['addressRegistration'].isDocumentedAddress, documentedBuffer]);

  useEffect(() => {
    dispatch(setDocumentedBuffer({value: formValues.passportInfo.documentedAddress, type: 'setDocumentedBuffer'}))
  }, [formValues.passportInfo.documentedAddress]);

  useEffect(() => {
    if (!isDocumentedAddress || passportType === 'documentedAddress') {
      return;
    }
    const streetsAreas = ['7800000000000', '7700000000000', '9200000000000'];
    const area = formValues.passportInfo[passportType].area;
    if (streetsAreas.includes(area)) {
      getKladrStreets(area, getType());
    } else {
      getKladrNested(area, getType());
    }
  },[
    // isDocumentedAddress,
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
    // isDocumentedAddress,
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

  const setDisabled = () =>
    isDocumentedAddress && passportType !== 'documentedAddress';

  return (
    <div className="form-section address-registration">
      <h2>{getTitle()}</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <FormField>
            <Checkbox
              disabled={setDisabled()}
              checked={formValues.passportInfo[passportType].isKLADR}
              name={`${sectionValuePath}.isKLADR`}
              onChange={form.handleChange}>
              КЛАДР
            </Checkbox>
          </FormField>
          <FormField>
            <Checkbox
              disabled={setDisabled()}
              checked={formValues.passportInfo[passportType].isVillager}
              name={`${sectionValuePath}.isVillager`}
              onChange={form.handleChange}>
              Сельский житель
            </Checkbox>
          </FormField>
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
                  placeholder={'Область'}
                  onFocus={() => setCleanable(true)}
                  showSearch
                  filterOption
                  disabled={setDisabled()}
                  optionFilterProp={'name'}>
                  {getKladrDetailed(kladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladrNested}
                  disabled={
                    setDisabled() ||
                    !formValues.passportInfo[passportType].area ||
                    formValues.passportInfo[passportType].area ===
                    '7800000000000' ||
                    formValues.passportInfo[passportType].area ===
                    '7700000000000' ||
                    formValues.passportInfo[passportType].area ===
                    '9200000000000'
                  }
                  onFocus={() => setCleanable(true)}
                  onInput={(e) => {
                    const value =  e.target.value
                    getKladrNested(
                      formValues.passportInfo[passportType].area,
                      getType(),
                      value
                    );
                  }}
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
                  disabled={
                    setDisabled() ||
                    (formValues.passportInfo[passportType].area !==
                      '7800000000000' &&
                      formValues.passportInfo[passportType].area !==
                      '7700000000000' &&
                      formValues.passportInfo[passportType].area !==
                      '9200000000000' &&
                      !formValues.passportInfo[passportType].city)
                  }
                  onFocus={() => setCleanable(true)}

                  onInput={(e) => {
                    const value =  e.target.value
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
                      value
                    );
                  }}
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
