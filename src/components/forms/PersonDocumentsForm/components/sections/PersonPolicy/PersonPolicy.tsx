import React, { FC } from 'react';
import { Col, Divider, Input, Row } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import { useFormikContext } from 'formik';
import { RegistrationCardStateType } from '../../../../../../reduxStore/slices/registrationCard/initialState';
import ArrayFieldWrapper from '../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import { PassportPolicyType } from '../../../../wizards/RegCardWizard/pages/PassportGeneral/types';
import moment from 'moment';

interface SectionProps {
  getPolicyKindId: (id: string) => string;
  getPolicyTypeId: (id: string) => string;
  getCmoTypeId: (id: string) => string;
}

const PersonPolicy: FC<SectionProps> = (props) => {
  const form = useFormikContext<RegistrationCardStateType>();

  const formValues = form.values.passportGeneral;

  return (
    <div className={'form-section person-policy'}>
      <DropDownContent title={'Полис'}>
        <ArrayFieldWrapper<PassportPolicyType>
          name={'passportGeneral'}
          values={[...formValues.policyOms, ...formValues.policyDms]}
          renderChild={(values, index) => (
            <>
              <Row key={index} gutter={16}>
                <Col>
                  <FormField label={'Тип'}>
                    <Input
                      value={props.getPolicyTypeId(values.type)}
                      disabled
                    />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Тип'}>
                    <Input
                      value={props.getPolicyKindId(values.timeType)}
                      disabled
                    />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Номер'}>
                    <Input value={values.number} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Серия'}>
                    <Input value={values.serial} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Номер'}>
                    <Input value={values.serial} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Дата начала'}>
                    <Input value={moment(values.from).format('L')} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Дата окончания'}>
                    <Input value={moment(values.to).format('L')} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'СМО'}>
                    <Input value={props.getCmoTypeId(values.cmo)} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Наименование'}>
                    <Input value={values.name} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Примечание'}>
                    <Input value={values.note} disabled />
                  </FormField>
                </Col>
              </Row>
              <Divider />
            </>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default PersonPolicy;
