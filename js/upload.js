'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram.';
  var TIMEOUT_IN_MS = 10000;

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });

    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_IN_MS);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
