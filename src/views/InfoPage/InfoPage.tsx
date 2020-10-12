import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Col, Row } from 'antd';
import InfoPageTabs from '../../components/tabs/InfoPageTabs/InfoPageTabs';
import TableSearchHeader from '../../components/tables/wrappers/TableSearchHeader/TableSearchHeader';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const InfoPage: React.FC = (props) => {
  const navigation = useHistory();
  const dispatch = useDispatch();
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
          onChangeQuery={() => {}}
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
