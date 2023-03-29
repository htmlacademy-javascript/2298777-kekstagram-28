import {clearMiniatures} from './functions.js';
import {renderMiniatures} from './render.js';

const EffectMetric = {
  'none': '',
  'chrome': '',
  'sepia': '',
  'marvin': '%',
  'phobos': 'px',
  'heat': '',
};

const EffectsName = {
  'none': 'none',
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

let photos = [];

const initUserPicture = (photosWithDescriptions) => {
  photos = photosWithDescriptions;
};

const addUserPicture = (pictureData) => {
  const picture = {
    id: photos.length,
    url: `photos/${pictureData.filename.filename}`,
    likes: 0,
    comments: [],
    description: `${pictureData.description} ${pictureData.hashtags}`,
    effect: `${EffectsName[pictureData.effect]}(${pictureData['effect-level']}${EffectMetric[pictureData.effect]})`,
    scale: pictureData.scale,
  };
  photos.push(picture);
  clearMiniatures();
  renderMiniatures(photos);
};

export {addUserPicture, initUserPicture};
