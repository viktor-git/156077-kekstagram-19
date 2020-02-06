'use strict'
//Добавляем функцию рандомизации элементов массива
function getRandElement (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
  }

//Добавляем функцию рандомизации чисел от мин до макс
function getRandomNum (min, max) {
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

//Функция для создания массива рандомных комментариев к фото
  var getRandomComments = function () {
    var avatarNumberMin = 1;
    var avatarNumberMax = 6;
    var comments = [];
    var randCommentsQuantity = getRandomNum(1, 6);
    for (var i = 0; i <= randCommentsQuantity; i++) {
      var randomMessage = getRandElement(commentsText);
      var randomAvatar = getRandomNum(1, 6);
      var randomComment = {
        avatar: 'img/avatar-' + randomAvatar + '.svg',
        message: randomMessage,
        name: getRandElement(names)
      };
      comments.push(randomComment);
  }
    return comments;
}

//Функция создания пользовательских объектов с фото
  var addPhotos = function (copies) {

    var likeMin = 15;
    var likeMax = 200;
    var photos = [];
    var photo = {};

    for (var i = 1; i <= copies; i++) {
      var photoComments = getRandomComments();
      photo['url'] = 'photos/' + i + '.jpg';
      photo['description'] = 'Описание моей фотографии такое классное';
      photo['likes'] = getRandomNum(15, 200);
      photo['comment'] = photoComments;
      var clonePhoto = Object.assign({}, photo);
      photos.push(clonePhoto);
  }
    return photos;
}

  var userPhotos = addPhotos(25);

//Создаем фрагмент с фото для добавления в DOM на основе шаблона
  var createPictures = function () {
<<<<<<< HEAD
    console.log(userPhotos);
=======

>>>>>>> module3-task2
    var pictureTemplate = document.querySelector('#picture').content;
    var fragment = new DocumentFragment();

    for (var i = 0; i < userPhotos.length; i++) {
      var newPhoto = pictureTemplate.cloneNode(true);
      newPhoto.querySelector('.picture__img').src = userPhotos[i].url;
      newPhoto.querySelector('.picture__likes').textContent = userPhotos[i].likes;
      newPhoto.querySelector('.picture__comments').textContent = userPhotos[i].comment.length;

      fragment.append(newPhoto);
  }

    return fragment;
}

//Вставляем созданный фрагмент фотографий в DOM
  var addPicturesToDom = function () {
    document.querySelector('.pictures').append(createPictures());
}

  var userPhotos = addPhotos(25);
  addPicturesToDom();

//Показываем увеличенное фото
  var showBigPicture = function () {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    fillBigPictureInfo(bigPicture);
}

//Заполняем информацией увеличенное фото
  var fillBigPictureInfo = function (picture) {

    var bigPictureImg = picture.querySelector('.big-picture__img img');
    bigPictureImg.src = userPhotos[0].url;

    var bigPictureDescr = picture.querySelector('.big-picture__social .social__caption');
    bigPictureDescr.textContent = userPhotos[0].description;

    var bigPictureLikes = picture.querySelector('.big-picture__social .likes-count');
    bigPictureLikes.textContent = userPhotos[0].likes;

    var bigPictureCommentsCount = picture.querySelector('.social__comment-count .comments-count');
    bigPictureCommentsCount.textContent = userPhotos[0].comment.length;

    addPictureComments(picture);
}

//Добавляем комментарии к увеличенному фото
  var addPictureComments = function (picture) {

    var bigPictureUserComments = picture.querySelector('.social__comments');
    var bigPictureUserComment = bigPictureUserComments.querySelector('.social__comment');

    var commentsFragment = new DocumentFragment();

    for (var i = 0; i < userPhotos[0].comment.length; i++) {
          var newComment = bigPictureUserComment.cloneNode(true);
          newComment.querySelector('.social__picture').src = userPhotos[0].comment[i].avatar;
          newComment.querySelector('.social__picture').alt = userPhotos[0].comment[i].name;
          newComment.querySelector('.social__text').textContent = userPhotos[0].comment[i].message;

          commentsFragment.append(newComment);
      }

    bigPictureUserComments.append(commentsFragment);
}

  showBigPicture();

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');




