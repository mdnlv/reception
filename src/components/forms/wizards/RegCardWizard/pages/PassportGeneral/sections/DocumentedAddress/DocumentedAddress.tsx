import React, { FC, useEffect, useState } from 'react';
import { Checkbox, Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';

import { WizardStateType } from '../../../../types';
import { SectionProps, KladrItem } from './types';
import {setDocumentedBuffer} from '../../../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';

const FormField = React.lazy(() => import('../../../../../../components/FormField/FormField'));
const FastInput = React.lazy(() => import('../../../../../../components/fields/FastInput/FastInput'));
const FastSearchSelect = React.lazy(() => import('../../../../../../components/fields/FastSearchSelect/FastSearchSelect'));

const DocumentedAddress: FC<SectionProps> = ({
  kladr,
  nestedKladr,
  kladrStreets,
  isLoadingKladr,
  isLoadingKladrNested,
  isLoadingKladrStreets,
  getKladrNested,
  getKladrStreets,
}) => {
  const [prevCity, setPrevCity] = useState('');

  const [cleanable, setCleanable] = useState(false);
  const form = useFormikContext<WizardStateType>();
  const dispatch = useDispatch();
  const formValues = form.values.passportGeneral.passportInfo.documentedAddress;
  const formInitialValues = form.initialValues.passportGeneral.passportInfo.documentedAddress;
  const sectionValuePath = `passportGeneral.passportInfo.documentedAddress`;

  // useEffect(() => {
  //   console.log('kladr', kladr);
  // }, [kladr]);

  useEffect(() => {
    dispatch(setDocumentedBuffer({value: formValues, type: 'setDocumentedBuffer'}))
  }, [formValues]);

  useEffect(() => {
    if (kladr.length) {
      const streetsAreas = ['7800000000000', '7700000000000', '9200000000000'];
      const area = formValues.area;
      if (streetsAreas.includes(area)) {
        getKladrStreets(area, 'documented');
      } else {
        getKladrNested(area, 'documented');
      }
    }
  },[formValues.area, kladr]);

  useEffect(() => {
    formValues.city && getKladrStreets(formValues.city, 'documented');
  }, [formValues.city]);

  useEffect(() => {
    if (formInitialValues.street && formValues.city) {
      if (formValues.area === '7800000000000' || formValues.area === '7700000000000' || formValues.area === '9200000000000') {
        getKladrStreets(formValues.area, 'documented');
      } else {
        getKladrStreets(formValues.city, 'documented');
      }
    }
  }, [formInitialValues.street]);

  //clear select fields after top-level select changed
  useEffect(() => {
    if (!formValues.street) {
      const toEmptyFields = ['houseNumber', 'flatNumber', 'houseCharacter'];
      toEmptyFields.map((item) => {
        form.setFieldValue(`${sectionValuePath}.${item}`, '');
      });
    }
  }, [formValues.street]);

  //очистка улицы и текстовых инпутов после изменения города
  useEffect(() => {
    formValues.city && setPrevCity(formValues.city);
    formValues.city !== prevCity &&
    form.setFieldValue(`${sectionValuePath}.street`, '');
  }, [formValues.city]);

  // очистка города после изменения области
  useEffect(() => {
    if (cleanable) {
      form.setFieldValue(`${sectionValuePath}.city`, '');
      form.setFieldValue(`${sectionValuePath}.street`, '');
    }
  }, [formValues.area]);

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

  return (
    <div className="form-section address-registration">
      <h2>Адрес регистрации</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <FormField>
            <Checkbox
              checked={formValues.isKLADR}
              name={`${sectionValuePath}.isKLADR`}
              onChange={form.handleChange}>
              КЛАДР
            </Checkbox>
          </FormField>
          <FormField>
            <Checkbox
              checked={formValues.isVillager}
              name={`${sectionValuePath}.isVillager`}
              onChange={form.handleChange}>
              Сельский житель
            </Checkbox>
          </FormField>
        </Col>
      </Row>
      {formValues.isKLADR ? (
        <>
          <Row gutter={16} className="form-row">
            <Col xl={16} xxl={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladr}
                  name={`${sectionValuePath}.area`}
                  placeholder={'Область'}
                  onFocus={() => setCleanable(true)}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(kladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col xl={16} xxl={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladrNested}
                  disabled={
                    !formValues.area ||
                    formValues.area === '7800000000000' ||
                    formValues.area === '7700000000000' ||
                    formValues.area === '9200000000000'
                  }
                  onFocus={() => setCleanable(true)}
                  // onInput={(e) => {
                  //   const value =  e.target.value
                  //   getKladrNested(formValues.area,'documented', value);
                  // }}
                  placeholder={'Город'}
                  name={`${sectionValuePath}.city`}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(
                    formValues.area === '7800000000000' ||
                    formValues.area === '7700000000000' ||
                    formValues.area === '9200000000000'
                      ? [] : nestedKladr
                  )}
                </FastSearchSelect>
              </FormField>
            </Col>
          </Row>
          <Row gutter={16} className="form-row">
            <Col xl={16} xxl={8}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladrStreets}
                  disabled={
                    formValues.area !== '7800000000000' &&
                      formValues.area !== '7700000000000' &&
                      formValues.area !== '9200000000000' &&
                      !formValues.city
                  }
                  onFocus={() => setCleanable(true)}
                  // onInput={(e) => {
                  //   const value =  e.target.value
                  //   getKladrStreets(
                  //     formValues.area === '7800000000000' ||
                  //     formValues.area === '7700000000000' ||
                  //     formValues.area === '9200000000000'
                  //       ? formValues.area
                  //       : formValues.city,
                  //     'documented',
                  //     value
                  //   );
                  // }}
                  placeholder={'Улица'}
                  name={`${sectionValuePath}.street`}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(kladrStreets)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col xl={16} xxl={8}>
              <Row gutter={16}>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.houseNumber`}
                      placeholder='Дом'
                      disabled={!formValues.area || !formValues.street}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.houseCharacter`}
                      placeholder='Корпус'
                      disabled={!formValues.area || !formValues.street}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.flatNumber`}
                      placeholder='Квартира'
                      disabled={!formValues.area || !formValues.street}
                    />
                  </FormField>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row gutter={8}>
            <Col span={16}>
              <FormField>
                <FastInput
                  name={`${sectionValuePath}.freeInput`}
                />
              </FormField>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DocumentedAddress;
