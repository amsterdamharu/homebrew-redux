import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './store';
import './index.css';
import { CountersContainer } from './Counters';
import { TotalContainer } from './TotalCounters';

ReactDOM.render(
  <Provider>
    <TotalContainer />
    <CountersContainer />
  </Provider>,
  document.getElementById('root')
);
