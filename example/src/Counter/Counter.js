import React from 'react';

export default function Counter(props) {
  console.log('component render', props);
  return (
    <div>
      <div>{props.b}</div>
      <div>
        <button onClick={props.up}>UP</button>
        <button onClick={props.down}>DOWN</button>
        <button onClick={props.remove}>REMOVE</button>
      </div>
    </div>
  );
}
