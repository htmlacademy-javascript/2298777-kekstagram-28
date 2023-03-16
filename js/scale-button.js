const imageUploadScale = document.querySelector('.img-upload__scale');
const scaleSmallerButton = imageUploadScale.children[0];
const scaleInputValue = imageUploadScale.children[1];
const scaleBiggerButton = imageUploadScale.children[2];
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const DEFAULT_SCALE_VALUE = 100;
let scaleValue = DEFAULT_SCALE_VALUE;

const increaseScale = () => {
  if ((scaleValue + DEFAULT_SCALE_VALUE / 100 * 25) <= DEFAULT_SCALE_VALUE) {
    scaleValue += DEFAULT_SCALE_VALUE / 100 * 25;
    scaleInputValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  }
};

const dectreaseScale = () => {
  if ((scaleValue - DEFAULT_SCALE_VALUE / 100 * 25) > 0) {
    scaleValue -= DEFAULT_SCALE_VALUE / 100 * 25;
    scaleInputValue.value = `${scaleValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  }
};

const addOnScaleButton = () => {
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  scaleValue = DEFAULT_SCALE_VALUE;
  scaleInputValue.value = `${scaleValue}%`;

  scaleBiggerButton.addEventListener('click', increaseScale);
  scaleSmallerButton.addEventListener('click', dectreaseScale);
};

const removeOnScaleButton = () => {
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
  scaleValue = DEFAULT_SCALE_VALUE;
  scaleInputValue.value = `${scaleValue}%`;

  scaleBiggerButton.removeEventListener('click', increaseScale);
  scaleSmallerButton.removeEventListener('click', dectreaseScale);
};

export {addOnScaleButton, removeOnScaleButton};
