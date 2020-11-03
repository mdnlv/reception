import React, { useCallback } from 'react';
import { Checkbox, Col, Row, Select } from 'antd/lib';
import FormField from '../../../../components/FormField/FormField';
import './styles.scss';
import { useFormikContext } from 'formik';
import PartialFormState from '../../../types';
import FastSearchSelect from '../../../../components/fields/FastSearchSelect/FastSearchSelect';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface SectionProps {
  orgs: { id: number; name: string }[];
}

const LpuAttachment: React.FC<SectionProps> = ({ orgs }) => {
  const { setFieldValue, values } = useFormikContext<PartialFormState>();

  const orgsOptionsList = useCallback(() => {
    return orgs.map((item) => (
      <Select.Option key={item.id} name={item.name} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }, [orgs]);

  const onCheckboxChange = useCallback(
    (e: CheckboxChangeEvent) => {
      setFieldValue(e.target.name || '', e.target.checked ? 1 : 0);
    },
    [setFieldValue],
  );

  return (
    <div className={'form-section lpu-section'}>
      <h2>Прикрепление к ЛПУ</h2>
      <Row>
        <Col span={24}>
          <FormField>
            <FastSearchSelect
              showSearch
              filterOption
              optionFilterProp={'name'}
              allowClear
              size={'small'}
              name={'attachmentOrganisationId'}>
              {orgsOptionsList}
            </FastSearchSelect>
          </FormField>
        </Col>
      </Row>
      <Row className={'lpu-section__actions'} justify={'space-between'}>
        <Col>
          <FormField>
            <Checkbox
              onChange={onCheckboxChange}
              checked={!!values.isAttachNonBase}>
              любое ЛПУ кроме базового
            </Checkbox>
          </FormField>
        </Col>
      </Row>
    </div>
  );
};

export default LpuAttachment;
