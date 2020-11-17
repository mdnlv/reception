import React, { FC, useMemo } from 'react';
import Table from 'antd/lib/table';
import './styles.scss';
import moment from 'moment';
import Patient from '../../../types/data/Patient';
import { Link } from 'react-router-dom';

type TableProps = {
  patients: Patient[];
  isLoading: boolean;
  onPatientClick: (id: number) => void;
  currentPatient?: number;
};

const PatientsTable: FC<TableProps> = (props) => {
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

  function getSexName(sex: 1 | 2) {
    switch (sex) {
      case 1:
        return 'М';
      case 2:
        return 'Ж';
    }
  }

  const getFormattedProps = useMemo(() => {
    return props.patients.map((item) => {
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
        regCard: <Link to={`/regCard/${item.code}`}>Рег. карта</Link>,
      };
    });
  }, [props.patients]);

  return (
    <Table
      loading={props.isLoading}
      dataSource={getFormattedProps}
      columns={columns}
      rowSelection={{
        type: 'radio',
        selectedRowKeys: props.currentPatient ? [props.currentPatient] : [],
        onChange: (selectedRowKeys) => {
          if (typeof selectedRowKeys[0] === 'number') {
            props.onPatientClick(selectedRowKeys[0]);
          }
        },
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            props.onPatientClick(record.key);
          },
        };
      }}
    />
  );
};

export default React.memo(PatientsTable);
