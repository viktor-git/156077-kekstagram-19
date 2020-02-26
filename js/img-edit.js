'use strict';
// Модуль загрузки и редактирования изображений
(function () {
  console.log(window.data.userPhoto);
  var imgOption = document.querySelector('.img-upload__overlay');
  var newImgCloseBtn = imgOption.querySelector('.img-upload__cancel');
  var uploadBtn = document.querySelector('#upload-file');

  var btnCloseNewImgHandler = function (evt) {
    if (evt.key === 'Escape' && !document.activeElement.parentNode.classList.contains('img-upload__text')) {
      window.util.closeImg();
      document.removeEventListener('keydown', btnCloseNewImgHandler);
    }
  };

  // Обработчик загрузки изображения
  var imgUploadHandler = function () {
    imgOption.classList.remove('hidden');
    document.body.classList.add('modal-open');
    clearEffects();
    setPhotoStartSettings();
    document.addEventListener('keydown', btnCloseNewImgHandler);
  };

  // Загрузка нового изображения
  uploadBtn.addEventListener('change', imgUploadHandler);

  newImgCloseBtn.addEventListener('click', function () {
    window.util.closeImg();
  });

  // Добавление эффектов
  var imgPreview = imgOption.querySelector('.img-upload__preview img');
  var imgEffectSlider = imgOption.querySelector('.img-upload__effect-level');
  var effectPin = imgEffectSlider.querySelector('.effect-level__pin');
  var effectLine = imgEffectSlider.querySelector('.effect-level__line');
  var effectLineDepth = imgEffectSlider.querySelector('.effect-level__depth');
  var effectDepth = imgEffectSlider.querySelector('.effect-level__value');

  // Устанавливаем стартовые значения при загрузке фото
  var setPhotoStartSettings = function () {
    sizeControl.value = 100 + '%';
    imgPreview.style.transform = 'scale(' + (parseInt(sizeControl.value, 10) / 100) + ')';
    imgEffectSlider.classList.add('visually-hidden');
    effectDepth.value = 100;
  };

  // Очищаем эффекты при переключении
  var clearEffects = function () {
    imgPreview.setAttribute('class', '');
    imgPreview.style.filter = '';

    if (imgEffectSlider.classList.contains('visually-hidden')) {
      imgEffectSlider.classList.remove('visually-hidden');
    }

    effectPin.style.left = '100%';
    effectLineDepth.style.width = '100%';

    sizeControl.value = 100 + '%';
    imgPreview.style.transform = 'scale(' + (parseInt(sizeControl.value, 10) / 100) + ')';
  };

  // Накладываем выбранный эффект на фото
  imgOption.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.parentNode.classList.contains('effects__item')) {
      clearEffects();
      imgPreview.classList.add('effects__preview--' + imgOption.querySelector('input[type="radio"]:checked').value);
    }

    if (imgOption.querySelector('input[type="radio"]:checked').value === 'none') {
      imgEffectSlider.classList.add('visually-hidden');
    }

  });

  // Функция установки глубины эффекта
  var setEffecsDepth = function () {
    switch (imgOption.querySelector('input[type="radio"]:checked').value) {
      case 'chrome':
        imgPreview.style.filter = 'grayscale(' + (effectDepth.value / 100) + ')';
        break;

      case 'sepia':
        imgPreview.style.filter = 'sepia(' + (effectDepth.value / 100) + ')';
        break;

      case 'marvin':
        imgPreview.style.filter = 'invert(' + effectDepth.value + '%' + ')';
        break;

      case 'phobos':
        imgPreview.style.filter = 'blur(' + (3 * effectDepth.value / 100) + 'px' + ')';
        break;

      case 'heat':
        imgPreview.style.filter = 'brightness(' + (2 * effectDepth.value / 100 + 1) + ')';
        break;
    }
  };

  // Меняем глубину эффекта
  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var mouseMoveHandler = function (evtMove) {
      evtMove.preventDefault();

      var shift = startCoords - evtMove.clientX;
      startCoords = evtMove.clientX;

      var endPinPosition = (effectPin.offsetLeft - shift) / effectLine.clientWidth * 100;

      if (endPinPosition > 100) {
        endPinPosition = 100;
      }

      if (endPinPosition < 0) {
        endPinPosition = 0;
      }

      effectPin.style.left = endPinPosition + '%';
      effectLineDepth.style.width = endPinPosition + '%';
    };

    var mouseUpHandler = function (evtUp) {
      evtUp.preventDefault();
      effectDepth.value = parseInt(effectPin.style.left, 10);

      setEffecsDepth();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  // Изменение размеров изображения
  var sizeIncreaseBtn = imgOption.querySelector('.scale__control--bigger');
  var sizeDecreaseBtn = imgOption.querySelector('.scale__control--smaller');

  var sizeControl = imgOption.querySelector('.scale__control--value');

  var changeSizeValue = function (newSize) {
    sizeControl.value = newSize + '%';
    imgPreview.style.transform = 'scale(' + (newSize / 100) + ')';
  };

  var getIcreaseChangedValue = function (step, maxValue) {
    var sizeControlChangeValue = Math.min(maxValue, parseInt(sizeControl.value, 10) + step);
    changeSizeValue(sizeControlChangeValue);
  };

  var getDecreaseChangedValue = function (step, minValue) {
    var sizeControlChangeValue = Math.max(minValue, parseInt(sizeControl.value, 10) - step);
    changeSizeValue(sizeControlChangeValue);
  };

  sizeIncreaseBtn.addEventListener('click', function () {
    getIcreaseChangedValue(25, 100);
  });

  sizeDecreaseBtn.addEventListener('click', function () {
    getDecreaseChangedValue(25, 25);
  });

  // Валидация
  var imgText = imgOption.querySelector('.img-upload__text');
  var imgHashTag = imgText.querySelector('.text__hashtags');

  // Валидация хештегов
  document.querySelector('#upload-submit').addEventListener('click', function () {
    validateHashTags();
  });

  var validateHashTags = function () {
    var hashTags = imgHashTag.value.toLowerCase().split(' ');

    // Проверка количества хештегов
    if (hashTags.length > 5) {
      imgHashTag.setCustomValidity('Нельзя указывать более 5 хештегов');
      imgHashTag.reportValidity();
      return false;
    }

    // Проверка на пустой хештег
    if (hashTags.length === 1 && hashTags[0] === '') {
      imgHashTag.setCustomValidity('');
    } else {
      // Проверка на # в начале
      for (var i = 0; i < hashTags.length; i++) {
        if (hashTags[i].charAt(0) !== '#') {
          imgHashTag.setCustomValidity('Хештег должен начинаться с решетки');
          imgHashTag.reportValidity();
          return false;
        }

        // Проверка запрещенных символов
        for (var j = 1; j < hashTags[i].length; j++) {

          if (hashTags[i][j].match(/^\W$/gi) && hashTags[i][j].match(/[^А-ЯЁ]/gi)) {
            imgHashTag.setCustomValidity('Используются запрещенный символ: ' + hashTags[i][j].match(/^\W$/gi));
            imgHashTag.reportValidity();
            return false;
          }
        }
        // Проверка длины хештега
        if (hashTags[i].length > 20) {
          imgHashTag.setCustomValidity('Хештег не должен превышать 20 символов, включая #');
          imgHashTag.reportValidity();
          return false;
        }
        // Проверка на односимвольность
        if (hashTags[i].length === 1 && hashTags[i].charAt(0) === '#') {
          imgHashTag.setCustomValidity('Хештег пустой');
          imgHashTag.reportValidity();
          return false;
        }
        // Проверка на дубли
        if (hashTags.indexOf(hashTags[i], i + 1) !== -1) {
          imgHashTag.setCustomValidity('Дублируется хештег: ' + hashTags[i]);
          imgHashTag.reportValidity();
          return false;
        }
      }
    }
    imgHashTag.setCustomValidity('');
    return true;
  };

})();
