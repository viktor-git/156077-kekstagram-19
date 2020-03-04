'use strict';
// Вспомогательный модуль
(function () {
  //  Добавляем функцию рандомизации элементов массива
  var getRandElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  //  Добавляем функцию рандомизации чисел от мин до макс
  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Закрытие изображений
  var closeImg = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('.big-picture').classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.querySelector('#upload-file').value = '';
  };

  var showError = function (errorMessage, detailedMessage) {
    var errorMess = document.createElement('div');
    errorMess.textContent = errorMessage;
    errorMess.classList.add('server-error');

    var additionalMessage = document.createElement('p');
    additionalMessage.classList.add('server-error__descr');
    additionalMessage.textContent = detailedMessage;

    errorMess.append(additionalMessage);
    document.body.prepend(errorMess);

    document.querySelector('#upload-file').disabled = true;
  };

  // Получаем массив данных о фотографии
  window.util = {
    getRandElement: getRandElement,
    getRandomNum: getRandomNum,
    closeImg: closeImg,
    showError: showError
  };

})();
