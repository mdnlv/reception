import React from 'react';
import { Formik } from 'formik';
import { Button, Col, Row  } from 'antd/lib';
import { useDispatch } from 'react-redux';
import { FormProps } from './types';
import Fields from './components/Fields/Fields';
import './styles.scss';
import { postFiltersDoctors, fetchPersonTree } from '../../../reduxStore/slices/personTree/personTreeSlice';

const DoctorSearchFilterForm: React.FC<FormProps> = ({
  onClose,
  groupBy,
  setFilter,
  setSelectedPerson,
  setSelected
}) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        organisation: undefined,
        speciality: undefined,
        post: undefined,
        person: undefined,
      }}
      onSubmit={(values:any) => {
        setSelectedPerson([])
        setSelected([])
        dispatch(values.organisation || values.speciality || values.post ?
          postFiltersDoctors({
            orgStructure_id: !values.organisation ? undefined : values.organisation,
            speciality_id: !values.speciality? undefined: values.speciality,
            post_id: !values.post? undefined: values.post,
            person_id_list: !values.person? undefined: values.person,
            group_by: groupBy
          }) : fetchPersonTree({group_by: groupBy})
        );
        setFilter({
          orgStructure_id: !values.organisation ? undefined : values.organisation,
          speciality_id: !values.speciality? undefined: values.speciality,
          post_id: !values.post? undefined: values.post,
          person_id_list: !values.person? undefined: values.person,
        })
        if (onClose) {
          onClose();
        }
      }}>
      {(formProps) => (
        <form className={'patient-search-filter-form'}>
          <Fields/>
          <Row gutter={8} justify={'center'}>
            <Col>
              <Button
                type={'primary'}
                onClick={() => {
                  formProps.resetForm();
                }}
                danger>
                Сбросить
              </Button>
            </Col>
            <Col>
              <Button
                type={'primary'}
                onClick={() => {
                  formProps.handleSubmit();
                }}
                className={'save-btn'}>
                Применить
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default DoctorSearchFilterForm;
