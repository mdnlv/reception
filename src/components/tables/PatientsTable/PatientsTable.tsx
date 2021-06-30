import React, { FC, useMemo, useState, useEffect, useCallback } from 'react';
import {Table, Spin} from 'antd/lib';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import './styles.scss';
import {TableProps} from "./types";
import Patient from "../../../types/data/Patient";
import {kladrSelector, kladrLoadingsSelector} from "../../../reduxStore/slices/registrationCard/selectors";
import {fetchKladrStreets} from "../../../reduxStore/slices/registrationCard/registrationCardSlice";
import {isSearching} from "../../../reduxStore/slices/patients/selectors";
import {resetCurrentPatient} from '../../../reduxStore/slices/patientCard/patientCardSlice'

const PatientsTable: FC<TableProps> = ({
  patients,
  isLoading,
  onPatientClick,
  currentPatient,
  onChangeOffset
}) => {
  const dispatch = useDispatch();
  const { rbKladrRegistration, rbKladrStreetsRegistration } = useSelector(
    kladrSelector,
  );
  const {isLoadingKladrStreetsRegistration} = useSelector(kladrLoadingsSelector);
  const isSearch = useSelector(isSearching);
  const [cityArr, setCityArr] = useState([] as string[]);
  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'Пол',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'СНИЛС',
      dataIndex: 'snils',
      key: 'snils',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      dataIndex: 'route',
      key: 'route',
    },
    {
      dataIndex: 'regCard',
      key: 'regCard',
    },
  ];

  useEffect(() => {
    console.log('patients', patients)
  }, [patients]);

  useEffect(() => {
    dispatch(resetCurrentPatient())
  }, []);

  useEffect(() => {
    const itemsArr = [] as string[];
    patients.map(
      (item) => {
        if (item.address[0] && item.address[0].address.KLADRCode && !itemsArr.includes(item.address[0].address.KLADRCode)) {
          itemsArr.push(item.address[0].address.KLADRCode);
        }
      }
    );
    setCityArr(itemsArr);
  }, [patients]);

  useEffect(() => {
    cityArr.map(item => {
      dispatch(fetchKladrStreets({id: item, type: 'registration'}));
    })
  }, [cityArr]);

  const getSexName = (sex: 1 | 2) => {
    switch (sex) {
      case 1:
        return 'М';
      case 2:
        return 'Ж';
    }
  }

  const getTypeAddress = useCallback((patient: Patient) => {
    return (
      patient?.address?.find((item) => item.type === 0)?.freeInput ||
      getAddress(patient)
    );
  }, [rbKladrStreetsRegistration]);

  const getAddress = useCallback((patient: Patient) => {
    const number = patient?.address?.find((item) => item.type === 0)?.address
      .house;
    const corpus = patient?.address?.find((item) => item.type === 0)?.address
      .corpus;
    const litera = patient?.address?.find((item) => item.type === 0)?.address
      .litera;
    const flat = patient?.address?.find((item) => item.type === 0)?.address
      .flat;
    let address = '';

    const kladrCode = patient?.address?.find((item) => item.type === 0)
      ?.address.KLADRCode;
    const kladrStreetCode = patient?.address?.find((item) => item.type === 0)
      ?.address.KLADRStreetCode;
    const kladrCity = rbKladrRegistration.find((item) => item.id === kladrCode);
    const kladrStreet = rbKladrStreetsRegistration.find(
      (item) => item.id === kladrStreetCode,
    );
    const city = kladrCity?.name;
    const street = kladrStreet?.name;
    const socr = kladrStreet?.socr;

    if (city) {
      address = `г. ${city}`;
      if (street && socr) {
        address = address.concat(`, ${socr} ${street}`);
        if (number) {
          address = address.concat(`, д.${number}`);
          if (corpus) {
            address = address.concat(`, к.${corpus}`);
            if (litera) {
              address = address.concat(litera);
            }
          }
          if (flat) {
            address = address.concat(`, кв.${flat}`);
          }
        }
      }
    }

    return address;
  }, [rbKladrStreetsRegistration]);

  const getFormattedProps = useMemo(() => {
    return patients.map((item) => {
      return {
        ...item,
        key: item.code,
        cNumber: '',
        kNumber: '',
        address: getTypeAddress(item),
        viewType: '',
        sex: getSexName(item.sex),
        birthDate: item.birthDate,
        medExamination: item.medExamination
          ? moment(item.medExamination).format('DD-MM-YYYY')
          : '',
        route: <Link to={`/card/${item.code}`}>Мед. карта</Link>,
        regCard: <Link to={`/regCard/${item.code}`}>Рег. карта</Link>,
      };
    });
  }, [patients, rbKladrStreetsRegistration]);

  return (isLoadingKladrStreetsRegistration && patients.length === 0)
    ? (
        <div className={'person-info-loading__wrapper'}>
          <Spin />
        </div>
    )
    : (
      <Table
        loading={isLoading}
        dataSource={getFormattedProps}
        columns={columns}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: currentPatient ? [currentPatient] : [],
          onChange: (selectedRowKeys) => {
            if (typeof selectedRowKeys[0] === 'number') {
              onPatientClick(selectedRowKeys[0]);
            }
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              onPatientClick(record.key);
            },
          };
        }}
        onChange={(page) => {
          if (page.current) {
            const offsetData = (page.current - 1) * 5;
            onChangeOffset(offsetData);
          }
        }}
        pagination={isSearch ? {total: 100, showSizeChanger: false} : false}
      />
    )
};

export default React.memo(PatientsTable);
