'use strict';

(function () {

  //  Создаем фото для добавления в DOM на основе шаблона
  var pictureTemplate = document.querySelector('#picture')
  var picturesElement = document.querySelector('.pictures')

  var createPicture = function (picture, arrItem) {
    var pictureTemplateClone = pictureTemplate.content.cloneNode(true);

    pictureTemplateClone.querySelector('.picture__img').src = picture.url;
    pictureTemplateClone.querySelector('.picture__likes').textContent = picture.likes;
    pictureTemplateClone.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureTemplateClone.querySelector('.picture').setAttribute('data-id', arrItem);
    return pictureTemplateClone;
  };

  var addPictures = function (photoArray, isFilter) {
    var fragment = new DocumentFragment();

    for (var i = 0; i < photoArray.length; i++) {
      fragment.append(createPicture(photoArray[i], i));
    }

    picturesElement.append(fragment);

    if (!isFilter) {
      window.data.photos = photoArray;
    } else {
      window.data.filterPhotos = photoArray;
    }
  };

  window.data.load(addPictures, window.util.showError);

  window.renderPreview = {
    addPictures: addPictures
  };

})();
