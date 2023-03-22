import {isEscapeKeydown, stopPropagation} from './functions.js';

const postSuccesTemplate = document.querySelector('#success').content.querySelector('.success');
const postErrorTemplate = document.querySelector('#error').content.querySelector('.error');


const showRenderErrorMessage = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
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

const showPostSuccesMessage = () => {

  const successMessage = postSuccesTemplate.cloneNode(true);
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

export {showRenderErrorMessage, showPostSuccesMessage, showPostErrorMessage};
