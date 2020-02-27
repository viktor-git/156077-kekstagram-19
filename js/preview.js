'use strict';
// Модуль отрисовки превью фото
(function () {
  //  Создаем фото для добавления в DOM на основе шаблона
  var createPicture = function (picture, arrItem) {
    var pictureTemplateClone = document.querySelector('#picture').content.cloneNode(true);

    pictureTemplateClone.querySelector('.picture__img').src = picture.url;
    pictureTemplateClone.querySelector('.picture__likes').textContent = picture.likes;
    pictureTemplateClone.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureTemplateClone.querySelector('.picture').setAttribute('data-id', arrItem);
    return pictureTemplateClone;
  };

  //  Создаем фрагмент с фотографиями на основе шаблона добавления в DOM
  var addPictures = function (photoArray) {
    var fragment = new DocumentFragment();

    for (var i = 0; i < photoArray.length; i++) {
      fragment.append(createPicture(photoArray[i], i));
    }

    return fragment;
  };

  //  Вставляем созданный фрагмент фотографий в DOM
  document.querySelector('.pictures').append(addPictures(window.data.userPhotos));

})();