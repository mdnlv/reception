import React from 'react';
import { Col, DatePicker, Row, Select } from 'antd';

import DropDownContent from '../../../../../elements/DropDownContent/DropDownContent';
import FormField from '../../../../components/FormField/FormField';
import FormArrayField from '../../../../components/FormArrayField/FormArrayField';

const ViewType: React.FC = () => {
  return (
    <form className={'wizard-step person-view-type-form'}>
      <div className="form-section">
        <DropDownContent title={'Вид наблюдения'}>
          <FormArrayField
            values={[]}
            name={'viewTypes'}
            renderChild={(key, index) => (
              <Row gutter={16} key={index}>
                <Col span={4}>
                  <FormField label={'Тип'}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={6}>
                  <FormField label={'ЛПУ'}>
                    <Select />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={'Дата прикрепления'}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col span={3}>
                  <FormField label={'Дата открепления'}>
                    <DatePicker />
                  </FormField>
                </Col>
                <Col span={7}>
                  <FormField label={'Причина открепления'}>
                    <Select />
                  </FormField>
                </Col>
              </Row>
            )}
          />
        </DropDownContent>
      </div>
    </form>
  );
};

export default ViewType;
