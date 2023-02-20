const validateStringLength = (string, length) => string.length <= length;

const isPalindrome = (string) => {
  let i = 0;
  let j = string.length - 1;
  while (i !== parseInt(string.length / 2, 10)) {
    if (string[i] === ' ') {
      i++;
      continue;
    }
    if (string[j] === ' ') {
      j--;
      continue;
    }
    if (string[i].toLowerCase() !== string[j].toLowerCase()) {
      return false;
    }
    i++;
    j--;
  }
  return true;
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
const fillStartString = (string, length, filling) => {
  let result = string;
  if (result.length < length) {
    while (result.length < length) {
      if ((filling.length + result.length) < length) {
        result = filling + result;
      } else {
        result = filling.substring(0, length - result.length) + result;
      }
    }
  }
  return result;
};

export {fillStartString, getNumberFromString, validateStringLength, isPalindrome};
