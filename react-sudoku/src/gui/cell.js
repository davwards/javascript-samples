import React from 'react';

const handleChange = (handler) => (event) =>
  handler(parseInt(event.target.value));

const inputField = (value, makeMove) =>
  <input
    type='number'
    value={value}
    onChange={handleChange(makeMove)}
  />

export default (props) =>
  <div role="gridcell">
    {
      props.data.given
        ? props.data.value
        : inputField(props.data.value, props.makeMove)
    }
  </div>;
