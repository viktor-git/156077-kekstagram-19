'use strict';

(function () {

  var RANDOM_PHOTOS_VALUE = 10;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    });
  }

  var replaceFilteredPhoto = function (filteredArr) {
    window.util.removeElements(document.querySelectorAll('.pictures .picture'));
    window.renderPreview.addPictures(filteredArr, true);
  };

  var pictureFilter = {

    'filter-default': function () {
      replaceFilteredPhoto(window.data.photos);
    },

    'filter-random': function () {
      var uniqueFilteredPhotos = window.util.getRandArr(window.data.photos, RANDOM_PHOTOS_VALUE);
      replaceFilteredPhoto(uniqueFilteredPhotos);
    },

    'filter-discussed': function () {
      var sortedPhotos;
      if (window.data.filterPhotos.length) {
        sortedPhotos = window.data.filterPhotos.slice().sort(window.util.sortArrDecrease);
      } else {
        sortedPhotos = window.data.photos.slice().sort(window.util.sortArrDecrease);
      }
      replaceFilteredPhoto(sortedPhotos);
    }
  };


  var filterForm = document.querySelector('.img-filters__form');

  var setActiveFilterBtn = function (newActiveElement) {
    var filterBtnActive = filterForm.querySelector('.img-filters__button--active');
    filterBtnActive.classList.remove('img-filters__button--active');

    newActiveElement.classList.add('img-filters__button--active');
  };

  // Фильтруем фото
  var filterBtnClickHandler = window.debounce(function (evt) {
    var target = evt.target;

    for (var key in pictureFilter) {
      if (key === target.id) {
        setActiveFilterBtn(target);
        return pictureFilter[key]();
      }
    }

    throw new Error('Появился новый фильтр вне списка. Проверьте значение: ' + target.id);

  });

  filterForm.addEventListener('click', filterBtnClickHandler);

})();

