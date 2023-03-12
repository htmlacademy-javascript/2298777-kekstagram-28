const uploadForm = document.querySelector('.img-upload__form');
const hashtags = uploadForm.querySelector('input[name="hashtags"]');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error'
});

const validateHashtags = () => {
  let returnValue = true;
  const hashtagsText = hashtags.value.trim().toLowerCase();
  const hashtagsArray = hashtagsText.split(' ');
  for (const hashtag of hashtagsArray) {
    const regex = /^#[a-zа-я0-9]{1,19}$/g;
    if (!hashtag.match(regex) || hashtagsArray.filter((e) => e === hashtag).length > 1) {
      returnValue = false;
      break;
    }
  }
  return returnValue || hashtagsText === '';
};

pristine.addValidator(hashtags, () => validateHashtags(), 'Не подходящее значение хэштега', 1, false);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});
