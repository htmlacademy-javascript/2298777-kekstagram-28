import {isEscapeKeydown} from './functions.js';

const NUMBER_OF_VISIBLE_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentLoaderButton = bigPicture.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
  }
};

const addBigPictureData = (photo) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
};

const getCommentData = (photo) => {
  const commentsFragment = document.createDocumentFragment();
  let index = 0;
  return (numberToShow) => {
    for (let i = 0; i < numberToShow; i++) {
      const comment = photo.comments[index];
      const commentItem = commentsTemplate.cloneNode(true);
      commentItem.querySelector('img').src = comment.avatar;
      commentItem.querySelector('img').alt = comment.name;
      commentItem.querySelector('p').textContent = comment.message;
      commentsFragment.append(commentItem);
      index++;
    }
    socialComments.append(commentsFragment);
  };
};

const onCommentButtonClick = (photo, createComments) => {
  const socialCommentsCount = socialComments.children.length;
  const numberToShow = photo.comments.length - socialCommentsCount < NUMBER_OF_VISIBLE_COMMENTS ?
    photo.comments.length - socialCommentsCount : NUMBER_OF_VISIBLE_COMMENTS;
  createComments(numberToShow);
  bigPicture.querySelector('.social__comment-count').innerHTML =
    `${socialComments.children.length} из <span class="comments-count">${photo.comments.length}</span> комментариев`;
  if (socialComments.children.length === photo.comments.length) {
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    commentLoaderButton.removeEventListener('click', () => {
      onCommentButtonClick(photo, createComments);
    });
  }
};

const addCommentsCount = (photo, createComments) => {
  if (photo.comments.length <= NUMBER_OF_VISIBLE_COMMENTS) {
    bigPicture.querySelector('.social__comment-count').innerHTML =
      `${photo.comments.length} из <span class="comments-count">${photo.comments.length}</span> комментариев`;
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    commentLoaderButton.removeEventListener('click', () => {
      onCommentButtonClick(photo, createComments);
    });
  } else {
    bigPicture.querySelector('.social__comment-count').innerHTML =
      `${NUMBER_OF_VISIBLE_COMMENTS} из <span class="comments-count">${photo.comments.length}</span> комментариев`;
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    commentLoaderButton.addEventListener('click', () => {
      onCommentButtonClick(photo, createComments);
    });
  }
};


const renderBigPicture = (evt, photo) => {

  evt.preventDefault();
  document.body.classList.add('modal-open');

  socialComments.innerHTML = '';
  const createComments = getCommentData(photo);
  createComments(NUMBER_OF_VISIBLE_COMMENTS > photo.comments.length
    ? photo.comments.length : NUMBER_OF_VISIBLE_COMMENTS);

  addCommentsCount(photo, createComments);

  addBigPictureData(photo);

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
