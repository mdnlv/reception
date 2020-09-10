import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './scss/main.scss';
import moment from 'moment';
import 'moment/locale/ru';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/lib/locale-provider/ru_RU';
import { Provider } from 'react-redux';
import AppStore from './store/store';

//set locale language for moment.js shared libs
moment.locale('ru');

ReactDOM.render(
  <ConfigProvider locale={ruRu}>
    <Provider store={AppStore}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
