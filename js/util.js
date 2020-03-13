'use strict';

(function () {
  //  Рандомизация
  var getRandElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };


  var getRandomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandArr = function (arr, randArrLength) {
    var randomArr = [];
    var copyArr = arr.slice();

    var count = randArrLength || getRandomNum(1, copyArr.length - 1);

    for (var i = 0; i < count; i++) {
      var randomIndex = getRandomNum(0, copyArr.length - 1);

      randomArr.push(copyArr[randomIndex]);
      copyArr.splice(randomIndex, 1);
    }

    return randomArr;
  };

  // Сортировка массивов
  var sortArrDecrease = function (a, b) {
    return b.comments.length - a.comments.length;
  };

  var sortArrIncrease = function (a, b) {
    return a.comments.length - b.comments.length;
  };

  // Удаление Node коллекции
  var removeElements = function (photoNodeList) {
    Array.from(photoNodeList).forEach(function (item) {
      item.remove();
    });
  };

  // Проверка нажатия клавиши
  var keyPress= {
    escape: function (evtKey) {
      return (evtKey === 'Escape');
    },
    enter: function (evtKey) {
      return (evtKey === 'Enter');
    }
  }

  // Закрытие изображений
  var uploadBtn = document.querySelector('#upload-file');
  var bigPicture = document.querySelector('.big-picture');
  var imgOption = document.querySelector('.img-upload__overlay');
  var commentsUploadBtn = document.querySelector('.social__comments-loader');

  var closeImg = function () {
    imgOption.classList.add('hidden');
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadBtn.value = '';
    commentsUploadBtn.classList.remove('hidden');
  };

  // Показ ошибки при загрузке массива с сервера
  var showError = function (errorMessage, detailedMessage) {
    var errorMess = document.createElement('div');
    errorMess.textContent = errorMessage;
    errorMess.classList.add('server-error');

    var additionalMessage = document.createElement('p');
    additionalMessage.classList.add('server-error__descr');
    additionalMessage.textContent = detailedMessage;

    errorMess.append(additionalMessage);
    document.body.prepend(errorMess);

    uploadBtn.disabled = true;
  };

  // Экспорт
  window.util = {
    getRandElement: getRandElement,
    getRandomNum: getRandomNum,
    closeImg: closeImg,
    showError: showError,
    removeElements: removeElements,
    getRandArr: getRandArr,
    sortArrDecrease: sortArrDecrease,
    sortArrIcrease: sortArrIncrease,
    keyPress: keyPress
  };

})();
