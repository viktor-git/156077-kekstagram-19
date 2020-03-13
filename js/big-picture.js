'use strict';

(function () {

  var COMMENTS_VALUE_START = 5;
  var COMMENTS_MODIFIER_VALUE = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureId;

  //  Показываем увеличенное фото
  var showBigPicture = function (pictureId) {
    bigPictureId = pictureId;
    document.body.classList.add('modal-open');

    bigPicture.classList.remove('hidden');

    if (window.data.filterPhotos.length) {
      fillBigPictureInfo(window.data.filterPhotos[pictureId]);
      addPictureComments(window.data.filterPhotos[pictureId]);
    } else {
      fillBigPictureInfo(window.data.photos[pictureId]);
      addPictureComments(window.data.photos[pictureId]);
    }

    document.removeEventListener('keydown', pictureOpenHandler);

  };

  //  Заполняем информацией увеличенное фото
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureDescription = bigPicture.querySelector('.big-picture__social .social__caption');
  var bigPictureLikes = bigPicture.querySelector('.big-picture__social .likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count .comments-count');

  var fillBigPictureInfo = function (pictureNumber) {
    bigPictureImg.src = pictureNumber.url;
    bigPictureDescription.textContent = pictureNumber.description;
    bigPictureLikes.textContent = pictureNumber.likes;
    bigPictureCommentsCount.textContent = pictureNumber.comments.length;

    checkLikePut();
  };

  //  Добавляем комментарии к увеличенному фото
  var bigPictureUserComments = bigPicture.querySelector('.social__comments');

  var addPictureComments = function (pictureNumber, commentsValueModifier) {
    var pictureComments = createPictureComments(pictureNumber, commentsValueModifier);
    bigPictureUserComments.innerHTML = '';
    bigPictureUserComments.append(pictureComments);
  };

  //  Создаем массив комментариев для добавления к фото
  var commentsCurrentValue = document.querySelector('.comments-current');
  var commentsCounter = COMMENTS_VALUE_START;

  var createPictureComments = function (pictureNumber, commentsValueModifier) {
    commentsCurrentValue.textContent = Math.min(commentsCounter, pictureNumber.comments.length);

    var commentsFragment = new DocumentFragment();

    if (commentsValueModifier !== undefined) {
      commentsCounter += commentsValueModifier;
    } else {
      commentsCounter = COMMENTS_VALUE_START;
    }

    var loadCommentsValue = Math.min(pictureNumber.comments.length, commentsCounter);
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
  var bigPictureUserCommentTemplate = document.querySelector('.social__comment');
  var bigPictureUserCommentTemplateAvatar = bigPictureUserCommentTemplate.querySelector('.social__picture');
  var bigPictureUserCommentTemplateText = bigPictureUserCommentTemplate.querySelector('.social__text');

  var createPictureComment = function (pictureComment) {

    bigPictureUserCommentTemplateAvatar.src = pictureComment.avatar;
    bigPictureUserCommentTemplateAvatar.alt = pictureComment.name;
    bigPictureUserCommentTemplateText.textContent = pictureComment.message;

    var bigPictureUserComment = bigPictureUserCommentTemplate.cloneNode(true);
    return bigPictureUserComment;
  };

  // Открытие и закрытие полноэкранного изображения
  var btnClosePictureHandler = function (evt) {
    if (window.util.keyPress.escape(evt.key) && !document.activeElement.classList.contains('social__footer-text')) {
      window.util.closeImg();
      document.removeEventListener('keydown', btnClosePictureHandler);
      document.addEventListener('keydown', pictureOpenHandler);
    }
  };

  var pictureOpenHandler = function (evt) {
    var target = evt.target;
    if (document.activeElement.classList.contains('picture') && window.util.keyPress.enter(evt.key)) {
      document.addEventListener('keydown', btnClosePictureHandler);
      document.removeEventListener('keydown', pictureOpenHandler);
      showBigPicture(target.dataset.id);
    }
  };

  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.parentNode.classList.contains('picture')) {
      document.addEventListener('keydown', btnClosePictureHandler);
      showBigPicture(target.parentNode.dataset.id);
    }
  });

  document.addEventListener('keydown', pictureOpenHandler);

  document.querySelector('#picture-cancel').addEventListener('click', function () {
    window.util.closeImg();
    document.removeEventListener('keydown', btnClosePictureHandler);
    document.addEventListener('keydown', pictureOpenHandler);
  });

  // Подгрузка комментариев
  var commentsUploadBtn = document.querySelector('.social__comments-loader');
  commentsUploadBtn.addEventListener('click', function () {
    addPictureComments(window.data.photos[bigPictureId], COMMENTS_MODIFIER_VALUE);
  });

  // Лайки
  var userLike = document.querySelector('.likes-count');
  var picturesElement = document.querySelector('.pictures');

  var checkLikePut = function () {
    if (!picturesElement.querySelector('[data-id="' + bigPictureId + '"]').classList.contains('liked')) {
      userLike.classList.remove('likes-count--active');
    } else {
      userLike.classList.add('likes-count--active');
    }
  };

  var setNewLikesValue = function (openedBigPicture) {
    openedBigPicture.querySelector('.picture__likes').textContent = userLike.textContent;
    window.data.photos[bigPictureId].likes = userLike.textContent;
  };

  userLike.addEventListener('click', function () {
    var LikeCount = +userLike.textContent;
    var openedBigPicture = picturesElement.querySelector('[data-id="' + bigPictureId + '"]');

    if (!userLike.classList.contains('likes-count--active')) {
      userLike.classList.add('likes-count--active');
      openedBigPicture.classList.add('liked');
      userLike.textContent = ++LikeCount;

    } else {
      userLike.classList.remove('likes-count--active');
      openedBigPicture.classList.remove('liked');
      userLike.textContent = --LikeCount;
    }

    setNewLikesValue(openedBigPicture);
  });

})();
