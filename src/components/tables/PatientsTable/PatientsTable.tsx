import React, { FC, useMemo, useState } from 'react';
import { Table } from 'antd';
import './styles.scss';
import moment from 'moment';
import Patient from '../../../types/data/Patient';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

type TableProps = {
  patients: Patient[];
  isLoading: boolean;
  onPatientClick: (id: number) => void;
  currentPatient?: number;
};

type ToolTipInfo = {
  fullName: string;
  lastChange: Date;
};

const PatientsTable: FC<TableProps> = (props) => {
  const navigation = useHistory();
  const [isShowTooltip, setIsShowTooltip] = useState(false);

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

  function getSexName(sex: 1 | 2) {
    switch (sex) {
      case 1:
        return 'М';
      case 2:
        return 'Ж';
    }
  }

  const getFormattedProps = useMemo(() => {
    return props.patients.map((item, index) => {
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
  }, [props.patients]);

  return (
    <>
      <Table
        loading={props.isLoading}
        dataSource={getFormattedProps}
        columns={columns}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: props.currentPatient ? [props.currentPatient] : [],
          onChange: (selectedRowKeys, selectedRows) => {
            if (typeof selectedRowKeys[0] === 'number') {
              props.onPatientClick(selectedRowKeys[0]);
            }
          },
        }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              console.log(record);
              props.onPatientClick(record.key);
            },
            onMouseEnter: (event) => {
              event.persist();
              setIsShowTooltip(true);
            },
            onMouseLeave: (event) => {
              event.persist();
              setIsShowTooltip(false);
            },
          };
        }}
      />
    </>
  );
};

export default PatientsTable;
