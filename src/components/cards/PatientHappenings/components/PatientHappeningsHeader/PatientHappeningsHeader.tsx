import React from 'react';
import {Button, Col, Input, Row} from 'antd';
import {DeleteOutlined, DownloadOutlined, PlusOutlined,} from '@ant-design/icons/lib';
import './styles.scss';

type HeaderProps = {
  selectedHappening?: number;
  uploadDoc(): void;
  onInputChange(query: string): void;
  searchQuery: string;
};

const PatientHappeningsHeader: React.FC<HeaderProps> = (props) => {
  return (
    <Row
      justify={'space-between'}
      align={'middle'}
      className={'happenings-actions'}>
      <Col span={8}>
        <Input
          size={'small'}
          value={props.searchQuery}
          onChange={(event) => {
            props.onInputChange(event.target.value);
          }}
        />
      </Col>
      {props.selectedHappening && (
        <Col span={10}>
          <Row justify={'end'}>
            <Button
              type={'primary'}
              onClick={() => {
                props.uploadDoc();
              }}
              className={'save-btn header-actions__item'}
              icon={<PlusOutlined />}>
              загрузить документ
            </Button>
            <Button
              type={'primary'}
              className={'header-actions__item'}
              ghost
              icon={<DownloadOutlined />}>
              скачать
            </Button>
            <Button
              type={'primary'}
              danger
              className={'header-actions__item'}
              icon={<DeleteOutlined />}>
              удалить документ
            </Button>
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default PatientHappeningsHeader;
