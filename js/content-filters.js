import {debounce} from './functions.js';

const FiltersId = {
  DEFFAULT: '#filter-default',
  RANDOM : '#filter-random',
  DISCUSSED: '#filter-discussed'
};
const FILTERS_COUNT = 3;
const DEFFAULT_SHOWN_MINIATURES = 25;
const ACTIVE_SELECTOR = 'img-filters__button--active';

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

const clearMiniatures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].parentNode.removeChild(pictures[i]);
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

const createFilteredMiniatures = (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, id, sortCb = false, numberToShow = DEFFAULT_SHOWN_MINIATURES) => {
  if (!checkActiveFilter(id)) {
    clearMiniaturesDebounced();
    if (sortCb) {
      renderMiniatures(photosWithDescriptions.slice().sort(sortCb).slice(0, numberToShow));
    } else {
      renderMiniatures(photosWithDescriptions);
    }
    addActiveFilterClass(id);
  }
};

const setFilterListeners = [
  (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced) => () => {
    createFilteredMiniatures(photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, FiltersId.DEFFAULT);
  },
  (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced) => () => {
    createFilteredMiniatures(photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, FiltersId.RANDOM, () => Math.random() - 0.5, 10);
  },
  (photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced) => () => {
    createFilteredMiniatures(photosWithDescriptions, renderMiniatures, clearMiniaturesDebounced, FiltersId.DISCUSSED, (a, b) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    });
  }
];

const showFilter = (photosWithDescriptions, renderMiniatures) => {
  filterContainer.classList.remove('img-filters--inactive');
  const clearMiniatureDebounced = debounce(clearMiniatures);
  for (let i = 0; i < filterForm.children.length; i++) {
    filterForm.children[i].addEventListener('click',
      setFilterListeners[i](photosWithDescriptions , renderMiniatures, clearMiniatureDebounced)
    );
  }
};

export {showFilter};
