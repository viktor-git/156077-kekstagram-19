'use strict';
// Модуль показа фото
(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureId;
  var commentsUploadBtn = document.querySelector('.social__comments-loader');
  var COMMENTS_COUNTER = 5;
  var commentsModifier = 5;

  //  Показываем увеличенное фото
  var showBigPicture = function (pictureId) {
    bigPictureId = pictureId;
    document.querySelector('body').classList.add('modal-open');

    bigPicture.classList.remove('hidden');

    fillBigPictureInfo(window.data.photos[pictureId]);
    addPictureComments(window.data.photos[pictureId]);

    document.removeEventListener('keydown', pictureOpenHandler);
  };

  //  Заполняем информацией увеличенное фото
  var fillBigPictureInfo = function (pictureNumber) {
    var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    bigPictureImg.src = pictureNumber.url;

    var bigPictureDescr = bigPicture.querySelector('.big-picture__social .social__caption');
    bigPictureDescr.textContent = pictureNumber.description;

    var bigPictureLikes = bigPicture.querySelector('.big-picture__social .likes-count');
    bigPictureLikes.textContent = pictureNumber.likes;

    var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count .comments-count');
    bigPictureCommentsCount.textContent = pictureNumber.comments.length;
  };

  //Подгрузка комментариев
  commentsUploadBtn.addEventListener('click', function () {
    addPictureComments(window.data.photos[bigPictureId], 5)
  });

  //  Добавляем комментарии к увеличенному фото
  var addPictureComments = function (pictureNumber, commentsModifier) {
    var pictureComments = createPictureComments(pictureNumber, commentsModifier);

    var bigPictureUserComments = bigPicture.querySelector('.social__comments');
    bigPictureUserComments.innerHTML = '';
    bigPictureUserComments.append(pictureComments);

  };

  //  Создаем массив комментариев для добавления к фото
  var createPictureComments = function (pictureNumber) {
    console.log(arguments);
    var commentsCurrentValue = document.querySelector('.comments-current');
    commentsCurrentValue.textContent = COMMENTS_COUNTER;

    var commentsFragment = new DocumentFragment();

    (arguments[1] !== undefined) ? COMMENTS_COUNTER += arguments[1] : COMMENTS_COUNTER = 5;

    var loadCommentsValue = Math.min(pictureNumber.comments.length, COMMENTS_COUNTER);
    commentsCurrentValue.textContent = loadCommentsValue;

    if (loadCommentsValue === pictureNumber.comments.length) {
      commentsUploadBtn.classList.add('hidden');
    }

    for (var i = 0; i < loadCommentsValue; i++) {
      commentsFragment.append(createPictureComment(pictureNumber.comments[i]));
    }

    return commentsFragment;
  };

  //  Получаем комментарий для добавления к фото
  var createPictureComment = function (pictureComment) {
    var bigPictureUserComment = document.querySelector('.social__comment').cloneNode(true);

    bigPictureUserComment.querySelector('.social__picture').src = pictureComment.avatar;
    bigPictureUserComment.querySelector('.social__picture').alt = pictureComment.name;
    bigPictureUserComment.querySelector('.social__text').textContent = pictureComment.message;

    return bigPictureUserComment;
  };

  // Открытие полноэкранного изображения
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.parentNode.classList.contains('picture')) {
      document.addEventListener('keydown', btnClosePictureHandler);
      showBigPicture(target.parentNode.dataset.id);
    }
  });

  var btnClosePictureHandler = function (evt) {
    if (evt.key === 'Escape' && !document.activeElement.classList.contains('social__footer-text')) {
      window.util.closeImg();
      document.addEventListener('keydown', pictureOpenHandler);
    }
  };

  var pictureOpenHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture') && evt.key === 'Enter') {
      document.addEventListener('keydown', btnClosePictureHandler);
      showBigPicture(target.dataset.id);
    }
  };

  document.addEventListener('keydown', pictureOpenHandler);

  document.querySelector('#picture-cancel').addEventListener('click', function () {
    window.util.closeImg();
    document.addEventListener('keydown', pictureOpenHandler);
  });



})();
