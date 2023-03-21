import {renderBigPicture} from './full-picture-render.js';
import {getData} from './server-api.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const picturesContainerFragment = document.createDocumentFragment();

const showErrorMessage = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Ошибка загрузки данных. Попробуйте перезагрузить страницу.';

  document.body.append(alertContainer);
};

const renderMiniatures = (photosWithDescriptions) => {
  photosWithDescriptions.forEach((photo) => {
    const pictureContainerItem = pictureTemplate.cloneNode(true);

    pictureContainerItem.querySelector('.picture__img').src = photo.url;
    pictureContainerItem.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureContainerItem.querySelector('.picture__likes').textContent = photo.likes;

    pictureContainerItem.addEventListener('click', (evt) => {
      renderBigPicture(evt, photo);
    });

    picturesContainerFragment.append(pictureContainerItem);
  });

  pictureContainer.append(picturesContainerFragment);
};

const renderPictures = () => {
  getData()
    .then((photosWithDescriptions) => renderMiniatures(photosWithDescriptions))
    .catch(() => {
      showErrorMessage();
    });
};

export {renderPictures};
