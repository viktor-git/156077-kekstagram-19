'use strict'
  var photos = [];
  var photo = {};
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
  var comments = [];

  var getRandomInfo = function () {
    var randomMessage = commentsText[Math.floor(Math.random() * commentsText.length)];
    var randomAvatar = Math.floor(Math.random() * (avatarNumberMax - avatarNumberMin) + avatarNumberMin);
    var randomComment = {
      avatar: `../img/avatar-${randomAvatar}.svg`,
      message: randomMessage,
      name: names[Math.floor(Math.random() * names.length)]
    };
    comments.push(randomComment);
    /*for (var i = 0; i < comments.length; i++) {
      console.log(comments[i]);
    }*/
  }

  var createPhotoDescr = function (copies) {
  for (var i = 1; i <= copies; i++) {
    getRandomInfo();
    photo['url'] = `photos/${i}.jpg`;
    photo['description'] = 'Описание моей фотографии такое классное';
    photo['likes'] = Math.floor(Math.random() * (likeMax - likeMin) + likeMin);
    photo['comment'] = comments[Math.floor(Math.random() * comments.length)];
    photos.push(photo);
    console.log(photos[i - 1].comment);
  }
}
createPhotoDescr(25);


