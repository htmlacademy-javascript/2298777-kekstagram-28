import './validation.js';
import './filters-slider.js';
import {addEventListenerRest, isEscapeKeydown, removeEventListenerRest, stopPropagationFunc} from './functions.js';

const ESC_RESISTANT_CLASS = ['input[name="hashtags"]', 'textarea[name="description"]'];

const uploadButton = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalCloseButton = uploadModal.querySelector('#upload-cancel');
const uploadImgPreview = uploadModal.querySelector('.img-upload__preview').children[0];

const createUploadForm = () => {
  //#region
  const showModal = () => {
    uploadImgPreview.src = `photos/${uploadButton.value.split('\\')[2]}`;
    uploadModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    addEventListenerRest(uploadModal, 'keydown', stopPropagationFunc, ...ESC_RESISTANT_CLASS);
  };

  const hideModal = () => {
    uploadButton.value = '';
    uploadModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    removeEventListenerRest(uploadModal, 'keydown', stopPropagationFunc, ...ESC_RESISTANT_CLASS);
  };

  const closeModal = () => {
    hideModal();
    uploadModalCloseButton.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKeydown(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }
  //#endregion
  uploadButton.addEventListener('change', () => {
    showModal();

    uploadModalCloseButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', onDocumentKeydown);

  });
};

export {createUploadForm};
