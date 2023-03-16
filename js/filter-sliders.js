const effectLevelField = document.querySelector('.effect-level');
const effectLevelInput = effectLevelField.children[0];
const effectLevelSlider = effectLevelField.children[1];
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview').children[0];

const deleteHiddenClass = () => {
  if (effectLevelSlider.classList.contains('hidden')) {
    effectLevelSlider.classList.remove('hidden');
    effectLevelField.classList.remove('hidden');
  }
  imgUploadPreview.className = '';
};

const effectNameObj = {
  'effects__preview--chrome': ['grayscale', ''],
  'effects__preview--sepia': ['sepia', ''],
  'effects__preview--marvin': ['invert', '%'],
  'effects__preview--phobos': ['blur', 'px'],
  'effects__preview--heat': ['brightness', '']
};


const onSliderUpdate = () => {
  effectLevelInput.value = effectLevelSlider.noUiSlider.get();
  if (imgUploadPreview.className) {
    const effectOptions = effectNameObj[imgUploadPreview.className];
    imgUploadPreview.style.filter =
      `${effectOptions[0]}(${effectLevelInput.value}${effectOptions[1]})`;
  }
};

const updateEffectSlider = (minSlider, maxSlider, step, effectClass) => {
  imgUploadPreview.style.filter = '';
  deleteHiddenClass();
  effectLevelSlider.noUiSlider.updateOptions({
    start: maxSlider,
    range: {
      'min': minSlider,
      'max': maxSlider
    },
    step: step
  });
  imgUploadPreview.classList.add(effectClass);
};


const sliderSettings = {
  0: () => {
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = '';
    if (!effectLevelSlider.classList.contains('hidden')) {
      effectLevelField.classList.add('hidden');
      effectLevelSlider.classList.add('hidden');
    }
  },
  1: () => {
    updateEffectSlider(0, 1, 0.1, 'effects__preview--chrome');
  },
  2: () => {
    updateEffectSlider(0, 1, 0.1, 'effects__preview--sepia');
  },
  3: () => {
    updateEffectSlider(0, 100, 1, 'effects__preview--marvin');
  },
  4: () => {
    updateEffectSlider(0, 3, 0.1, 'effects__preview--phobos');
  },
  5: () => {
    updateEffectSlider(1, 3, 0.1, 'effects__preview--heat');
  }
};

const addListenersOnEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    start: 0,
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1
  });
  effectLevelSlider.classList.add('hidden');
  effectLevelField.classList.add('hidden');
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  for (let i = 0; i < 6; i++) {
    effectsList.children[i].addEventListener('click', sliderSettings[i]);
  }
};

const removeListenersOnEffects = () => {
  for (let i = 0; i < 6; i++) {
    effectsList.children[i].removeEventListener('click', sliderSettings[i]);
  }
  effectLevelSlider.noUiSlider.destroy();
};

export {addListenersOnEffects, removeListenersOnEffects};
