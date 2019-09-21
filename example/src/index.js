import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './store';
import './index.css';
import { CountersContainer } from './Counters';
import { TotalContainer } from './TotalCounters';

ReactDOM.render(
  <StoreProvider>
    <TotalContainer />
    <CountersContainer />
  </StoreProvider>,
  document.getElementById('root')
);
