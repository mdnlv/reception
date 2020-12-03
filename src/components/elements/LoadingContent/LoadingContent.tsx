import React from 'react';
import { Spin } from 'antd';

import './styles.scss';
import {ContentProps} from "./types";

const LoadingContent: React.FC<ContentProps> = ({
  isLoading,
  children
}) => {
  return (
    <div className={'loading-content'}>
      {isLoading ? (
        <div className={'loading-content__spinner'}>
          <Spin />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingContent;
