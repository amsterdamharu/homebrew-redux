import React from 'react';

export default function Total({ total }) {
  console.log('in total render', total);
  return <h4>Total counters:{total}</h4>;
}
