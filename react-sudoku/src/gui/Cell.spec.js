import ReactDOM from 'react-dom';
import React from 'react';
import Cell from './Cell';

const DOM_ROOT_SELECTOR = 'root';

describe('Cell component', () => {
  beforeEach(prepareDom);

  describe('with a given value', () => {
    it('displays the read-only value', () => {
      renderWith({ value: 3, given: true, valid: true });

      expect(page()).toContain('3');
      expect(document.querySelector('input')).toBe(null);
    });
  });

  describe('with a blank value', () => {
    it('displays an input', () => {
      renderWith({ value: undefined, given: false, valid: true });

      expect(document.querySelector('input')).not.toBe(null);
    });
  });

  describe('with a filled value', () => {
    it('displays an input containing the value', () => {
      renderWith({ value: 3, given: false, valid: true });

      expect(document.querySelector('input[value="3"]')).not.toBe(null);
    });

    describe('when the value is changed', () => {
      it('calls the makeMove callback', () => {
        const makeMove = jest.fn();
        renderWith({ value: undefined, given: false, valid: true}, makeMove);

        expect(makeMove).not.toHaveBeenCalled();

        const input = document.querySelector('input');
        input.value = '4';
        input.dispatchEvent(new Event('input', {bubbles: true, cancelable: false}))

        expect(makeMove).toHaveBeenCalledWith(4);
      });
    });

    describe('when the puzzle is not solved', () => {
      it('enables the input field', () => {
        renderWith({value: undefined, given: false, valid: true}, ()=>{}, false);

        const input = document.querySelector('input');
        expect(input.disabled).toBe(false);
      });
    });

    describe('when the puzzle is solved', () => {
      it('disables the input field', () => {
        renderWith({ value: undefined, given: false, valid: true}, ()=>{}, true);

        const input = document.querySelector('input');
        expect(input.disabled).toBe(true);
      });
    });
  });

  function prepareDom() {
    document.body.innerHTML = `<table><tbody><tr id="${DOM_ROOT_SELECTOR}"></tr></tbody></table>`;
  }

  function renderWith(data, makeMove, solved) {
    ReactDOM.render(
      <Cell data={data} makeMove={makeMove} solved={solved} />,
      document.getElementById(DOM_ROOT_SELECTOR)
    );
  }

  function page() {
    return document.getElementById(DOM_ROOT_SELECTOR).innerHTML;
  }

});
