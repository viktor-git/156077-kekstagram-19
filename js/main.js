'use strict'
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

  var commentsText = ['Всё отлично!',
                  'В целом всё неплохо. Но не всё.',
                  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
                  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
                  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
                  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var names = ['Евлампия', 'Alalay-balalay', 'Акакий', 'Вася Имбицил'];
  var comments = [];

//Функция для создания массива рандомных комментариев к фото
  var getRandomComment = function () {
    var avatarNumberMin = 1;
    var avatarNumberMax = 6;
    var randomNum = Math.floor(Math.random() * (6 - 1) + 1);
    for (var i = 0; i <= randomNum; i++) {
      var randomMessage = commentsText.randElement();
      var randomAvatar = Math.floor(Math.random() * (avatarNumberMax - avatarNumberMin) + avatarNumberMin);
      var randomComment = {
      avatar: `img/avatar-${randomAvatar}.svg`,
      message: randomMessage,
      name: names.randElement()
    };
    comments.push(randomComment);
    }
  }

  var photos = [];

//Функция создания пользовательских объектов с фото
  var addPhotos = function (copies) {
  var likeMin = 15;
  var likeMax = 200;
  var photo = {};
  for (var i = 1; i <= copies; i++) {
    debugger;
    getRandomComment();
    photo['url'] = `photos/${i}.jpg`;
    photo['description'] = 'Описание моей фотографии такое классное';
    photo['likes'] = Math.floor(Math.random() * (likeMax - likeMin) + likeMin);
    photo['comment'] = comments;
    var clonePhoto = Object.assign({}, photo);
/*Тут у меня какая-то ерунда с добавлением в массив photos. Все внутренние объекты получаются одинаковые без клонирования,
причем в функции выше getRandomComment в массив comments попадают разные объекты без клона.
Возможно как-то с передачей по ссылке связано, но почему в одном случае работает без клона, а во втором нет - непонятно*/
    photos.push(clonePhoto);
    comments = [];
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
    //*Тут не понял пока, как рандомно число комментов выводить под фото
    //Можно getRandomComment завязать на возврате randomComment, а не на заполнении массива комментариев
    //И далее в photo['comment'] передавать эту функцию
      newPhoto.querySelector('.picture__comments').textContent = photos[i].comment.length;;

      fragment.append(newPhoto);
  }
    return fragment;
}

//Вставляем созданный фрагмент в DOM
  var addPicturesToDom = function () {
    document.querySelector('.pictures').append(createPictures());
}

addPicturesToDom();





