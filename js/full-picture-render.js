import {isEscapeKeydown} from './functions.js';

const bigPicture = document.querySelector('.big-picture');
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
  }
};

const hideElements = () => {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const addBigPictureData = (photo) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
};

const addCommentData = (photo) => {
  const commentsFragment = document.createDocumentFragment();
  photo['comments'].forEach((comment) => {
    const commentItem = commentsTemplate.cloneNode(true);
    commentItem.querySelector('img').src = comment.avatar;
    commentItem.querySelector('img').alt = comment.name;
    commentItem.querySelector('p').textContent = comment.message;
    commentsFragment.append(commentItem);
  });
  socialComments.innerHTML = '';
  socialComments.append(commentsFragment);
};

const renderBigPicture = (evt, photo) => {

  evt.preventDefault();
  document.body.classList.add('modal-open');

  hideElements();

  addBigPictureData(photo);

  addCommentData(photo);

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

export {renderBigPicture};
