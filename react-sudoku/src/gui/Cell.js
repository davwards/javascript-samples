import React from 'react';
import { merge } from 'lodash';

const cellStyle = (props) => merge({
  background: props.data.valid ? 'white' : '#FDD',
  fontWeight: props.data.given ? 'bold' : 'normal',
  width: '50px',
  height: '50px',
  textAlign: 'center',
  fontSize: '2em',
  border: 'solid black 1px',
  padding: 0,
}, props.style);

const inputStyle = (data) => ({
  border: 'none',
  background: data.valid ? '#EEE' : '#EDD',
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

const inputField = (data, makeMove) =>
  <input
    type='number'
    min='1'
    max='9'
    value={data.value || ''}
    onChange={handleChange(makeMove)}
    style={inputStyle(data)}
  />

export default (props) =>
  <td role="gridcell" style={cellStyle(props)}>
    {
      props.data.given
        ? props.data.value
        : inputField(props.data, props.makeMove)
    }
  </td>;
