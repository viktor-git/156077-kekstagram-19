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

//  Функция создания пользовательсого массива объектов с фото
var addPhotos = function (copies) {
  var photos = [];

  for (var i = 1; i <= copies; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
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

//  Функция для создания массива рандомных комментариев к фото
var getRandomComments = function () {
  var comments = [];
  var randCommentsQuantity = getRandomNum(1, 6);

  for (var i = 0; i <= randCommentsQuantity; i++) {
    comments.push(createComment());
  }

  return comments;
};

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

// Получаем массив данных о фотографии
var userPhotos = addPhotos(25);

//  Создаем фрагмент с фотографиями на основе шаблона добавления в DOM
var addPictures = function () {
  var fragment = new DocumentFragment();

  for (var i = 0; i < userPhotos.length; i++) {
    fragment.append(createPicture(i));
  }

  return fragment;
};

//  Создаем фото для добавления в DOM на основе шаблона
var createPicture = function (item) {
  var pictureTemplateClone = document.querySelector('#picture').content.cloneNode(true);

  pictureTemplateClone.querySelector('.picture__img').src = userPhotos[item].url;
  pictureTemplateClone.querySelector('.picture__likes').textContent = userPhotos[item].likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = userPhotos[item].comments.length;

  return pictureTemplateClone;
};

//  Вставляем созданный фрагмент фотографий в DOM
document.querySelector('.pictures').append(addPictures());

var bigPicture = document.querySelector('.big-picture');

//  Показываем увеличенное фото
var showBigPicture = function () {
  document.querySelector('body').classList.add('modal-open');

  bigPicture.classList.remove('hidden');
  var randomPictureNum = getRandomNum(0, userPhotos.length);

  fillBigPictureInfo(randomPictureNum);
  addPictureComments(randomPictureNum);
};

//  Заполняем информацией увеличенное фото
var fillBigPictureInfo = function (num) {
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = userPhotos[num].url;

  var bigPictureDescr = bigPicture.querySelector('.big-picture__social .social__caption');
  bigPictureDescr.textContent = userPhotos[num].description;

  var bigPictureLikes = bigPicture.querySelector('.big-picture__social .likes-count');
  bigPictureLikes.textContent = userPhotos[num].likes;

  var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count .comments-count');
  bigPictureCommentsCount.textContent = userPhotos[num].comments.length;
};

//  Добавляем комментарии к увеличенному фото
var addPictureComments = function (num) {
  var pictureComments = createPictureComments(num);

  var bigPictureUserComments =  bigPicture.querySelector('.social__comments');
  bigPictureUserComments.innerHTML = '';
  bigPictureUserComments.append(pictureComments);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

//  Создаем массив комментариев для добавления к фото
var createPictureComments = function (num) {
  var commentsFragment = new DocumentFragment();

  for (var i = 0; i < userPhotos[num].comments.length; i++) {
    commentsFragment.append(createPictureComment(num, i));
  }

  return commentsFragment;
};

//  Получаем комментарий для добавления к фото
var createPictureComment = function (num, item) {
  var bigPictureUserComment = document.querySelector('.social__comment').cloneNode(true);

  bigPictureUserComment.querySelector('.social__picture').src = userPhotos[num].comments[item].avatar;
  bigPictureUserComment.querySelector('.social__picture').alt = userPhotos[num].comments[item].name;
  bigPictureUserComment.querySelector('.social__text').textContent = userPhotos[num].comments[item].message;

  return bigPictureUserComment;
};

showBigPicture();
