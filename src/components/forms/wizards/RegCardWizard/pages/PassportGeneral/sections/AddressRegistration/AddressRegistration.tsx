import React, { FC, useEffect, useState } from 'react';
import { Checkbox, Col, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';

import { WizardStateType } from '../../../../types';
import { SectionProps, KladrItem } from './types';
import { kladrSelector } from '../../../../../../../../reduxStore/slices/registrationCard/selectors';

const FormField = React.lazy(() => import('../../../../../../components/FormField/FormField'));
const FastInput = React.lazy(() => import('../../../../../../components/fields/FastInput/FastInput'));
const FastSearchSelect = React.lazy(() => import('../../../../../../components/fields/FastSearchSelect/FastSearchSelect'));

const AddressRegistration: FC<SectionProps> = ({
  kladr,
  nestedKladr,
  kladrStreets,
  isLoadingKladr,
  isLoadingKladrNested,
  isLoadingKladrStreets,
  getKladrNested,
  getKladrStreets,
}) => {
  const [isDocumentedAddress, setIsDocumentedAddress] = useState(false);
  const [prevCity, setPrevCity] = useState('');

  const [cleanable, setCleanable] = useState(false);
  const form = useFormikContext<WizardStateType>();
  const {documentedBuffer} = useSelector(kladrSelector);
  const formValues = form.values.passportGeneral.passportInfo.addressRegistration;
  const formInitialValues = form.initialValues.passportGeneral.passportInfo.addressRegistration;
  const sectionValuePath = `passportGeneral.passportInfo.addressRegistration`;
  const fieldNames = ['isKLADR', 'area', 'city', 'street', 'houseNumber', 'houseCharacter', 'flatNumber', 'freeInput', 'isVillager'];

  // useEffect(() => {
  //   console.log('formValues registration', formValues);
  // }, [formValues]);

  useEffect(() => {
    if (formValues.isDocumentedAddress && documentedBuffer.area) {
      fieldNames.map((item) => form.setFieldValue(`${sectionValuePath}.${item}`, documentedBuffer[item]))
    }
  }, [formValues.isDocumentedAddress, documentedBuffer]);

  useEffect(() => {
    const streetsAreas = ['7800000000000', '7700000000000', '9200000000000'];
    const area = formValues.area;
    if (streetsAreas.includes(area)) {
      getKladrStreets(area, 'registration');
    } else {
      getKladrNested(area, 'registration');
    }
  },[formValues.area]);

  useEffect(() => {
    formValues.city && getKladrStreets(formValues.city, 'registration');
  }, [formValues.city]);

  useEffect(() => {
    if (isDocumentedAddress) {
      if (formValues.area === '7800000000000' ||
        formValues.area === '7700000000000' ||
        formValues.area === '9200000000000') {
        getKladrStreets(formValues.area, 'registration');
      } else {
        formValues.city
          && 'registration'
          && getKladrStreets(formValues.city, 'registration');
      }
    }
  },[isDocumentedAddress, documentedBuffer.street]);

  useEffect(() => {
    if (formInitialValues.street && formValues.city) {
      if (formValues.area === '7800000000000' ||
        formValues.area === '7700000000000' ||
        formValues.area === '9200000000000') {
        getKladrStreets(formValues.area, 'registration');
      } else {
        getKladrStreets(formValues.city, 'registration');
      }
    }
  }, [formInitialValues.street]);

  //clear select fields after top-level select changed
  useEffect(() => {
    if (!formValues.street) {
      const toEmptyFields = ['houseNumber', 'flatNumber', 'houseCharacter'];
      toEmptyFields.map((item) => {
        formValues[item] && form.setFieldValue(`${sectionValuePath}.${item}`, '');
      });
    }
  }, [formValues.street]);

  //?????????????? ?????????? ?? ?????????????????? ?????????????? ?????????? ?????????????????? ????????????
  useEffect(() => {
    formValues.city && setPrevCity(formValues.city);
    formValues.city !== prevCity &&
    form.setFieldValue(`${sectionValuePath}.street`, '');
  }, [formValues.??ity]);

  // ?????????????? ???????????? ?????????? ?????????????????? ??????????????
  useEffect(() => {
    if (cleanable) {
      form.setFieldValue(`${sectionValuePath}.city`, '');
      form.setFieldValue(`${sectionValuePath}.street`, '');
    }
  }, [formValues.area]);

  useEffect(() => {
    formValues.isDocumentedAddress
      ? setIsDocumentedAddress(true)
      : setIsDocumentedAddress(false);
  }, [formValues.isDocumentedAddress]);

  //?????????????????? ?????????????????? ?????????????????????? ?????????? ???????? ?? ?????????????????????? ???? isDocumentedAddress
  useEffect(() => {
    if (isDocumentedAddress) {
      form.setFieldValue(`${sectionValuePath}.isKLADR`, documentedBuffer.isKLADR);
    } else {
      form.setFieldValue(`${sectionValuePath}.isKLADR`, formValues.isKLADR);
    }
  }, [
    isDocumentedAddress,
    documentedBuffer.isKLADR,
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

  return (
    <div className="form-section address-registration">
      <h2>?????????? ????????????????????</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <FormField>
            <Checkbox
              disabled={isDocumentedAddress}
              checked={formValues.isKLADR}
              name={`${sectionValuePath}.isKLADR`}
              onChange={form.handleChange}>
              ??????????
            </Checkbox>
          </FormField>
        </Col>
        <Col span={8}>
          <FormField>
            <Checkbox
              disabled={isDocumentedAddress || formValues.isKLADR}
              checked={formValues.isVillager}
              name={`${sectionValuePath}.isVillager`}
              onChange={form.handleChange}>
              ???????????????? ????????????
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
                  placeholder={'??????????????'}
                  onFocus={() => setCleanable(true)}
                  showSearch
                  filterOption
                  isDisabled={isDocumentedAddress}
                  optionFilterProp={'name'}>
                  {getKladrDetailed(kladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col xl={16} xxl={12}>
              <FormField>
                <FastSearchSelect
                  loading={isLoadingKladrNested}
                  isDisabled={
                    isDocumentedAddress ||
                    !formValues.area ||
                    formValues.area === '7800000000000' ||
                    formValues.area === '7700000000000' ||
                    formValues.area === '9200000000000'
                  }
                  onFocus={() => setCleanable(true)}
                  // onInput={(e) => {
                  //   const value =  e.target.value
                  //   getKladrNested(
                  //     formValues.area,
                  //     'registration',
                  //     value
                  //   );
                  // }}
                  placeholder={'??????????'}
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
                  isDisabled={
                    isDocumentedAddress ||
                    (formValues.area !== '7800000000000' &&
                      formValues.area !== '7700000000000' &&
                      formValues.area !== '9200000000000' &&
                      !formValues.city)
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
                  //     'registration',
                  //     value
                  //   );
                  // }}
                  placeholder={'??????????'}
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
                      placeholder='??????'
                      disabled={isDocumentedAddress || !formValues.area || !formValues.street}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.houseCharacter`}
                      placeholder='????????????'
                      disabled={isDocumentedAddress || !formValues.area || !formValues.street}
                    />
                  </FormField>
                </Col>
                <Col span={8}>
                  <FormField>
                    <FastInput
                      name={`${sectionValuePath}.flatNumber`}
                      placeholder='????????????????'
                      disabled={isDocumentedAddress || !formValues.area || !formValues.street}
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
                  disabled={isDocumentedAddress}
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
              checked={formValues.isDocumentedAddress}
              name={`${sectionValuePath}.isDocumentedAddress`}
              onChange={form.handleChange}>
              ?????????????????????????? ???????????? ????????????????
            </Checkbox>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default AddressRegistration;
