const DEFAULT_URL = {
  get: 'https://28.javascript.pages.academy/kekstagram/data',
  post: 'https://28.javascript.pages.academy/kekstagram'
};

const ERROR_MESSAGES = {
  get: 'Ошибка получения данных с сервера',
  post: 'Ошибка отправки данных на сервер'
};

const getData = (url = DEFAULT_URL.get) =>
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(ERROR_MESSAGES.get);
      }
    })
    .catch(() => {
      throw new Error(ERROR_MESSAGES.get);
    });


const postData = (body = '',url = DEFAULT_URL.post) =>
  fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(ERROR_MESSAGES.post);
      }
    })
    .catch(() => {
      throw new Error(ERROR_MESSAGES.post);
    });


export {getData, postData};
