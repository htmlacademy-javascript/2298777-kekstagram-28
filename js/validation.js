import {showPostErrorMessage, showPostSuccessMessage} from './messages.js';
import {postData} from './server-api.js';
import {closeModal} from './upload-form.js';

const MAX_NUMBER_OF_HASHTAGS = 5;

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('#upload-submit');
const hashtagInput = uploadForm.querySelector('input[name="hashtags"]');
const REGEX = /^#[a-zа-я0-9]{1,19}$/;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error'
});

const validateHashtags = () => {
  const hashtagsText = hashtagInput.value.trim().toLowerCase();
  submitButton.disabled = false;
  if (hashtagsText === '') {
    return true;
  }
  const hashtags = hashtagsText.split(/\s+/);
  if (hashtags.length > MAX_NUMBER_OF_HASHTAGS || hashtags.length !== new Set(hashtags).size) {
    submitButton.disabled = true;
    return false;
  }
  for (const hashtag of hashtags) {
    if (!hashtag.match(REGEX)) {
      submitButton.disabled = true;
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
    submitButton.disabled = true;
    postData(new FormData(evt.target))
      .then(() => {
        closeModal();
        showPostSuccessMessage();
      })
      .catch(() => {
        showPostErrorMessage();
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
});
