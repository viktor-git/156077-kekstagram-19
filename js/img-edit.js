'use strict';

(function () {

  var SIZE_CHANGE_STEP = 25;
  var SIZE_MIN = 25;
  var SIZE_MAX = 100;
  var PIN_POSITION_MAX = 100;
  var PIN_POSITION_MIN = 100;
  var HASHTAGS_MAX_NUMBER = 5;
  var HASHTAGS_CHAR_MAX = 20;
  var HASHTAGS_CHAR_MIN = 1;

  var imgOption = document.querySelector('.img-upload__overlay');
  var newImgCloseBtn = imgOption.querySelector('.img-upload__cancel');
  var uploadBtn = document.querySelector('#upload-file');

  var btnCloseNewImgHandler = function (evt) {
    if (window.util.keyPress.escape(evt.key) && !document.activeElement.parentNode.classList.contains('img-upload__text')) {
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
    document.removeEventListener('keydown', btnCloseNewImgHandler);
  });

  // Добавление эффектов
  var imgPreview = imgOption.querySelector('.img-upload__preview img');
  var imgEffectSlider = imgOption.querySelector('.img-upload__effect-level');
  var effectPin = imgEffectSlider.querySelector('.effect-level__pin');
  var effectLine = imgEffectSlider.querySelector('.effect-level__line');
  var effectLineDepth = imgEffectSlider.querySelector('.effect-level__depth');
  var effectDepthValue = imgEffectSlider.querySelector('.effect-level__value').value;

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

  var filterValueSettings = {
    chrome: {
      filter: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },

    sepia: {
      filter: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },

    marvin: {
      filter: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },

    phobos: {
      filter: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },

    heat: {
      filter: 'brightness',
      min: 1,
      max: 2,
      unit: ''
    }
  };

  // Функция установки глубины эффекта
  var setEffectsDepth = function () {

    for (var key in filterValueSettings) {

      if (key === imgOption.querySelector('input[type="radio"]:checked').value) {
        return imgPreview.style.filter = filterValueSettings[key].filter + '(' + (filterValueSettings[key].max * effectDepthValue / 100 + filterValueSettings[key].min) + filterValueSettings[key].unit + ')';
      }
    }

    throw new Error('Появился новый фильтр вне списка. Проверьте значение: ' + imgOption.querySelector('input[type="radio"]:checked').value);
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

      if (endPinPosition > PIN_POSITION_MAX) {
        endPinPosition = PIN_POSITION_MAX;
      }

      if (endPinPosition < PIN_POSITION_MIN) {
        endPinPosition = PIN_POSITION_MIN;
      }

      effectPin.style.left = endPinPosition + '%';
      effectLineDepth.style.width = endPinPosition + '%';
    };

    var mouseUpHandler = function (evtUp) {
      evtUp.preventDefault();
      effectDepthValue = parseInt(effectPin.style.left, 10);

      setEffectsDepth();

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
    getIcreaseChangedValue(SIZE_CHANGE_STEP, SIZE_MIN);
  });

  sizeDecreaseBtn.addEventListener('click', function () {
    getDecreaseChangedValue(SIZE_CHANGE_STEP, SIZE_MAX);
  });
  // Валидация хештегов

  var imgText = document.querySelector('.img-upload__text');
  document.querySelector('#upload-submit').addEventListener('click', function () {
    var imgHashTag = imgText.querySelector('.text__hashtags');
    var hashTags = imgHashTag.value.toLowerCase().split(' ');

    if (!validateHashTags(hashTags, imgHashTag)) {
      imgHashTag.style.border = '2px solid red';
    } else {
      imgHashTag.style.border = 'none';
    }
  });

  var validateHashTags = function (hashArray, validateField) {

    // Проверка количества хештегов
    if (hashArray.length > HASHTAGS_MAX_NUMBER) {
      validateField.setCustomValidity('Нельзя указывать более 5 хештегов');
      validateField.reportValidity();
      return false;
    }

    // Проверка на пустой хештег
    if (hashArray.length === 1 && hashArray[0] === '') {
      validateField.setCustomValidity('');
    } else {
      // Проверка на # в начале
      for (var i = 0; i < hashArray.length; i++) {
        if (hashArray[i].charAt(0) !== '#') {
          validateField.setCustomValidity('Хештег должен начинаться с решетки');
          validateField.reportValidity();
          return false;
        }

        // Проверка запрещенных символов
        for (var j = 1; j < hashArray[i].length; j++) {

          if (hashArray[i][j].match(/^\W$/gi) && hashArray[i][j].match(/[^А-ЯЁ]/gi)) {
            validateField.setCustomValidity('Используются запрещенный символ: ' + hashArray[i][j].match(/^\W$/gi));
            validateField.reportValidity();
            return false;
          }
        }
        // Проверка длины хештега
        if (hashArray[i].length > HASHTAGS_CHAR_MAX) {
          validateField.setCustomValidity('Хештег не должен превышать 20 символов, включая #');
          validateField.reportValidity();
          return false;
        }
        // Проверка на односимвольность
        if (hashArray[i].length === HASHTAGS_CHAR_MIN && hashArray[i].charAt(0) === '#') {
          validateField.setCustomValidity('Хештег пустой');
          validateField.reportValidity();
          return false;
        }
        // Проверка на дубли
        if (hashArray.indexOf(hashArray[i], i + 1) !== -1) {
          validateField.setCustomValidity('Дублируется хештег: ' + hashArray[i]);
          validateField.reportValidity();
          return false;
        }
      }
    }
    validateField.setCustomValidity('');
    return true;
  };

  // Отправка формы AJAX
  var form = document.querySelector('.img-upload__form');
  var successMessageTemplate = document.querySelector('#success');
  var errorMessageTemplate = document.querySelector('#error');
  var mainElement = document.querySelector('main');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var successUploadHandler = function () {
      window.util.closeImg();
      clearEffects();
      setPhotoStartSettings();
      var successMessage = successMessageTemplate.content.cloneNode(true);
      mainElement.append(successMessage);

      document.addEventListener('click', successMessageRemoveClickHandler);
      document.addEventListener('keydown', successMessageRemoveKeyHandler);
    };

    var errorUploadHandler = function () {
      window.util.closeImg();
      clearEffects();
      setPhotoStartSettings();
      var errorMessage = errorMessageTemplate.content.cloneNode(true);
      document.querySelector('main').append(errorMessage);

      document.addEventListener('click', errorMessageRemoveClickHandler);
      document.addEventListener('keydown', errorMessageRemoveKeyHandler);
    };

    var successMessageRemoveClickHandler = function (evtClick) {
      if (evtClick.target.classList.contains('success__button') ||
        evtClick.target.classList.contains('success')) {
        closeMessage('main .success');
      }
    };

    var successMessageRemoveKeyHandler = function (evtKey) {
      if (window.util.keyPress.escape(evtKey.key)) {
        closeMessage('main .success');
      }
    };

    var errorMessageRemoveClickHandler = function (evtClick) {
      if (evtClick.target.classList.contains('error__button') ||
        evtClick.target.classList.contains('error')) {
        closeMessage('main .error');
      }
    };

    var errorMessageRemoveKeyHandler = function (evtKey) {
      if (window.util.keyPress.escape(evtKey.key)) {
        closeMessage('main .error');
      }
    };

    var closeMessage = function (selector) {
      mainElement.querySelector(selector).remove();

      document.removeEventListener('click', errorMessageRemoveClickHandler);
      document.removeEventListener('keydown', errorMessageRemoveKeyHandler);
      document.removeEventListener('click', successMessageRemoveClickHandler);
      document.removeEventListener('keydown', successMessageRemoveKeyHandler);
    };

    window.data.upload(new FormData(form), successUploadHandler, errorUploadHandler);

  });

  // Устанавливаем стартовые значения при загрузке фото
  var setPhotoStartSettings = function () {
    sizeControl.value = 100 + '%';
    imgPreview.style.transform = 'scale(' + (parseInt(sizeControl.value, 10) / 100) + ')';
    imgEffectSlider.classList.add('visually-hidden');
    effectDepthValue = 100;
    imgOption.querySelector('.effects__list:first-child input').checked = true;

    var imgText = imgOption.querySelectorAll('.img-upload__text [class^="text__"]');
    for (var i = 0; i < imgText.length; i++) {
      imgText[i].value = '';
    }
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

})();


