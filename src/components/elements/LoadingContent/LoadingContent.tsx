import React from 'react';
import { Spin } from 'antd';
import './styles.scss';

interface ContentProps {
  isLoading: boolean;
}

const LoadingContent: React.FC<ContentProps> = (props) => {
  return (
    <div className={'loading-content'}>
      {props.isLoading ? (
        <div className={'loading-content__spinner'}>
          <Spin />
        </div>
      ) : (
        props.children
      )}
    </div>
  );
};

export default LoadingContent;
