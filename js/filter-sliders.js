const NUMBER_OF_FILTERS = 6;

const EffectsName = {
  'effects__preview--chrome': ['grayscale', ''],
  'effects__preview--sepia': ['sepia', ''],
  'effects__preview--marvin': ['invert', '%'],
  'effects__preview--phobos': ['blur', 'px'],
  'effects__preview--heat': ['brightness', '']
};

const Options = {
  CHROME: {
    min: 0,
    max: 1,
    step: 0.1,
    selector: 'effects__preview--chrome'
  },
  SEPIA: {
    min: 0,
    max: 1,
    step: 0.1,
    selector: 'effects__preview--sepia'
  },
  MARVIN: {
    min: 0,
    max: 100,
    step: 1,
    selector: 'effects__preview--marvin'
  },
  PHOBOS: {
    min: 0,
    max: 3,
    step: 0.1,
    selector: 'effects__preview--phobos'
  },
  HEAT: {
    min: 1,
    max: 3,
    step: 0.1,
    selector: 'effects__preview--heat'
  }
};

const effectLevelField = document.querySelector('.effect-level');
const effectLevelInput = effectLevelField.children[0];
const effectLevelSlider = effectLevelField.children[1];
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview').children[0];
const originalEffect = effectsList.querySelector('#effect-none');
const uploadButton = document.querySelector('#upload-file');
const effectsPreviews = effectsList.querySelectorAll('.effects__preview');

const removeHiddenClass = () => {
  if (effectLevelSlider.classList.contains('hidden')) {
    effectLevelSlider.classList.remove('hidden');
    effectLevelField.classList.remove('hidden');
  }
  imgUploadPreview.className = '';
};

const updateOnSlider = () => {
  effectLevelInput.value = effectLevelSlider.noUiSlider.get();
  if (imgUploadPreview.className) {
    const effectOptions = EffectsName[imgUploadPreview.className];
    imgUploadPreview.style.filter =
      `${effectOptions[0]}(${effectLevelInput.value}${effectOptions[1]})`;
  }
};

const updateEffectSlider = (isOriginalPhoto, minSlider, maxSlider, step, effectClass) => {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  if (isOriginalPhoto) {
    if (!effectLevelSlider.classList.contains('hidden')) {
      effectLevelField.classList.add('hidden');
      effectLevelSlider.classList.add('hidden');
    }
  } else {
    removeHiddenClass();
    effectLevelSlider.noUiSlider.updateOptions({
      start: maxSlider,
      range: {
        'min': minSlider,
        'max': maxSlider
      },
      step: step
    });
    imgUploadPreview.classList.add(effectClass);
  }
};


const sliderSettings = [
  () => {
    updateEffectSlider(true);
  },
  () => {
    updateEffectSlider(false, Options.CHROME.min, Options.CHROME.max, Options.CHROME.step, Options.CHROME.selector);
  },
  () => {
    updateEffectSlider(false, Options.SEPIA.min, Options.SEPIA.max, Options.SEPIA.step, Options.SEPIA.selector);
  },
  () => {
    updateEffectSlider(false, Options.MARVIN.min, Options.MARVIN.max, Options.MARVIN.step, Options.MARVIN.selector);
  },
  () => {
    updateEffectSlider(false, Options.PHOBOS.min, Options.PHOBOS.max, Options.PHOBOS.step, Options.PHOBOS.selector);
  },
  () => {
    updateEffectSlider(false, Options.HEAT.min, Options.HEAT.max, Options.HEAT.step, Options.HEAT.selector);
  }
];

const addListenersOnEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    start: 0,
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1,
    connect: 'lower'
  });
  effectLevelSlider.classList.add('hidden');
  effectLevelField.classList.add('hidden');
  effectLevelSlider.noUiSlider.on('update', updateOnSlider);
  for (let i = 0; i < NUMBER_OF_FILTERS; i++) {
    effectsList.children[i].addEventListener('click', sliderSettings[i]);
  }
};

const resetEffects = () => {
  originalEffect.checked = true;
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  effectLevelSlider.classList.add('hidden');
  effectLevelField.classList.add('hidden');
};

const addMiniatureEffectPreview = () => {
  for (let i = 0; i < NUMBER_OF_FILTERS; i++) {
    effectsPreviews[i].style.backgroundImage = `url(${URL.createObjectURL(uploadButton.files[0])})`;
  }
};

export {addListenersOnEffects, resetEffects, addMiniatureEffectPreview};
