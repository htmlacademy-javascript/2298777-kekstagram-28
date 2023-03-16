import {createPhotosWithDescriptions} from './data.js';
import {renderBigPicture} from './full-picture-render.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const photosWithDescriptions = createPhotosWithDescriptions();
const picturesContainerFragment = document.createDocumentFragment();

const renderPictures = () => {
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

export {renderPictures};
