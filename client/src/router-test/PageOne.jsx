/* eslint-disable require-jsdoc */

import React from 'react';
import useStore from '../zustand.js';

function PageOne() {
  const number = useStore((state) => state.number);
  return (
    <div className="forums">
      <div className="card">
        Card 1
        <p>{number}</p>
        <button onClick={useStore((state) => state.increaseNumber)}>
          Increase
        </button>
        <button onClick={useStore((state) => state.decreaseNumber)}>
          Decrease
        </button>
      </div>
    </div>
  );
}

export default PageOne;
