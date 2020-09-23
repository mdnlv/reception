import React, { FC, useEffect } from 'react';
import { Col, Divider, Row } from 'antd';
import './styles.scss';
import AddressRegistration from './components/sections/AddressRegistration/AddressRegistration';
import PolicyOmc from './components/sections/PolicyOmc/PolicyOmc';
import AddressDocumentedRegistration from './components/sections/AddressDocumentedRegistration/AddressDocumentedRegistration';
import PolicyDmc from './components/sections/PolicyDmc/PolicyDmc';
import PersonalDocument from './components/sections/PersonalDocuments/PersonalDocuments';
import PersonalContacts from './components/sections/PersonalContacts/PersonalContacts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Formik, useFormik } from 'formik';
import { setFormSection } from '../../../store/registrationCard/actions';
import { detailedKladrSelector } from '../../../store/rb/selectors';
import { fetchKladrNested } from '../../../store/rb/actions';
import rbKladrStreet from '../../../interfaces/responses/rb/rbKladrStreet';

interface FormProps {}

const PassportGeneralForm: FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  const { rbKladr, rbKladrNested, rbKladrStreets } = useSelector(
    detailedKladrSelector,
  );

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: store.passportGeneral,
    onSubmit: (values) => {},
  });

  function fetchNestedKladr(id: string) {
    const rbKladrItem = rbKladr.find((item) => item.id === id);
    if (rbKladrItem) {
      dispatch(fetchKladrNested(rbKladrItem.prefix));
    }
  }

  useEffect(() => {
    dispatch(
      setFormSection({
        ...store,
      }),
    );
  }, [formik.values]);

  return (
    <Formik initialValues={store.passportGeneral} onSubmit={() => {}}>
      {(props) => (
        <form className="passport-general-form">
          <Row align={'stretch'}>
            <Col span={12} className={'col--border-right'}>
              <AddressRegistration
                getKladrNested={fetchNestedKladr}
                kladr={rbKladr}
                nestedKladr={rbKladrNested}
                kladrStreets={rbKladrStreets}
              />
            </Col>
            <Col span={12}>
              <AddressDocumentedRegistration />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12} className={'col--border-right'}>
              <PolicyOmc />
            </Col>
            <Col span={12}>
              <PolicyDmc />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12} className={'col--border-right'}>
              <PersonalDocument />
            </Col>
            <Col span={12}>
              <PersonalContacts />
            </Col>
          </Row>
          <Divider />
        </form>
      )}
    </Formik>
  );
};

export default PassportGeneralForm;
