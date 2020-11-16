import React, { FC, useMemo } from 'react';
import Table from 'antd/lib/table';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './styles.scss';
import {TableProps} from "./types";

const PatientsTable: FC<TableProps> = ({
  patients,
  isLoading,
  onPatientClick,
  currentPatient
}) => {
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
  ];

  const getSexName = (sex: 1 | 2) => {
    switch (sex) {
      case 1:
        return 'М';
      case 2:
        return 'Ж';
    }
  }

  const getFormattedProps = useMemo(() => {
    return patients.map((item, index) => {
      return {
        ...item,
        key: item.code,
        cNumber: '',
        kNumber: '',
        address: item.address.find((item) => item.type === 0)?.freeInput,
        viewType: '',
        sex: getSexName(item.sex),
        birthDate: moment(item.birthDate).format('DD-MM-YYYY'),
        medExamination: item.medExamination
          ? moment(item.medExamination).format('DD-MM-YYYY')
          : '',
        route: <Link to={`/card/${item.code}`}>Перейти</Link>,
      };
    });
  }, [patients]);

  return (
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
    />
  );
};

export default React.memo(PatientsTable);
