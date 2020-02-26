'use strict';
// Модуль создания галереи фото с пользовательскими данными
(function () {

  var commentsText = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var names = ['Евлампия', 'Alalay-balalay', 'Акакий', 'Вася Имбицил', 'Дрын Петрович', 'Марина Золотце', 'Надежда Ильинична'];

  //  Функция для создания объекта с комментарием
  var createComment = function () {
    return {
      avatar: 'img/avatar-' + window.util.getRandomNum(1, 6) + '.svg',
      message: window.util.getRandElement(commentsText),
      name: window.util.getRandElement(names)
    };
  };

  //  Функция для создания массива рандомных комментариев к фото
  var getRandomComments = function () {
    var comments = [];
    var randCommentsQuantity = window.util.getRandomNum(1, 6);

    for (var i = 0; i <= randCommentsQuantity; i++) {
      comments.push(createComment());
    }

    return comments;
  };

  //  Функция создания пользовательсого объекта с фото
  var createPhoto = function (item) {
    return {
      url: 'photos/' + item + '.jpg',
      description: 'Описание моей фотографии такое классное',
      likes: window.util.getRandomNum(15, 200),
      comments: getRandomComments(),
    };
  };

  var addPhotos = function (copies) {
    var photos = [];

    for (var i = 1; i <= copies; i++) {
      photos.push(createPhoto(i));
    }

    return photos;
  };

  var userPhotos = addPhotos(25);

  // Экспорт
  window.data = {
    'userPhotos': userPhotos
  };

})();
