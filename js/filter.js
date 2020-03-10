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

    default: function () {
      replaceFilteredPhoto(window.data.photos);
    },

    random: function () {
      var uniqueFilteredPhoto = window.util.getRandArr(window.data.photos, 10);
      replaceFilteredPhoto(uniqueFilteredPhoto);
    },

    discuss: function () {
      if (window.data.filterPhotos.length !== 0) {
        var sortedPhoto = window.data.filterPhotos.slice().sort(window.util.sortArrDecrease);
      } else {
        var sortedPhoto = window.data.photos.slice().sort(window.util.sortArrDecrease);
      }

      replaceFilteredPhoto(sortedPhoto);
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
        pictureFilter.random();
        break;

      case 'filter-discussed':
        pictureFilter.discuss();
        break;

      case 'filter-default':
        pictureFilter.default();
        break;

      default:
        throw new Error('Вероятно появился новый фильтр вне списка. Проверьте значение: ' + target.id);
    }

    setActiveFilterBtn(target);
  });

  document.querySelector('.img-filters__form').addEventListener('click', filterBtnClickHandler);

})();

