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

const stopPropagation = (evt) => evt.stopPropagation();

const removeEventListenerRest = (parent, type, action, ...selectors) => {
  for (const selector of selectors) {
    parent.querySelector(selector).removeEventListener(type, action);
  }
};

const addEventListenerRest = (parent, type, action, ...selectors) => {
  for (const selector of selectors) {
    parent.querySelector(selector).addEventListener(type, action);
  }
};

const addStyleToElement = (element, stylePropepries) => {
  for (const [property, value] of Object.entries(stylePropepries)) {
    element.style.setProperty(property, value);
  }
};

export {getRandomIdCreator, getRandomNumber, isEscapeKeydown,
  stopPropagation, removeEventListenerRest, addEventListenerRest,
  addStyleToElement};
