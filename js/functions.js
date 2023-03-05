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

const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getRandomIdCreator = (min, max) => {
  const ids = Array.from({length: max - min + 1}, (_, i) => min + i);

  return function () {
    const randomIndex = getRandomNumber(0, ids.length - 1);
    const resultId = ids[randomIndex];
    ids.splice(randomIndex, 1);
    return resultId;
  };
};

const isEscapeKeydown = (evt) => evt.key === 'Escape';

export {fillStartString, getNumberFromString, validateStringLength,
  isPalindrome, getRandomIdCreator, getRandomNumber, isEscapeKeydown};
