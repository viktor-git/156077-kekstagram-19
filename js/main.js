'use strict'
  var photos = [];
  var comments = [];

  var likeMin = 15;
  var likeMax = 200;

  var avatarNumberMin = 1;
  var avatarNumberMax = 6;

  var commentsText = ['Всё отлично!',
                  'В целом всё неплохо. Но не всё.',
                  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
                  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
                  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
                  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var names = ['Евлампия', 'Alalay-balalay', 'Акакий', 'Вася Имбицил'];

//Добавляем метод рандомизации элементов массива
  Object.defineProperty(
    Object.prototype,
    'randElement',
    {
      value: function() {
          var rand = Math.floor(Math.random() * this.length);
          return this[rand];
        }
    }
);

//Функция для создания массива рандомных комментариев к фото
  var getRandomInfo = function () {
    var randomMessage = commentsText.randElement();
    var randomAvatar = Math.floor(Math.random() * (avatarNumberMax - avatarNumberMin) + avatarNumberMin);
    var randomComment = {
      avatar: `img/avatar-${randomAvatar}.svg`,
      message: randomMessage,
      name: names.randElement()
    };
    comments.push(randomComment);
  }

//Функция создания пользовательских объектов с фото
  var addPhotos = function (copies) {
  var photo = {};
  for (var i = 1; i <= copies; i++) {
    //debugger;
    getRandomInfo();
    photo['url'] = `photos/${i}.jpg`;
    photo['description'] = 'Описание моей фотографии такое классное';
    photo['likes'] = Math.floor(Math.random() * (likeMax - likeMin) + likeMin);
    photo['comment'] = comments.randElement();
    var clonePhoto = Object.assign({}, photo);
//Тут у меня какая-то ерунда с добавлением в массив photos. Все внутренние объекты получаются одинаковые,
//причем в функции выше в массив comments попадают разные объекты без клонирования.
    photos.push(clonePhoto);
  }
}

//Создаем фрагмент с фото для добавления в DOM на основе шаблона
  var createPictures = function () {
    addPhotos(25);

    var pictureTemplate = document.querySelector('#picture').content;
    var fragment = new DocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var newPhoto = pictureTemplate.cloneNode(true);
      newPhoto.querySelector('.picture__img').src = photos[i].url;
      newPhoto.querySelector('.picture__likes').textContent = photos[i].likes;
      newPhoto.querySelector('.picture__comments').textContent = 1;

      fragment.append(newPhoto);
  }
    return fragment;
}

//Вставляем созданный фрагмент в DOM
  var addPicturesToDom = function () {
    document.querySelector('.pictures').append(createPictures());
}

addPicturesToDom();





