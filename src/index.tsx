import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/lib/locale-provider/ru_RU';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import 'moment/locale/ru';

import './index.css';
import './scss/main.scss';
import store from './reduxStore/store';

import App from './App';

//set locale language for moment.js shared libs
moment.locale('ru');

ReactDOM.render(
  <ConfigProvider locale={ruRu}>
    <Provider store={store}>
      <// eslint-disable-line react/jsx-tag-spacing
      // @ts-ignore
      App
      />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);
