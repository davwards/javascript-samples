export function blank() {
  return {value: undefined, given: false, valid: true};
}

export function given(value) {
  return {value: value, given: true, valid: true};
}

export function filled(value) {
  return {value: value, given: false, valid: true};
}

export function invalid(value) {
  return {value: value, given: false, valid: false};
}
