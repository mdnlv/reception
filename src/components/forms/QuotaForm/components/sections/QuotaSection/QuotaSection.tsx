import React, {FC, useEffect, useState} from 'react';
import {Col, Input, Row, Select} from 'antd';
import {useFormContext} from 'react-hook-form';

import FormState from '../../../types';
import './styles.scss';

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import ArrayField from '../../../../components/ArrayField/ArrayField';
import FormField from '../../../../components/FormField/FormField';
import QuotaDetailed from '../../cards/QuotaDetailed/QuotaDetailed';

const QuotaSection: FC = () => {
  const form = useFormContext<FormState>();
  const [quotaIndex, setQuotaIndex] = useState(0);

  const handleRowClick = (index: number) => {
    if (quotaIndex !== index) {
      setQuotaIndex(index);
    }
  };

  const getActiveRowClass = (index: number) => {
    if (index === quotaIndex) {
      return 'quota-item quota-item--active';
    } else {
      return 'quota-item';
    }
  };

  const watchQuotas = form.watch('quotas');

  useEffect(() => {
    //console.log(form.getValues());
  }, [watchQuotas]);

  return (
    <div className={'form-section person-quotas'}>
      <Row align={'stretch'}>
        <Col span={8}>
          <DropDownContent title={'Квоты'}>
            <ArrayField<FormState>
              fieldName={'quotas'}
              renderChild={(key, index) => (
                <Row
                  key={key}
                  className={getActiveRowClass(index)}
                  onClick={() => {
                    handleRowClick(index);
                  }}
                  gutter={16}>
                  <Col span={6}>
                    <FormField label={'Квота'}>
                      <Select />
                    </FormField>
                  </Col>
                  <Col span={6}>
                    <FormField label={'Этап'}>
                      <Input />
                    </FormField>
                  </Col>
                  <Col span={6}>
                    <FormField label={'МКБ'}>
                      <Select />
                    </FormField>
                  </Col>
                  <Col span={6}>
                    <FormField label={'Статус'}>
                      <Select />
                    </FormField>
                  </Col>
                </Row>
              )}
            />
          </DropDownContent>
        </Col>
        <Col span={16}>
          <QuotaDetailed currentIndex={quotaIndex} />
        </Col>
      </Row>
    </div>
  );
};

export default QuotaSection;
