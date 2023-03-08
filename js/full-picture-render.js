import {isEscapeKeydown} from './functions.js';

const NUMBER_OF_VISIBLE_COMMENTS = 5;

let shownComments;

const bigPicture = document.querySelector('.big-picture');
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentLoaderButton = bigPicture.querySelector('.comments-loader');

const addBigPictureData = (photo) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
};

const getCommentData = (comments, numberToShow) => {
  const commentsFragment = document.createDocumentFragment();
  for (let i = shownComments; i < (shownComments + numberToShow); i++) {
    commentsFragment.append(comments[i]);
  }
  shownComments += numberToShow;
  socialComments.append(commentsFragment);
};

const addCommentsToArray = (photo) => {
  const comments = [];
  photo.comments.forEach((comment) => {
    const commentItem = commentsTemplate.cloneNode(true);
    commentItem.querySelector('img').src = comment.avatar;
    commentItem.querySelector('img').alt = comment.name;
    commentItem.querySelector('p').textContent = comment.message;
    comments.push(commentItem);
  });
  return comments;
};

const renderBigPicture = (evt, photo) => {

  evt.preventDefault();
  document.body.classList.add('modal-open');
  socialComments.innerHTML = '';
  shownComments = 0;
  let numberToShow = NUMBER_OF_VISIBLE_COMMENTS > photo.comments.length ?
    photo.comments.length : NUMBER_OF_VISIBLE_COMMENTS;
  const comments = addCommentsToArray(photo);

  const hideCommentLoader = () => {
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    commentLoaderButton.removeEventListener('click', onCommentButtonClick);
  };

  const addCommentLoader = () => {
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    commentLoaderButton.addEventListener('click', onCommentButtonClick);
  };

  const addCommentsCount = () => {
    const commentsCount = comments.length;
    bigPicture.querySelector('.social__comment-count').innerHTML =
      `${Math.min(commentsCount, NUMBER_OF_VISIBLE_COMMENTS)} из <span class="comments-count">${comments.length}</span> комментариев`;
    if (commentsCount <= NUMBER_OF_VISIBLE_COMMENTS) {
      hideCommentLoader();
    } else {
      addCommentLoader();
    }
  };

  function onCommentButtonClick() {
    numberToShow = comments.length - shownComments < NUMBER_OF_VISIBLE_COMMENTS ?
      comments.length - shownComments : NUMBER_OF_VISIBLE_COMMENTS;
    getCommentData(comments, numberToShow);
    bigPicture.querySelector('.social__comment-count').innerHTML =
      `${shownComments} из <span class="comments-count">${comments.length}</span> комментариев`;
    if (shownComments === comments.length) {
      hideCommentLoader();
    }
  }

  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
    commentLoaderButton.removeEventListener('click', onCommentButtonClick);
  }

  function onDocumentKeydown (evt) {
    if (isEscapeKeydown(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  }

  getCommentData(comments, numberToShow);
  addCommentsCount(photo);
  addBigPictureData(photo);
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

export {renderBigPicture};
