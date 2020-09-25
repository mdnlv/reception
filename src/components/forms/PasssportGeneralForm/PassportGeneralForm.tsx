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
import {
  fetchKladrNested,
  fetchKladrStreets,
  setFormSection,
} from '../../../store/registrationCard/actions';

import { KladrDocType } from '../../../store/registrationCard/types';
import {
  kladrLoadingsSelector,
  kladrSelector,
} from '../../../store/registrationCard/selectors';
import KladrItem from '../../../types/data/KladrItem';

interface FormProps {}

const PassportGeneralForm: FC = (props) => {
  const store = useSelector((state: RootState) => state.registrationCard);

  const {
    rbKladrDocumented,
    rbKladrNestedDocumented,
    rbKladrNestedRegistration,
    rbKladrRegistration,
    rbKladrStreetsDocumented,
    rbKladrStreetsRegistration,
  } = useSelector(kladrSelector);
  const {
    isLoadingKladrDocumented,
    isLoadingKladrNestedDocumented,
    isLoadingKladrNestedRegistration,
    isLoadingKladrRegistration,
    isLoadingKladrStreetsDocumented,
    isLoadingKladrStreetsRegistration,
  } = useSelector(kladrLoadingsSelector);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: store.passportGeneral,
    onSubmit: (values) => {},
  });

  function fetchNestedKladr(id: string, type: KladrDocType) {
    let rbKladrItem: KladrItem | undefined;

    console.log(id, type);

    switch (type) {
      case 'documented':
        rbKladrItem = rbKladrDocumented.find((item) => item.id === id);
        break;
      case 'registration':
        rbKladrItem = rbKladrRegistration.find((item) => item.id === id);
        break;
    }

    if (rbKladrItem) {
      dispatch(fetchKladrNested({ id: rbKladrItem.prefix, type }));
    }
  }

  function fetchKladrStreetsItems(id: string, type: KladrDocType) {
    dispatch(fetchKladrStreets({ id, type }));
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
                isLoadingKladr={isLoadingKladrRegistration}
                isLoadingKladrNested={isLoadingKladrNestedRegistration}
                isLoadingKladrStreets={isLoadingKladrStreetsRegistration}
                getKladrNested={fetchNestedKladr}
                getKladrStreets={fetchKladrStreetsItems}
                kladr={rbKladrRegistration}
                nestedKladr={rbKladrNestedRegistration}
                kladrStreets={rbKladrStreetsRegistration}
              />
            </Col>
            <Col span={12}>
              <AddressDocumentedRegistration
                isLoadingKladr={isLoadingKladrDocumented}
                isLoadingKladrNested={isLoadingKladrNestedDocumented}
                isLoadingKladrStreets={isLoadingKladrStreetsDocumented}
                getKladrNested={fetchNestedKladr}
                getKladrStreets={fetchKladrStreetsItems}
                kladr={rbKladrDocumented}
                nestedKladr={rbKladrNestedDocumented}
                kladrStreets={rbKladrStreetsDocumented}
              />
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
