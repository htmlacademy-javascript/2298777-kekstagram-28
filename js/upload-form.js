import './validation.js';
import './filters-slider.js';
import {addEventListenerRest, isEscapeKeydown, removeEventListenerRest, stopPropagation} from './functions.js';

const ESC_RESISTANT_CLASS = ['input[name="hashtags"]', 'textarea[name="description"]'];

const uploadButton = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalCloseButton = uploadModal.querySelector('#upload-cancel');
const uploadImgPreview = uploadModal.querySelector('.img-upload__preview').children[0];
const uploadForm = document.querySelector('.img-upload__form');

const createUploadForm = () => {
  //#region
  const showModal = () => {
    uploadImgPreview.src = `photos/${uploadButton.value.split('\\')[2]}`;
    uploadModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    addEventListenerRest(uploadModal, 'keydown', stopPropagation, ...ESC_RESISTANT_CLASS);
  };

  const hideModal = () => {
    uploadButton.value = '';
    uploadForm.querySelector('input[name="hashtags"]').value = '';
    uploadForm.querySelector('textarea[name="description"]').value = '';
    const pristineError = uploadModal.querySelector('.pristine-error');
    if (pristineError !== null) {
      pristineError.style.display = 'none';
    }
    document.body.classList.remove('modal-open');
    removeEventListenerRest(uploadModal, 'keydown', stopPropagation, ...ESC_RESISTANT_CLASS);
    uploadModal.classList.add('hidden');
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
