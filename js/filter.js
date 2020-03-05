'use strict';
(function () {

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    })
  };

  var RANDOM_PICTURE_VALUE = 10;
  var DEFAULT_PICTURES;

  var createDefaultPictures = function () {
    if (DEFAULT_PICTURES === undefined) {
      DEFAULT_PICTURES = window.data.photos.slice();
    }
  };

  var pictureFilter = {

    default: function () {
      createDefaultPictures();

      window.util.removePhoto(document.querySelectorAll('.pictures .picture'));
      window.renderPreview.addPictures(DEFAULT_PICTURES);
    },

    random: function () {
      createDefaultPictures();

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
    },

    discuss: function () {
      createDefaultPictures();

      var sortedPhoto = window.data.photos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      })

      window.util.removePhoto(document.querySelectorAll('.pictures .picture'));
      window.renderPreview.addPictures(sortedPhoto);
    }
  };

  // Фильтруем фото
  var addClassActive = function (newActiveElement) {
    var filterBtnActive = document.querySelector('.img-filters__button--active');
    filterBtnActive.classList.remove('img-filters__button--active');

    newActiveElement.classList.add('img-filters__button--active');
  };

  document.querySelector('.img-filters__form').addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.id === 'filter-random') {
      pictureFilter.random();
      addClassActive(target);
    }

    if (target.id === 'filter-discussed') {
      pictureFilter.discuss();
      addClassActive(target);
    }

    if (target.id === 'filter-default') {
      pictureFilter.default();
      addClassActive(target);
    }
  });

})();
