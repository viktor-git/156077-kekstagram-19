'use strict';

(function () {

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

    getDefault: function () {
      replaceFilteredPhoto(window.data.photos);
    },

    getRandom: function () {
      var uniqueFilteredPhotos = window.util.getRandArr(window.data.photos, 10);
      replaceFilteredPhoto(uniqueFilteredPhotos);
    },

    getDiscuss: function () {
      var sortedPhotos;
      if (window.data.filterPhotos.length !== 0) {
        sortedPhotos = window.data.filterPhotos.slice().sort(window.util.sortArrDecrease);
      } else {
        sortedPhotos = window.data.photos.slice().sort(window.util.sortArrDecrease);
      }

      replaceFilteredPhoto(sortedPhotos);
    }
  };

  var setActiveFilterBtn = function (newActiveElement) {
    var filterBtnActive = document.querySelector('.img-filters__button--active');
    filterBtnActive.classList.remove('img-filters__button--active');

    newActiveElement.classList.add('img-filters__button--active');
  };

  // Фильтруем фото
  var filterBtnClickHandler = window.debounce(function (evt) {
    var target = evt.target;

    switch (target.id) {
      case 'filter-random':
        pictureFilter.getRandom();
        break;

      case 'filter-discussed':
        pictureFilter.getDiscuss();
        break;

      case 'filter-default':
        pictureFilter.getDefault();
        break;

      default:
        throw new Error('Вероятно появился новый фильтр вне списка. Проверьте значение: ' + target.id);
    }

    setActiveFilterBtn(target);
  });

  document.querySelector('.img-filters__form').addEventListener('click', filterBtnClickHandler);

})();

