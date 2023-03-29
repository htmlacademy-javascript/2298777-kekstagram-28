import {renderBigPicture} from './full-picture-render.js';
import {getData} from './server-api.js';
import {showRenderErrorMessage} from './messages.js';
import {showFilter} from './content-filters.js';
import { debounce } from './functions.js';
import {initUserPicture} from './user-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const picturesContainerFragment = document.createDocumentFragment();

const renderMiniatures = (photosWithDescriptions) => {
  photosWithDescriptions.forEach((photo) => {
    const pictureContainerItem = pictureTemplate.cloneNode(true);

    pictureContainerItem.querySelector('.picture__img').src = photo.url;
    pictureContainerItem.querySelector('.picture__img').alt = photo.description;
    pictureContainerItem.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureContainerItem.querySelector('.picture__likes').textContent = photo.likes;
    if (photo.scale || photo.effect) {
      pictureContainerItem.querySelector('.picture__img').style.scale = photo.scale;
      pictureContainerItem.querySelector('.picture__img').style.filter = photo.effect;
    }

    pictureContainerItem.addEventListener('click', (evt) => {
      renderBigPicture(evt, photo);
    });

    picturesContainerFragment.append(pictureContainerItem);
  });

  pictureContainer.append(picturesContainerFragment);
};

const renderPictures = () => {
  getData()
    .then((photosWithDescriptions) => {
      renderMiniatures(photosWithDescriptions);
      showFilter(photosWithDescriptions, debounce(renderMiniatures));
      initUserPicture(photosWithDescriptions);
    })
    .catch(() => {
      showRenderErrorMessage();
    });
};

export {renderPictures, renderMiniatures};
