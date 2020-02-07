'use strict';
//  Добавляем функцию рандомизации элементов массива
function getRandElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//  Добавляем функцию рандомизации чисел от мин до макс
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var commentsText = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = ['Евлампия', 'Alalay-balalay', 'Акакий', 'Вася Имбицил', 'Дрын Петрович', 'Марина Золотце'];


//  Функция для создания объекта с комментарием
var createComment = function () {
  var randomAvatar = getRandomNum(1, 6);
  var randomComment = {
    avatar: 'img/avatar-' + randomAvatar + '.svg',
    message: getRandElement(commentsText),
    name: getRandElement(names)
  };

  return randomComment;
};

//  Функция для создания массива рандомных комментариев к фото
var getRandomComments = function () {
  var comments = [];
  var randCommentsQuantity = getRandomNum(1, 6);

  for (var i = 0; i <= randCommentsQuantity; i++) {
    comments.push(createComment());
  }

  return comments;
};

//  Функция создания пользовательсого объекта с фото
var createPhoto = function (num) {
  var photo = {};

  photo['url'] = 'photos/' + num + '.jpg';
  photo['description'] = 'Описание моей фотографии такое классное';
  photo['likes'] = getRandomNum(15, 200);
  photo['comments'] = getRandomComments();

  var clonePhoto = Object.assign({}, photo);

  return clonePhoto;
};

//  Функция создания пользовательсого массива объектов с фото
var addPhotos = function (copies) {
  var photos = [];

  for (var i = 1; i <= copies; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
};

// Получаем массив данных о фотографии
var userPhotos = addPhotos(25);

//  Создаем фото для добавления в DOM на основе шаблона
var createPicture = function (num) {
  var pictureTemplateClone = document.querySelector('#picture').content.cloneNode(true);

  pictureTemplateClone.querySelector('.picture__img').src = userPhotos[num].url;
  pictureTemplateClone.querySelector('.picture__likes').textContent = userPhotos[num].likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = userPhotos[num].comments.length;

  return pictureTemplateClone;
};

//  Создаем фрагмент с фотографиями на основе шаблона добавления в DOM
var addPictures = function () {
  var fragment = new DocumentFragment();

  for (var i = 0; i < userPhotos.length; i++) {
    fragment.append(createPicture(i));
  }

  return fragment;
};

//  Вставляем созданный фрагмент фотографий в DOM
document.querySelector('.pictures').append(addPictures());
