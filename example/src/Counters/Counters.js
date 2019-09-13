import React from 'react';
import { CounterContainer } from '../Counter';
export default function Counters(props) {
  const { counters, none, add } = props;
  console.log('parent render', counters);
  return (
    <div>
      <button onClick={add}>Add</button>
      <button onClick={none}>No Change</button>
      {counters.map(({ id }) => (
        <CounterContainer key={id} ID={id} />
      ))}
    </div>
  );
}
