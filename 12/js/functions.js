const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, isEscapeKeydown,
  stopPropagation, removeEventListenerRest, addEventListenerRest,
  addStyleToElement, debounce};
