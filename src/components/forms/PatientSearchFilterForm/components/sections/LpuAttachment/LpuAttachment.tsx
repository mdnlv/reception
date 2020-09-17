import React from 'react';
import { Button, Checkbox, Col, Input, Row, Select } from 'antd';
import FormField from '../../../../components/FormField/FormField';
import './styles.scss';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';

interface SectionProps {
  orgs: { id: number; name: string }[];
}

const LpuAttachment: React.FC<SectionProps> = (props) => {
  const form = useFormikContext<PartialFormState>();

  const orgsOptionsList = props.orgs.map((item) => (
    <Select.Option key={item.id} name={item.name} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  return (
    <div className={'form-section lpu-section'}>
      <h2>Прикрепление к ЛПУ</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <Select
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              value={form.values.attachmentOrganisationId}
              onChange={(val) => {
                form.setFieldValue('attachmentOrganisationId', val);
              }}
              size={'small'}>
              {orgsOptionsList}
            </Select>
          </FormField>
        </Col>
      </Row>
      <Row className={'lpu-section__actions'} justify={'space-between'}>
        <Col>
          <FormField>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  form.setFieldValue('isAttachNonBase', 1);
                } else {
                  form.setFieldValue('isAttachNonBase', 0);
                }
              }}
              checked={!!form.values.isAttachNonBase}>
              любое ЛПУ кроме базового
            </Checkbox>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default LpuAttachment;
