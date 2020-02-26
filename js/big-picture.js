'use strict';
// Модуль показа фото
(function () {

  var bigPicture = document.querySelector('.big-picture');

  //  Показываем увеличенное фото
  var showBigPicture = function (pictureId) {
    document.querySelector('body').classList.add('modal-open');

    bigPicture.classList.remove('hidden');

    fillBigPictureInfo(window.data.userPhoto[pictureId]);
    addPictureComments(window.data.userPhoto[pictureId]);

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

  //  Добавляем комментарии к увеличенному фото
  var addPictureComments = function (pictureNumber) {
    var pictureComments = createPictureComments(pictureNumber);

    var bigPictureUserComments = bigPicture.querySelector('.social__comments');
    bigPictureUserComments.innerHTML = '';
    bigPictureUserComments.append(pictureComments);

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  //  Создаем массив комментариев для добавления к фото
  var createPictureComments = function (pictureNumber) {
    var commentsFragment = new DocumentFragment();

    for (var i = 0; i < pictureNumber.comments.length; i++) {
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
