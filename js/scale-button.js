const DEFAULT_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const imageUploadScale = document.querySelector('.img-upload__scale');
const scaleSmallerButton = imageUploadScale.querySelector('.scale__control--smaller');
const scaleInputValue = imageUploadScale.querySelector('.scale__control--value');
const scaleBiggerButton = imageUploadScale.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
let scaleValue = DEFAULT_SCALE_VALUE;

const increaseScale = () => {
  if ((scaleValue + SCALE_STEP) <= DEFAULT_SCALE_VALUE) {
    scaleValue += SCALE_STEP;
    scaleInputValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / DEFAULT_SCALE_VALUE})`;
  }
};

const decreaseScale = () => {
  if ((scaleValue - SCALE_STEP) > 0) {
    scaleValue -= SCALE_STEP;
    scaleInputValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / DEFAULT_SCALE_VALUE})`;
  }
};

const addOnScaleButton = () => {
  scaleBiggerButton.addEventListener('click', increaseScale);
  scaleSmallerButton.addEventListener('click', decreaseScale);
};

const resetScale = () => {
  scaleValue = DEFAULT_SCALE_VALUE;
  imgUploadPreview.style.transform = `scale(${scaleValue / DEFAULT_SCALE_VALUE})`;
  scaleInputValue.value = `${DEFAULT_SCALE_VALUE}%`;
};

export {addOnScaleButton, resetScale};
