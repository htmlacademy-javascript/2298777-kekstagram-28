import {debounce, compareRandomCb, compareCommentsLengthCb} from './functions.js';

const FiltersId = {
  DEFAULT: '#filter-default',
  RANDOM : '#filter-random',
  DISCUSSED: '#filter-discussed'
};
const FILTERS_COUNT = 3;
const DEFAULT_MINIATURES_COUNT = 25;
const ACTIVE_SELECTOR = 'img-filters__button--active';
const RANDOM_MINIATURES_COUNT = 10;

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

const clearMiniatures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }
};

const checkActiveFilter = (id) =>
  filterForm.querySelector(id).classList.contains(ACTIVE_SELECTOR);

const addActiveFilterClass = (id) => {
  for (let i = 0; i < FILTERS_COUNT; i++) {
    const filter = filterForm.children[i];
    if (filter.classList.contains(ACTIVE_SELECTOR)) {
      filter.classList.remove(ACTIVE_SELECTOR);
    }
  }
  filterForm.querySelector(id).classList.add(ACTIVE_SELECTOR);
};

const createFilteredMiniatures = (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, id, sortCb, numberToShow = DEFAULT_MINIATURES_COUNT) => {
  if (!checkActiveFilter(id)) {
    clearMiniaturesDebounced();
    if (typeof sortCb === 'function') {
      renderMiniatures(photosWithDescriptions.slice().sort(sortCb).slice(0, numberToShow));
    } else {
      renderMiniatures(photosWithDescriptions);
    }
    addActiveFilterClass(id);
  }
};

const setFilterListeners = {
  [FiltersId.DEFAULT]: (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced) => () => {
    createFilteredMiniatures(photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, FiltersId.DEFAULT);
  },
  [FiltersId.RANDOM]: (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced) => () => {
    createFilteredMiniatures(photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, FiltersId.RANDOM, compareRandomCb, RANDOM_MINIATURES_COUNT);
  },
  [FiltersId.DISCUSSED]: (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced) => () => {
    createFilteredMiniatures(photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, FiltersId.DISCUSSED, compareCommentsLengthCb);
  }
};

const showFilter = (photosWithDescriptions, renderMiniatures) => {
  filterContainer.classList.remove('img-filters--inactive');
  const clearMiniatureDebounced = debounce(clearMiniatures);
  for (const key in FiltersId) {
    filterForm.querySelector(FiltersId[key]).addEventListener('click',
      setFilterListeners[FiltersId[key]](photosWithDescriptions , renderMiniatures, clearMiniatureDebounced)
    );
  }
};

export {showFilter};
