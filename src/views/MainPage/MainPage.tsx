import React, { FC, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import PatientsTable from '../../components/tables/PatientsTable/PatientsTable';
import PatientInfoCard from '../../components/cards/PatientInfoCard/PatientInfoCard';
import './styles.scss';
import TableSearchHeader from '../../components/tables/wrappers/TableSearchHeader/TableSearchHeader';
import TimeTable from '../../components/elements/TimeTable/TimeTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchPatients } from '../../store/patients/actions';

const MainPage: FC = (props) => {
  const dispatch = useDispatch();
  const infoBooks = useSelector((state: RootState) => state.infoBooks);
  const { patients, isLoading } = useSelector(
    (state: RootState) => state.patients,
  );
  const [currentPatient, setCurrentPatient] = useState<number | undefined>(
    undefined,
  );
  const [showUserInfo, setShowInfo] = useState(false);

  const currentPatientMemo = useMemo(() => {
    return patients.find((item) => item.code === currentPatient);
  }, [currentPatient]);

  useEffect(() => {
    dispatch(
      fetchPatients({
        limit: 300,
        offset: 0,
      }),
    );
  }, []);

  function onTableRowClick(id: number) {
    if (id === currentPatient) {
      setCurrentPatient(undefined);
    } else {
      setCurrentPatient(id);
    }
  }

  const handlePatientsQuery = (query: string) => {
    console.log(query);
  };

  const getInfoCard = useMemo(() => {
    if (showUserInfo) {
      return !!currentPatient;
    } else {
      return false;
    }
  }, [showUserInfo, currentPatient]);

  const treeProps = {
    asdasd123123: {
      title: 'asdad',
      unit: 'sadas',
      doc: 'dsadas',
      children: {
        sadasd: {
          title: 'sad34',
          unit: 'asd34',
          doc: '324d',
          children: {
            asd34322: {
              title: '432999fsd',
              unit: 'das',
              doc: '34242',
            },
            '2342423fdsfsd': {
              title: '342424',
              unit: 'dsa233',
              doc: '324',
            },
          },
        },
      },
    },
    '234eew3': {
      title: 'asdad',
      unit: 'sadas',
      doc: 'dsadas',
      children: {
        fds3fds24: {
          title: 'sad34',
          unit: 'asd34',
          doc: '324d',
          children: {
            '342423432fdsf': {
              title: '432999fsd',
              unit: 'das',
              doc: '34242',
            },
            dsccc3244332: {
              title: '342424',
              unit: 'dsa233',
              doc: '324',
            },
          },
        },
      },
    },
  };

  return (
    <Row className={'main-page'}>
      <Col span={getInfoCard ? 17 : 24} className={'main-page__tables'}>
        <Row>
          <Col span={24}>
            <TableSearchHeader
              title={'Пациенты'}
              type={'filter'}
              onOpenSearch={() => {
                setShowInfo(!showUserInfo);
              }}
              onChangeQuery={handlePatientsQuery}>
              <PatientsTable
                onPatientClick={onTableRowClick}
                isLoading={isLoading}
                patients={patients}
                currentPatient={currentPatient}
              />
            </TableSearchHeader>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TableSearchHeader
              className={'docs-search-table'}
              title={'Врачи'}
              type={'filter'}
              onOpenSearch={() => {
                setShowInfo(!showUserInfo);
              }}
              onChangeQuery={() => {}}>
              <TimeTable data={treeProps} />
            </TableSearchHeader>
          </Col>
        </Row>
      </Col>
      {getInfoCard && (
        <Col span={7}>
          <PatientInfoCard isLoading={isLoading} patient={currentPatientMemo} />
        </Col>
      )}
    </Row>
  );
};

export default MainPage;
