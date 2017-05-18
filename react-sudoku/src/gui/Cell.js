import React from 'react';
import { merge } from 'lodash';

const cellBackground = (valid, solved) => {
  if(solved) {
    return '#EFE';
  } else if(valid) {
    return 'white';
  } else {
    return '#FDD';
  }
}

const inputBackground = (valid, solved) => {
  if(solved) {
    return '#CFC';
  } else if(valid) {
    return '#EEE';
  } else {
    return '#EDD';
  }
}

const cellStyle = (props) => merge({
  background: cellBackground(props.data.valid, props.solved),
  fontWeight: props.data.given ? 'bold' : 'normal',
  width: '50px',
  height: '50px',
  textAlign: 'center',
  fontSize: '2em',
  border: 'solid black 1px',
  padding: 0,
}, props.style);

const inputStyle = (data, solved) => ({
  background: inputBackground(data.valid, solved),
  border: 'none',
  fontSize: '1em',
  width: '50px',
  height: '100%',
  textAlign: 'center',
  fontFamily: 'times',
  padding: 0,
  margin: 0,
})

const handleChange = (handler) => (event) =>
  handler(parseInt(event.target.value, 10));

const inputField = (data, makeMove, solved) =>
  <input
    disabled={solved}
    type='number'
    min='1'
    max='9'
    value={data.value || ''}
    onChange={handleChange(makeMove)}
    style={inputStyle(data, solved)}
  />

export default (props) =>
  <td role="gridcell" style={cellStyle(props)}>
    {
      props.data.given
        ? props.data.value
        : inputField(props.data, props.makeMove, props.solved)
    }
  </td>;
