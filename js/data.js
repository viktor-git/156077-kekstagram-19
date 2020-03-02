'use strict';
(function () {

  //var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT_IN_MS = 10000;

  window.load = function (type, url, onSuccess, onError, data, DataId) {
    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response, DataId);
      } else {
        (type === 'GET') ?
        onError('Статус ответа: ' + xhr.status, 'Проверьте корректность запрашиваемого URL') :
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      (type === 'GET') ?
      onError('Произошла ошибка соединения', 'Вы оффлайн. Проверьте подключение к интернету') :
      onError(xhr.status);
    });

    xhr.addEventListener('timeout', function () {
      (type === 'GET') ?
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', 'Проверьте скорость подключения') :
      onError(TIMEOUT_IN_MS);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(type, url);
    (type === 'POST') ? xhr.send(data) : xhr.send();
  };

})();
