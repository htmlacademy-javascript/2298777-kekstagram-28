import {isEscapeKeydown} from './functions.js';

const NUMBER_OF_VISIBLE_COMMENTS = 5;

let shownComments;
let firstRender = true;

const bigPicture = document.querySelector('.big-picture');
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentLoaderButton = bigPicture.querySelector('.comments-loader');
const commentsCountElement = bigPicture.querySelector('.social__comment-count');

const createCounterHtml = (commentsShown, commentsCount) => {
  commentsCountElement.textContent = '';
  const spanItem = document.createElement('span');
  spanItem.classList.add('comments-count');
  spanItem.textContent = commentsCount;
  commentsCountElement.append(`${commentsShown} из `,
    spanItem,
    ' комментариев');
};

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

const createComments = (photo) => {
  const comments = photo.comments.map((comment) => {
    const commentItem = commentsTemplate.cloneNode(true);
    commentItem.querySelector('img').src = comment.avatar;
    commentItem.querySelector('img').alt = comment.name;
    commentItem.querySelector('p').textContent = comment.message;
    return commentItem;
  });
  return comments;
};

const hideCommentLoader = () => {
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const addCommentLoader = () => {
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
};

const addCommentsCount = (comments) => {
  const commentsCount = comments.length;
  createCounterHtml(Math.min(commentsCount, NUMBER_OF_VISIBLE_COMMENTS), comments.length);
  if (commentsCount <= NUMBER_OF_VISIBLE_COMMENTS) {
    hideCommentLoader();
  } else {
    addCommentLoader();
  }
};

const renderBigPicture = (evt, photo) => {

  evt.preventDefault();
  document.body.classList.add('modal-open');
  socialComments.innerHTML = '';
  shownComments = 0;
  let numberToShow = Math.min(NUMBER_OF_VISIBLE_COMMENTS, photo.comments.length);
  const comments = createComments(photo);

  function onCommentButtonClick() {
    numberToShow = Math.min(NUMBER_OF_VISIBLE_COMMENTS, (comments.length - shownComments));
    getCommentData(comments, numberToShow);
    createCounterHtml(shownComments, comments.length);
    if (shownComments === comments.length) {
      hideCommentLoader(onCommentButtonClick);
    }
  }

  function onDocumentKeydown (e) {
    if (isEscapeKeydown(e)) {
      e.preventDefault();
      closeBigPicture();
    }
  }

  if (firstRender) {
    bigPictureCloseButton.addEventListener('click', closeBigPicture);
    commentLoaderButton.addEventListener('click', onCommentButtonClick);
    firstRender = false;
  }

  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
  }

  getCommentData(comments, numberToShow);
  addCommentsCount(comments, onCommentButtonClick);
  addBigPictureData(photo);
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

export {renderBigPicture};
