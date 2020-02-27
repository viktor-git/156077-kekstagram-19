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

  // Получаем массив данных о фотографии
  window.util = {
    getRandElement: getRandElement,
    getRandomNum: getRandomNum,
    closeImg: closeImg
  };

})();
