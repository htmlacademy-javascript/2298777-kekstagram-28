const DefaultUrl = {
  GET: 'https://28.javascript.pages.academy/kekstagram/data',
  POST: 'https://28.javascript.pages.academy/kekstagram'
};

const ErrorMessages = {
  GET: 'Ошибка получения данных с сервера',
  POST: 'Ошибка отправки данных на сервер'
};

const getData = (url = DefaultUrl.GET) =>
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(ErrorMessages.GET);
      }
    })
    .catch(() => {
      throw new Error(ErrorMessages.GET);
    });


const postData = (body = '',url = DefaultUrl.POST) =>
  fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(ErrorMessages.POST);
      }
    })
    .catch(() => {
      throw new Error(ErrorMessages.POST);
    });


export {getData, postData};
