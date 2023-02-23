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
const NUMBER_OF_GENERATED_PHOTO_IDS = 25;
const NUMBER_OF_GENERATED_URL_IDS = 25;
const NUMBER_OF_GENERATED_COMMENT_IDS = 250;
const NUMBER_OF_GENERATED_COMMENTS = 10;


const getRandomNumber = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getRandomIdCreator = (min, max) => {
  const idArray = Array.from({length: max - min + 1}, (_, i) => min + i);

  return function () {
    const randomIndex = getRandomNumber(0, idArray.length - 1);
    const resultId = idArray[randomIndex];
    idArray.splice(randomIndex, 1);
    return resultId;
  };
};

const createRandomPhotoId = getRandomIdCreator(1, NUMBER_OF_GENERATED_PHOTO_IDS);
const createRandomUrlId = getRandomIdCreator(1, NUMBER_OF_GENERATED_URL_IDS);
const createRandomCommentId = getRandomIdCreator(1, NUMBER_OF_GENERATED_COMMENT_IDS);

const createComments = () => ({
  id: createRandomCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)]
});

const createPhotoDescription = () => ({
  id: createRandomPhotoId(),
  url: `photos/${createRandomUrlId()}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, NUMBER_OF_GENERATED_COMMENTS)}, createComments)
});

export const photosWithDescriptions = Array.from({length: NUMBER_OF_GENERATED_PHOTOS}, createPhotoDescription);
