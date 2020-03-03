'use strict';
(function () {

  var TIMEOUT_IN_MS = 10000;
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var makeRequest = function (onSuccess, onError, xhr, type) {

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else if (type === 'GET') {
        onError('Статус ответа: ' + xhr.status, 'Проверьте корректность запрашиваемого URL');
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      if (type === 'GET') {
        onError('Произошла ошибка соединения', 'Вы оффлайн. Проверьте подключение к интернету');
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('timeout', function () {
      if (type === 'GET') {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', 'Проверьте скорость подключения');
      } else {
        onError(TIMEOUT_IN_MS);
      }
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  window.data = {
    photos: [],
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      makeRequest(onSuccess, onError, xhr, 'GET');

      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    upload: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      makeRequest(onSuccess, onError, xhr);

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    }
  }

})();
