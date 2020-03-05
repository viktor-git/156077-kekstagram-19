'use strict';
(function () {

  var RANDOM_PICTURE_VALUE = 10;
  var DEFAULT_PICTURES;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    })
  };

  var SetPictureFilter = function () {

    this.setActiveFilterBtn = function (newActiveElement) {
    var filterBtnActive = document.querySelector('.img-filters__button--active');
    filterBtnActive.classList.remove('img-filters__button--active');

    newActiveElement.classList.add('img-filters__button--active');
    };

    this.createDefaultPictures = function () {
      if (DEFAULT_PICTURES === undefined) {
        DEFAULT_PICTURES = window.data.photos;
      }
    };

    this.setDefault = function () {
      pictureFilter.createDefaultPictures();

      window.util.removePhoto(document.querySelectorAll('.pictures .picture'));
      window.renderPreview.addPictures(DEFAULT_PICTURES);
    };

    this.setRandom = function () {
      pictureFilter.createDefaultPictures();

      var filterPhotos = [];
      var uniqueFilteredPhoto = [];

      while (uniqueFilteredPhoto.length !== RANDOM_PICTURE_VALUE) {
        var randomElement = window.util.getRandElement(window.data.photos);
        filterPhotos.push(randomElement);

        uniqueFilteredPhoto = filterPhotos.filter(function (item, i) {
          return filterPhotos.indexOf(item) === i;
        })
      }

      window.util.removePhoto(document.querySelectorAll('.pictures .picture'));
      window.renderPreview.addPictures(uniqueFilteredPhoto);
    };

    this.setDiscuss = function () {
      pictureFilter.createDefaultPictures();

      var sortedPhoto = window.data.photos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      })

      window.util.removePhoto(document.querySelectorAll('.pictures .picture'));
      window.renderPreview.addPictures(sortedPhoto);
    };
  };

  var pictureFilter = new SetPictureFilter();

  // Фильтруем фото
  var filterBtnClickHandler = window.debounce(function (evt) {
    var target = evt.target;

    if (target.id === 'filter-random') {
      pictureFilter.setRandom();
      pictureFilter.setActiveFilterBtn(target);
    }

    if (target.id === 'filter-discussed') {
      pictureFilter.setDiscuss();
      pictureFilter.setActiveFilterBtn(target);
    }

    if (target.id === 'filter-default') {
      pictureFilter.setDefault();
      pictureFilter.setActiveFilterBtn(target);
    }
  });

  document.querySelector('.img-filters__form').addEventListener('click', filterBtnClickHandler);

})();

