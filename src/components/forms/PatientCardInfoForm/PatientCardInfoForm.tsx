import React, {useState, useEffect, useCallback} from 'react';
import {Divider, Spin, Descriptions} from 'antd';
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

import './styles.scss';
import {FormProps} from "./types";
import {detailedOrganisationsSelector} from "../../../reduxStore/slices/rb/selectors";
import {kladrSelector} from "../../../reduxStore/slices/registrationCard/selectors";
import {getAddress} from "../../../utils/getAddress";

const PatientCardInfoForm: React.FC<FormProps> = ({
  patient,
  kladr,
  isLoadingKladr,
  isLoadingKladrStreets,
}) => {
  const orgsList = useSelector(detailedOrganisationsSelector);
  const { rbKladrStreetsRegistration, rbKladrStreetsDocumented } = useSelector(
    kladrSelector,
  );
  const [isDocFreeInput, setIsDocFreeInput] = useState(false);
  const [isRegFreeInput, setIsRegFreeInput] = useState(false);

  useEffect(() => {
    console.log('patient', patient)
  }, [patient]);

  useEffect(() => {
    const patientsAddress = patient.address;
    for (let i = 0; i < patientsAddress.length; i++) {
      if (patientsAddress[i].freeInput) {
        if (patientsAddress[i].type === 0) {
          setIsDocFreeInput(true)
        } else if (patientsAddress[i].type === 1) {
          setIsRegFreeInput(true)
        }
      }
    }
  }, [patient]);

  const getOmsNumber = () => {
    const policies = patient.policy;
    const omsFound  = policies.filter(
      (item) => item.policyTypeId !== 3,
    );
    return omsFound[omsFound.length - 1].number;
  };

  const getPhone = () => {
    const phonesPrimary = patient.contacts.filter(
      (item) => item.isPrimary === 1 && item.contactTypeId === 3
    );
    const phoneNumber = phonesPrimary.length > 0 ? phonesPrimary[0].contact : '';
    return phoneNumber;
  };

  const getOrganization = useCallback(() => {
    const organization = orgsList.find((item) => item.id && patient.work[0] && item.id === patient.work[0].id);
    return organization?.name
  }, [orgsList.length > 0 && orgsList]);

  return isLoadingKladr
      || isLoadingKladrStreets
      || kladr.length === 0
      || rbKladrStreetsRegistration.length === 0 && patient.address[0] && !isRegFreeInput
      || rbKladrStreetsDocumented.length === 0 && patient.address[1] && !isDocFreeInput
    ? (
      <div className={'person-info-loading__wrapper'}>
        <Spin />
      </div>
    )
    : (
        <div className={'patient-card-info-form'}>
          <h3 className={'content-title'}>?????????? ????????????????????</h3>
          <div className="form-section">
            <Descriptions column={1}>
              <Descriptions.Item label={'??????'}>
                {patient?.code}
              </Descriptions.Item>
              <Descriptions.Item label={'??????'}>
                {patient?.fullName}
              </Descriptions.Item>
              <Descriptions.Item label={'???????? ????????????????'}>
                {format(new Date(patient?.birthDate), "d.MM.yyyy")}
              </Descriptions.Item>
              <Descriptions.Item label={'??????'}>
                {patient?.sex === 1 ? "??" : "??"}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions column={1}>
              <Descriptions.Item label={'??????????????????????'}>
                {getAddress(patient, 0, kladr, rbKladrStreetsDocumented)}
              </Descriptions.Item>
              <Descriptions.Item label={'??????????????????'}>
                {getAddress(patient, 1, kladr, rbKladrStreetsRegistration)}
              </Descriptions.Item>
              <Descriptions.Item label={'?????????? ????????????????'}>
                {patient?.birthPlace}
              </Descriptions.Item>
              <Descriptions.Item label={'??????????????'}>
                {getPhone() || ''}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <h3 className={'content-title'}>??????????????????</h3>
          <div className="form-section">
            <Descriptions column={1}>
              <Descriptions.Item label={'??????????'}>
                {patient?.snils}
              </Descriptions.Item>
              <Descriptions.Item label={'????????????????????????'}> </Descriptions.Item>
              <Descriptions.Item label={'??????????????'}> </Descriptions.Item>
              <Descriptions.Item label={'??????'}>
                {patient?.policy.length > 0 ? getOmsNumber() : ''}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <h3 className={'content-title'}>?????????????????????? ????????????????????</h3>
          <div className="form-section">
            <Descriptions column={1}>
              <Descriptions.Item label={'?????????????? ????????'}> </Descriptions.Item>
              <Descriptions.Item label={'??????????????????????'}> </Descriptions.Item>
            </Descriptions>
          </div>
          <h3 className={'content-title'}>??????????????????</h3>
          <div className="form-section">
            <Descriptions column={1}>
              <Descriptions.Item label={'?????????? ????????????'}>
                {getOrganization() || patient.work[0] && patient.work[0].freeInput || ''}
              </Descriptions.Item>
              <Descriptions.Item label={'????????????????????????'}>
                {patient.work[0] && patient.work[0].post || ''}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
    );
};

export default PatientCardInfoForm;
