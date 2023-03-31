import {addStyleToElement, isEscapeKeydown, stopPropagation} from './functions.js';

const postSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const postErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const renderErrorStyle = {
  'z-index': '100',
  'position': 'absolute',
  'left': '0',
  'top': '0',
  'right': '0',
  'padding': '10px 3px',
  'font-size': '30px',
  'text-align': 'center',
  'background-color': 'red',
};


const showRenderErrorMessage = () => {
  const alertContainer = document.createElement('div');
  addStyleToElement(alertContainer, renderErrorStyle);
  alertContainer.textContent = 'Ошибка загрузки данных. Попробуйте перезагрузить страницу.';
  document.body.append(alertContainer);
};

const addOnCloseListeners = (message, messageButton, messageSelector) => {

  const closePostMessage = () => {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', closePostMessage);
    document.body.removeChild(message);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKeydown(evt)) {
      evt.preventDefault();
      closePostMessage();
    }
  }

  document.addEventListener('click', closePostMessage);
  message.querySelector(messageSelector).addEventListener('click', stopPropagation);
  document.addEventListener('keydown', onDocumentKeydown);
  messageButton.addEventListener('click', closePostMessage);
  document.body.appendChild(message);
};

const showPostSuccessMessage = () => {

  const successMessage = postSuccessTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  const successSelector = '.success__inner';

  addOnCloseListeners(successMessage, successButton, successSelector);
};

const showPostErrorMessage = () => {

  const errorMessage = postErrorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  const errorSelector = '.error__inner';

  addOnCloseListeners(errorMessage, errorButton, errorSelector);
};

export {showRenderErrorMessage, showPostSuccessMessage, showPostErrorMessage};
