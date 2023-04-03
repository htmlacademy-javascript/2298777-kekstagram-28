import './validation.js';
import {addListenersOnEffects, addMiniatureEffectPreview, resetEffects} from './filter-sliders.js';
import {addEventListenerRest, isEscapeKeydown, stopPropagation} from './functions.js';
import {addOnScaleButton, resetScale} from './scale-button.js';

const ESC_RESISTANT_CLASSES = ['input[name="hashtags"]', 'textarea[name="description"]'];

const uploadButton = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalCloseButton = uploadModal.querySelector('#upload-cancel');
const uploadImgPreview = uploadModal.querySelector('.img-upload__preview').children[0];
const uploadForm = document.querySelector('.img-upload__form');

const closeModal = () => {
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
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
};

function onDocumentKeydown (evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const showModal = () => {
  uploadForm.querySelector('input[name="scale"]').value = '100%';
  uploadImgPreview.src = URL.createObjectURL(uploadButton.files[0]);
  addMiniatureEffectPreview();
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const createUploadForm = () => {

  uploadImgPreview.src = '';
  addOnScaleButton();
  addListenersOnEffects();
  addEventListenerRest(uploadModal, 'keydown', stopPropagation, ...ESC_RESISTANT_CLASSES);

  uploadModalCloseButton.addEventListener('click', () => {
    closeModal();
  });

  uploadButton.addEventListener('click', (e) => {
    if (uploadImgPreview.getAttribute('src') !== '') {
      e.preventDefault();
      showModal();
    }
  });

  uploadButton.addEventListener('change', () => {
    showModal();
  });

};

export {createUploadForm, closeModal, showModal};
