import React, { FC, useMemo, useEffect } from 'react';
import {Table, Spin} from 'antd/lib';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";

import './styles.scss';
import {TableProps} from "./types";
import Patient from "../../../types/data/Patient";
import {kladrSelector, kladrLoadingsSelector} from "../../../reduxStore/slices/registrationCard/selectors";
import {fetchKladrStreets} from "../../../reduxStore/slices/registrationCard/registrationCardSlice";
import {useSelector} from "react-redux";

const PatientsTable: FC<TableProps> = ({
  patients,
  isLoading,
  onPatientClick,
  currentPatient
}) => {
  const dispatch = useDispatch();
  const { rbKladrRegistration, rbKladrStreetsRegistration } = useSelector(
    kladrSelector,
  );
  const {isLoadingKladrStreetsRegistration} = useSelector(kladrLoadingsSelector);
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
      title: 'Вид наблюдения',
      dataIndex: 'viewType',
      key: 'viewType',
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
    const cityArr = [] as string[];

    patients.map(
      (item) =>
        item.address[0]
          && !cityArr.includes(item.address[0].address.KLADRCode)
          && cityArr.push(item.address[0].address.KLADRCode)
    );
    console.log(cityArr)
  }, [patients]);

  const getSexName = (sex: 1 | 2) => {
    switch (sex) {
      case 1:
        return 'М';
      case 2:
        return 'Ж';
    }
  }

  const getTypeAddress = (patient: Patient) => {
    return (
      patient?.address?.find((item) => item.type === 0)?.freeInput ||
      getAddress(patient)
    );
  };

  const getAddress = (patient: Patient) => {
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
    const kladrStreet = rbKladrRegistration.find(
      (item) => item.id === kladrStreetCode,
    );
    // console.log('kladrStreet', kladrStreet);
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
  };

  const getFormattedProps = useMemo(() => {
    return patients.map((item) => {
      item && item.address[0] && dispatch(
        fetchKladrStreets({
          id: item.address[0].address.KLADRCode,
          type: 'registration',
        }),
      );
      return {
        ...item,
        key: item.code,
        cNumber: '',
        kNumber: '',
        address: getTypeAddress(item),
        viewType: '',
        sex: getSexName(item.sex),
        birthDate: moment(item.birthDate).format('DD-MM-YYYY'),
        medExamination: item.medExamination
          ? moment(item.medExamination).format('DD-MM-YYYY')
          : '',
        route: <Link to={`/card/${item.code}`}>Перейти</Link>,
        regCard: <Link to={`/regCard/${item.code}`}>Рег. карта</Link>,
      };
    });
  }, [patients]);

  return (isLoadingKladrStreetsRegistration)
    ? (
        <div className={'person-info-loading__wrapper'}>
          <Spin />
        </div>
    )
    : (
      <Table
        loading={isLoading || isLoadingKladrStreetsRegistration}
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
      />
    )
};

export default React.memo(PatientsTable);
