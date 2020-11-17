import React, { FC, useEffect } from 'react';
import { Checkbox, Col, Radio, Row, Select } from 'antd';
import { useFormikContext } from 'formik';
import FormField from '../../../../../../components/FormField/FormField';
import { KladrDocType } from '../../../../../../../../reduxStore/slices/registrationCard/registrationCardSlice';
import FastInput from '../../../../../../components/fields/FastInput/FastInput';
import FastSearchSelect from '../../../../../../components/fields/FastSearchSelect/FastSearchSelect';
import { WizardStateType } from '../../../../types';

interface KladrItem {
  id: string;
  name: string;
  socr: string;
}

interface PrefixKladrItem extends KladrItem {
  prefix: string;
}

interface SectionProps {
  passportType: 'addressRegistration' | 'documentedAddress';
  kladr: PrefixKladrItem[];
  nestedKladr: PrefixKladrItem[];
  kladrStreets: KladrItem[];
  isLoadingKladr: boolean;
  isLoadingKladrNested: boolean;
  isLoadingKladrStreets: boolean;
  getKladrNested(id: string, type: KladrDocType): void;
  getKladrStreets(id: string, type: KladrDocType): void;
}

const Address: FC<SectionProps> = (props) => {
  const form = useFormikContext<WizardStateType>();

  const formValues = form.values.passportGeneral;
  const sectionValuePath = `passportGeneral.passportInfo.${props.passportType}`;

  function getKladrDetailed(kladrArr: KladrItem[]) {
    return kladrArr.map((item) => {
      return (
        <Select.Option
          key={item.id}
          name={`${item.socr}. ${item.name}`}
          value={item.id}>
          {`${item.socr}. ${item.name}`}
        </Select.Option>
      );
    });
  }

  function getTitle() {
    switch (props.passportType) {
      case 'documentedAddress':
        return 'Адрес регистрация';
      case 'addressRegistration':
        return 'Адрес проживания';
    }
  }

  function getType() {
    let type: KladrDocType;
    switch (props.passportType) {
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
  }, [formValues.passportInfo[props.passportType].street]);

  useEffect(() => {
    form.setFieldValue(`${sectionValuePath}.street`, '');
  }, [formValues.passportInfo[props.passportType].city]);

  useEffect(() => {
    form.setFieldValue(`${sectionValuePath}.city`, '');
  }, [formValues.passportInfo[props.passportType].area]);

  return (
    <div className="form-section address-registration">
      <h2>{getTitle()}</h2>
      <Row gutter={16} className="form-row">
        <Col span={8}>
          <Radio.Group
            value={formValues.passportInfo[props.passportType].isKLADR}
            name={`${sectionValuePath}.isKLADR`}
            onChange={form.handleChange}>
            <Radio value={true}>КЛАДР</Radio>
            <Radio value={false}>Сельский житель</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {formValues.passportInfo[props.passportType].isKLADR && (
        <>
          <Row gutter={16} className="form-row">
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={props.isLoadingKladr}
                  name={`${sectionValuePath}.area`}
                  placeholder={'Область'}
                  showSearch
                  filterOption
                  value={formValues.passportInfo[props.passportType].area}
                  optionFilterProp={'name'}>
                  {getKladrDetailed(props.kladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={props.isLoadingKladrNested}
                  disabled={!formValues.passportInfo[props.passportType].area}
                  onFocus={() => {
                    props.getKladrNested(
                      formValues.passportInfo[props.passportType].area,
                      getType(),
                    );
                  }}
                  value={formValues.passportInfo[props.passportType].city}
                  placeholder={'Город'}
                  name={`${sectionValuePath}.city`}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(props.nestedKladr)}
                </FastSearchSelect>
              </FormField>
            </Col>
          </Row>
          <Row gutter={16} className="form-row">
            <Col span={8}>
              <FormField>
                <FastSearchSelect
                  loading={props.isLoadingKladrStreets}
                  disabled={!formValues.passportInfo[props.passportType].city}
                  onFocus={() => {
                    props.getKladrStreets(
                      formValues.passportInfo[props.passportType].city,
                      getType(),
                    );
                  }}
                  value={formValues.passportInfo[props.passportType].street}
                  placeholder={'Улица'}
                  name={`${sectionValuePath}.street`}
                  showSearch
                  filterOption
                  optionFilterProp={'name'}>
                  {getKladrDetailed(props.kladrStreets)}
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
      {!formValues.passportInfo[props.passportType].isKLADR && (
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
      {props.passportType === 'addressRegistration' && (
        <Row gutter={8}>
          <Col span={16}>
            <FormField>
              <Checkbox
                checked={
                  formValues.passportInfo[props.passportType]
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
