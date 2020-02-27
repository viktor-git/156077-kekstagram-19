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
        showError('Статус ответа: ' + xhr.status);
      }
    });

    xhr.open('GET', URL);
    xhr.send();

    var showError = function (errorMessage) {
      console.log(errorMessage);
    };

    xhr.addEventListener('error', function () {
      showError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      showError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

  };

})();
