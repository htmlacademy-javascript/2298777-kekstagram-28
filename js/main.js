const NAMES = ['Олег', 'Алина', 'Ваня', 'Юра', 'Никита', 'Алиса', 'Маша', 'Кирилл', 'Павел',
  'Вадим', 'Соня', 'Лев', 'Игорь'];

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTIONS = ['Мое фото', 'Удачный кадр', 'мммммммм', '😜', '😈', '😎', '🤡', '🤢', '🤮', '🤬',
  '☝🏿', 'записывайтесь на ноготочки 💅', '+ 10 社会学分', 'cringe', 'Biergetränk wärmt die Seele',
  '✝', '🍆💦'];

const NUMBER_OF_GENERATED_PHOTOS = 25;

const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const photoIdGenerator = createRandomIdFromRange(1, 25);
const photoUrlGenerator = createRandomIdFromRange(1, 25);
const commentIdGenerator = createRandomIdFromRange(1, 1000);

const createComments = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)]
});

const createPhotoDescription = () => ({
  id: photoIdGenerator(),
  url: `photos/${photoUrlGenerator()}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 10)}, createComments)
});

export const photosWithDescriptions = Array.from({length: NUMBER_OF_GENERATED_PHOTOS}, createPhotoDescription);
