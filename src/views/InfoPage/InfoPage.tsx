import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Col, Row } from 'antd';

import './styles.scss';

import InfoPageTabs from '../../components/tabs/InfoPageTabs/InfoPageTabs';
import TableSearchHeader from '../../components/tables/wrappers/TableSearchHeader/TableSearchHeader';

const InfoPage: React.FC = () => {
  const navigation = useHistory();
  const [tableMode, setTableMode] = useState<'default' | 'search'>('default');

  const goToMain = () => {
    navigation.push('/');
  };

  return (
    <Row className={'info-page'}>
      <Col span={24}>
        <TableSearchHeader
          title={'Справочная информация'}
          onCloseClick={goToMain}
          mode={tableMode}
          onTableModeChange={(mode) => {
            setTableMode(mode);
          }}>
          <InfoPageTabs />
        </TableSearchHeader>
      </Col>
    </Row>
  );
};

export default InfoPage;
