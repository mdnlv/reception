import React, { useMemo, useState } from 'react';
import PatientHappeningsHeader from './components/PatientHappeningsHeader/PatientHappeningsHeader';
import './styles.scss';
import { Col, Row } from 'antd';
import PatientHappeningsList from './components/PatienHappeningsList/PatientHappeningsList';
import UploadDoc from '../../modals/UploadDoc/UploadDoc';
import DetailedPatientEvent from '../../../types/data/DetailedPatientEvent';

interface HappeningsProps {
  events: DetailedPatientEvent[];
}

const PatientHappenings: React.FC<HappeningsProps> = (props) => {
  const [selectedHappening, setSelectedHappening] = useState<
    number | undefined
  >(1);
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectHappening = (index: number) => {
    if (selectedHappening !== index) {
      setSelectedHappening(index);
    } else {
      setSelectedHappening(undefined);
    }
  };

  function onQueryChange(query: string) {
    setSearchQuery(query);
  }

  const getQueryEvents = useMemo(() => {
    if (searchQuery) {
      return props.events.filter((item) => {
        return (
          item.assignDoc.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
            -1 ||
          item.executedDoc.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
            -1 ||
          item.state.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
          item.type.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        );
      });
    } else {
      return props.events;
    }
  }, [searchQuery, props.events]);

  const showUploadModal = () => {
    setVisibleModal(true);
  };

  return (
    <div className={'patient-happenings-card'}>
      <div className="patient-happenings-card__header">
        <h3 className={'header-title'}>Случаи</h3>
      </div>
      <div className="patient-happenings-card__content">
        <PatientHappeningsHeader
          searchQuery={searchQuery}
          onInputChange={onQueryChange}
          uploadDoc={showUploadModal}
          selectedHappening={selectedHappening}
        />
        <Row>
          <Col span={24}>
            <PatientHappeningsList
              data={getQueryEvents}
              onSelect={selectHappening}
              selectedItem={selectedHappening}
            />
          </Col>
        </Row>
      </div>
      <UploadDoc
        onClose={() => {
          setVisibleModal(false);
        }}
        isVisible={isVisibleModal}
      />
    </div>
  );
};

export default PatientHappenings;
