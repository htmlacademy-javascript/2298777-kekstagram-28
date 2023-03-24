import './validation.js';
import {addListenersOnEffects, resetEffects} from './filter-sliders.js';
import {addEventListenerRest, isEscapeKeydown, removeEventListenerRest, stopPropagation} from './functions.js';
import {addOnScaleButton, resetScale} from './scale-button.js';

const ESC_RESISTANT_CLASS = ['input[name="hashtags"]', 'textarea[name="description"]'];

const uploadButton = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalCloseButton = uploadModal.querySelector('#upload-cancel');
const uploadImgPreview = uploadModal.querySelector('.img-upload__preview').children[0];
const uploadForm = document.querySelector('.img-upload__form');

const closeModal = (isErrorOccurred = false) => () => {
  if (!isErrorOccurred) {
    resetScale();
    resetEffects();
    uploadImgPreview.src = '';
    uploadButton.value = '';
    uploadForm.querySelector('input[name="hashtags"]').value = '';
    uploadForm.querySelector('textarea[name="description"]').value = '';
    const pristineError = uploadModal.querySelector('.pristine-error');
    if (pristineError !== null) {
      pristineError.style.display = 'none';
    }
    removeEventListenerRest(uploadModal, 'keydown', stopPropagation, ...ESC_RESISTANT_CLASS);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  document.body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
};

function onDocumentKeydown (evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeModal()();
  }
}

const showModal = (e) => {
  if (uploadImgPreview.getAttribute('src') !== '') {
    e.preventDefault();
  }
  uploadImgPreview.src = `photos/${uploadButton.value.split('\\')[2]}`;
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addEventListenerRest(uploadModal, 'keydown', stopPropagation, ...ESC_RESISTANT_CLASS);
};

const createUploadForm = () => {

  uploadImgPreview.src = '';
  addOnScaleButton();
  addListenersOnEffects();
  uploadModalCloseButton.addEventListener('click', closeModal());

  uploadButton.addEventListener('click', (e) => {
    uploadForm.querySelector('input[name="scale"]').value = '100%';
    const waitForUpload = () => {
      if (uploadButton.value !== '') {
        showModal(e);
      } else {
        setTimeout(waitForUpload, 16);
      }
    };
    waitForUpload();
    document.addEventListener('keydown', onDocumentKeydown);
  });

};

export {createUploadForm, closeModal, showModal};
