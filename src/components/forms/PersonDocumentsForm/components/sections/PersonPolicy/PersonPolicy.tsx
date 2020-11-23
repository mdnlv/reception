import React, { FC } from 'react';
import { Col, Divider, Input, Row } from 'antd';
import { useFormikContext } from 'formik';
import moment from 'moment';
import { WizardStateType } from '../../../../wizards/RegCardWizard/types';
import { SectionProps } from './types';

import FormField from '../../../../components/FormField/FormField';
import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import ArrayFieldWrapper from '../../../../components/ArrayFieldWrapper/ArrayFieldWrapper';
import PatientPolicy from '../../../../../../types/data/PatientPolicy';
import { PassportPolicyType } from '../../../../wizards/RegCardWizard/pages/PassportGeneral/types';

const PersonPolicy: FC<SectionProps> = ({
  getCmoTypeId,
  getPolicyKindId,
  getPolicyTypeId,
}) => {
  const form = useFormikContext<WizardStateType>();

  const formValues = form.values.passportGeneral;

  return (
    <div className={'form-section person-policy'}>
      <DropDownContent title={'Полис'}>
        <ArrayFieldWrapper<PassportPolicyType>
          name={'passportGeneral'}
          values={[...formValues.policyOms, ...formValues.policyDms]}
          renderChild={(values, index) => (
            <Row key={index}>
              <Row gutter={16}>
                <Col>
                  <FormField label={'Тип'}>
                    <Input
                      value={getPolicyTypeId(values.type?.toString() ?? '')}
                      disabled
                    />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Тип'}>
                    <Input
                      value={getPolicyKindId(values.timeType?.toString() ?? '')}
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
                  <FormField label={'Дата начала'}>
                    <Input
                      value={
                        values.from
                          ? moment(values.from).format('L')
                          : undefined
                      }
                      disabled
                    />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Дата окончания'}>
                    <Input
                      value={
                        values.from ? moment(values.to).format('L') : undefined
                      }
                      disabled
                    />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'СМО'}>
                    <Input
                      value={getCmoTypeId(values.cmo.toString())}
                      disabled
                    />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Наименование'}>
                    <Input value={values.name} disabled />
                  </FormField>
                </Col>
                <Col>
                  <FormField label={'Примечание'}>
                    <Input value={''} disabled />
                  </FormField>
                </Col>
              </Row>
              <Divider />
            </Row>
          )}
        />
      </DropDownContent>
    </div>
  );
};

export default PersonPolicy;
