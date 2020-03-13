'use strict';

(function () {

  //  Создаем фото для добавления в DOM на основе шаблона
  var pictureTemplate = document.querySelector('#picture');
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplateImg = pictureTemplate.content.querySelector('.picture__img');
  var pictureTemplateLike = pictureTemplate.content.querySelector('.picture__likes');
  var pictureTemplateCommentsValue = pictureTemplate.content.querySelector('.picture__comments');
  var pictureTemplateElement = pictureTemplate.content.querySelector('.picture');

  var createPicture = function (picture, arrItem) {

    pictureTemplateImg.src = picture.url;
    pictureTemplateLike.textContent = picture.likes;
    pictureTemplateCommentsValue.textContent = picture.comments.length;
    pictureTemplateElement.setAttribute('data-id', arrItem);

    var pictureTemplateClone = pictureTemplate.content.cloneNode(true);
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
