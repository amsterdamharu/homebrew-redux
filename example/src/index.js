import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './store';
import './index.css';
import { CountersContainer } from './Counters';

ReactDOM.render(
  <StoreProvider>
    <CountersContainer />
  </StoreProvider>,
  document.getElementById('root')
);
