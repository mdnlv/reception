import React from 'react';
import { Col, Divider, Row, Select } from 'antd';
import { useFormikContext } from 'formik';

import {DROPDOWN_TITLE, LABELS} from "./types";
import {WizardStateType} from "../../types";

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';
import FormField from '../../../../components/FormField/FormField';
import FastSearchSelect from "../../../../components/fields/FastSearchSelect/FastSearchSelect";

const Links: React.FC = () => {
  const form = useFormikContext<WizardStateType>();
  const formValues = form.values.links;
  const sectionValuePath = `links`;

  const getSelectionPath = (index: number, linkType:string, fieldChain: string) => {
    return `${sectionValuePath}.${linkType}[${index}].${fieldChain}`;
  };

  return (
    <form className={'wizard-step links-form'}>
      <div className="form-section">
        <DropDownContent title={DROPDOWN_TITLE}>
          <Row>
            <Col span={24}>
              <FormArrayField
                values={[]}
                name={'directLinks'}
                renderChild={(key, index) => (
                  <Row key={index} gutter={16}>
                    <Col span={5}>
                      <FormField label={LABELS.DIRECT_LINK}>
                        <FastSearchSelect name={getSelectionPath(index, 'directLinks', 'forwardRef')}/>
                      </FormField>
                    </Col>
                    <Col span={7}>
                      <FormField label={LABELS.WITH_PATIENT}>
                        <FastSearchSelect name={getSelectionPath(index, 'directLinks', 'patientLink')}/>
                      </FormField>
                    </Col>
                  </Row>
                )}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <FormArrayField
                values={[]}
                name={'backLinks'}
                renderChild={(key, index) => (
                  <Row key={index} gutter={16}>
                    <Col span={5}>
                      <FormField label={'Обратная связь'}>
                        <FastSearchSelect name={getSelectionPath(index, 'backLinks', 'forwardRef')}/>
                      </FormField>
                    </Col>
                    <Col span={7}>
                      <FormField label={'Связан с пациентом'}>
                        <FastSearchSelect name={getSelectionPath(index, 'backLinks', 'patientLink')}/>
                      </FormField>
                    </Col>
                  </Row>
                )}
              />
            </Col>
          </Row>
        </DropDownContent>
      </div>
    </form>
  );
};

export default Links;
