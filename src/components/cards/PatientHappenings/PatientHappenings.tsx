import React, {useMemo, useState} from 'react';
import { Col, Row } from 'antd';

import './styles.scss';
import HappeningsProps from "./types";

import PatientHappeningsHeader from './components/PatientHappeningsHeader/PatientHappeningsHeader';
import PatientHappeningsList from './components/PatienHappeningsList/PatientHappeningsList';
import UploadDoc from '../../modals/UploadDoc/UploadDoc';

const PatientHappenings: React.FC<HappeningsProps> = ({events, isLoading}) => {
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

  const onQueryChange = (query: string) => {
    setSearchQuery(query);
  }

  const getQueryEvents = useMemo(() => {
    if (searchQuery) {
      return events.filter((item) => {
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
      return events;
    }
  }, [searchQuery, events]);

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
              isLoading={isLoading}
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
