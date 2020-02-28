'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, dataId) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response, dataId);
      } else {
        window.util.showError('Статус ответа: ' + xhr.status, 'Проверьте корректность запрашиваемого URL');
      }
    });

    xhr.addEventListener('error', function () {
      window.util.showError('Произошла ошибка соединения', 'Вы оффлайн. Проверьте подключение к интернету');
    });
    xhr.addEventListener('timeout', function () {
      window.util.showError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', 'Проверьте скорость подключения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  })();
