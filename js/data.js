'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT_IN_MS = 100000;

  window.load = function (onSuccess, dataId) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response, dataId);
      } else {
        showError('Статус ответа: ' + xhr.status, 'Проверьте корректность запрашиваемого URL');
      }
    });

    var showError = function (errorMessage, addMessage) {
      var errorMess = document.createElement('div');
      errorMess.textContent = errorMessage;
      errorMess.classList.add('server-error')

      var additionalMessage = document.createElement('p');
      additionalMessage.classList.add('server-error__descr');
      additionalMessage.textContent = addMessage;

      errorMess.append(additionalMessage);
      document.body.prepend(errorMess);

    };

    xhr.addEventListener('error', function () {
      showError('Произошла ошибка соединения', 'Вы оффлайн. Проверьте подключение к интернету');
    });
    xhr.addEventListener('timeout', function () {
      showError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', 'Проверьте скорость подключения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };



})();
