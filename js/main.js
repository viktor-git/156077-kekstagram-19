'use strict';
//  Добавляем функцию рандомизации элементов массива
var getRandElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

//  Добавляем функцию рандомизации чисел от мин до макс
var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

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

//  Функция для создания объекта с комментарием
var createComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
    message: getRandElement(commentsText),
    name: getRandElement(names)
  };
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
var createPhoto = function (item) {
  return {
    url: 'photos/' + item + '.jpg',
    description: 'Описание моей фотографии такое классное',
    likes: getRandomNum(15, 200),
    comments: getRandomComments()
  };
};

// Получаем массив данных о фотографии
var userPhotos = addPhotos(25);

//  Создаем фото для добавления в DOM на основе шаблона
var createPicture = function (picture) {
  var pictureTemplateClone = document.querySelector('#picture').content.cloneNode(true);

  pictureTemplateClone.querySelector('.picture__img').src = picture.url;
  pictureTemplateClone.querySelector('.picture__likes').textContent = picture.likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureTemplateClone;
};

//  Создаем фрагмент с фотографиями на основе шаблона добавления в DOM
var addPictures = function () {
  var fragment = new DocumentFragment();

  for (var i = 0; i < userPhotos.length; i++) {
    fragment.append(createPicture(userPhotos[i]));
  }

  return fragment;
};

//  Вставляем созданный фрагмент фотографий в DOM
document.querySelector('.pictures').append(addPictures());

var bigPicture = document.querySelector('.big-picture');

//  Показываем увеличенное фото
var showBigPicture = function () {
  document.querySelector('body').classList.add('modal-open');

  bigPicture.classList.remove('hidden');
  var randomPictureNum = getRandomNum(0, userPhotos.length);

  fillBigPictureInfo(userPhotos[randomPictureNum]);
  addPictureComments(userPhotos[randomPictureNum]);
};

//  Заполняем информацией увеличенное фото
var fillBigPictureInfo = function (pictureNumber) {
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = pictureNumber.url;

  var bigPictureDescr = bigPicture.querySelector('.big-picture__social .social__caption');
  bigPictureDescr.textContent = pictureNumber.description;

  var bigPictureLikes = bigPicture.querySelector('.big-picture__social .likes-count');
  bigPictureLikes.textContent = pictureNumber.likes;

  var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count .comments-count');
  bigPictureCommentsCount.textContent = pictureNumber.comments.length;
};

//  Добавляем комментарии к увеличенному фото
var addPictureComments = function (pictureNumber) {
  var pictureComments = createPictureComments(pictureNumber);

  var bigPictureUserComments = bigPicture.querySelector('.social__comments');
  bigPictureUserComments.innerHTML = '';
  bigPictureUserComments.append(pictureComments);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

//  Создаем массив комментариев для добавления к фото
var createPictureComments = function (pictureNumber) {
  var commentsFragment = new DocumentFragment();

  for (var i = 0; i < pictureNumber.comments.length; i++) {
    commentsFragment.append(createPictureComment(pictureNumber.comments[i]));
  }

  return commentsFragment;
};

//  Получаем комментарий для добавления к фото
var createPictureComment = function (pictureComment) {
  var bigPictureUserComment = document.querySelector('.social__comment').cloneNode(true);

  bigPictureUserComment.querySelector('.social__picture').src = pictureComment.avatar;
  bigPictureUserComment.querySelector('.social__picture').alt = pictureComment.name;
  bigPictureUserComment.querySelector('.social__text').textContent = pictureComment.message;

  return bigPictureUserComment;
};

// showBigPicture();
var imgOption = document.querySelector('.img-upload__overlay');
var uploadBtn = document.querySelector('#upload-file');
var closeBtn = imgOption.querySelector('.img-upload__cancel');

// Обработчик загрузки изображения
var imgUploadHandler = function () {
  imgOption.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', btnCloseImgHandler);
};

// Обработчик закрытия попапа с клавиши
var btnCloseImgHandler = function (evt) {
  if (evt.key === 'Escape') {
    closeImg();
  }
};

// Функция закрытия изображения
var closeImg = function () {
  imgOption.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadBtn.value = '';
  document.removeEventListener('keydown', btnCloseImgHandler);
};

uploadBtn.addEventListener('change', imgUploadHandler);
closeBtn.addEventListener('click', function () {
  closeImg();
});

var imgPreview = imgOption.querySelector('.img-upload__preview img');
var imgEfeectSlider =  document.querySelector('.img-upload__effect-level');
imgEfeectSlider.style.display = 'none';
var effectPin = imgOption.querySelector('.effect-level__pin');
var effectLine = imgOption.querySelector('.effect-level__line');

var effectDepth = imgOption.querySelector('.effect-level__value');
var effectDepthStartValue = effectDepth.value / 100;

// Вычисляем глубину эффекта
var countDepthValue = function () {
   return (effectPin.offsetLeft / effectLine.clientWidth).toFixed(1);
}

// Вычисляем конечную глубину эффекта
effectPin.addEventListener('mouseup', function () {
  effectDepth.value = countDepthValue();
});

var clearEffects = function () {
   imgPreview.setAttribute('class', '');
   imgPreview.style.filter = '';
}
// Накладываем выбранный эффект на фото
imgOption.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.parentNode.classList.contains('effects__item')) {
    switch (imgOption.querySelector('input[type="radio"]:checked').value) {
    case 'none':
      clearEffects();
      imgEfeectSlider.style.display = 'none';
      break;

    case 'chrome':
      imgEfeectSlider.style.display = 'block';
      clearEffects();
      effectDepth.value = effectDepthStartValue;
      imgPreview.classList.add('effects__preview--chrome');
      imgPreview.style.filter = 'grayscale' + '(' + effectDepth.value +')';
      break;

    case 'sepia':
      imgEfeectSlider.style.display = 'block';
      clearEffects();
      effectDepth.value = effectDepthStartValue;
      imgPreview.classList.add('effects__preview--sepia');
      imgPreview.style.filter = 'sepia' + '(' + effectDepth.value +')';
      break;

    case 'marvin':
      imgEfeectSlider.style.display = 'block';
      clearEffects();
      effectDepth.value = effectDepthStartValue;
      imgPreview.classList.add('effects__preview--marvin');
      imgPreview.style.filter = 'invert' + '(' + (effectDepth.value * 100 + '%') +')';
      break;

    case 'phobos':
      imgEfeectSlider.style.display = 'block';
      clearEffects();
      effectDepth.value = effectDepthStartValue;
      imgPreview.classList.add('effects__preview--phobos');
      imgPreview.style.filter = 'blur' + '(' + (effectDepth.value * 10) + 'px' + ')';
      break;

    case 'heat':
      imgEfeectSlider.style.display = 'block';
      clearEffects();
      effectDepth.value = effectDepthStartValue;
      imgPreview.classList.add('effects__preview--heat');
      imgPreview.style.filter = 'brightness' + '(' + (effectDepth.value * 10) + ')';
      break;
    }
  }
});
