import {showPostErrorMessage, showPostSuccesMessage} from './messages.js';
import {postData} from './server-api.js';
import {closeModal, errorCloseModal, showModal} from './upload-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('input[name="hashtags"]');
const regex = /^#[a-zа-я0-9]{1,19}$/g;
const MAX_NUMBER_OF_HASHTAGS = 5;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error'
});

const validateHashtags = () => {
  const hashtagsText = hashtagInput.value.trim().toLowerCase();
  if (hashtagsText === '') {
    return true;
  }
  const hashtags = hashtagsText.split(' ');
  if (hashtags.length > MAX_NUMBER_OF_HASHTAGS || hashtags.length !== new Set(hashtags).size) {
    return false;
  }
  for (const hashtag of hashtags) {
    if (!hashtag.match(regex)) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(hashtagInput, validateHashtags, 'Не подходящее значение хэштега', 1, false);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    postData(new FormData(evt.target))
      .then(() => {
        closeModal();
        showPostSuccesMessage();
      })
      .catch(() => {
        errorCloseModal();
        showPostErrorMessage();
        document.querySelector('#upload-file').addEventListener('click', (e) => {
          e.preventDefault();
          showModal();
        },
        {once: true});
      });
  }
});
