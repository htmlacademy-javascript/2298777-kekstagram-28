'use strict';

const validateStringLength = (str, length) => str.length <= length;

const isPalindrome = (str) => {
  str = str.replaceAll(' ', '').toLowerCase();
  if (str.length % 2 !== 0) {
    return str.slice(0, str.length / 2 + 1) ===
      str.slice(str.length / 2, str.length).split('').reverse().join('');
  }
  return str.slice(0, str.length / 2) ===
    str.slice(str.length / 2, str.length).split('').reverse().join('');
};

const getNumberFromString = (input) => {
  input = input.toString();
  let result = '';
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== ' ' && Number.isInteger(+input[i])) {
      result += input[i];
    }
  }
  return result.length !== 0 ? Number(result) : NaN;
};

const fillStartString = (str, length, filling) => {
  if (str.length < length) {
    while (str.length < length) {
      str = (filling.length + str.length) < length ? filling + str :
        filling.substring(0, length - str.length) + str;
    }
  }
  return str;
};
