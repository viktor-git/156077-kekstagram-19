'use strict'
  var photos = [];
  var photo = {};

  var likeMin = 15;
  var likeMax = 200;

  var commentsText = ['Всё отлично!',
                  'В целом всё неплохо. Но не всё.',
                  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
                  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
                  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
                  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var names = ['Евлампия', 'Alalay-balalay', 'Акакий', 'Вася Имбицил'];
  var comments = [];
  var randomMessage = '';
  var randomAvatar = 0;

  var randomInfo = function () {
    randomMessage = commentsText[Math.round(Math.random() * (commentsText.length - 1))];
    randomAvatar = Math.round(Math.random() * (6 - 1) + 1);
    var comment = {
      avatar: `../img/avatar-${randomAvatar}.svg`,
      message: randomMessage,
      name: names[Math.round(Math.random() * (names.length - 1))]
    };
    comments.push(comment);
  }

  var createPhotoDescr = function (copies) {
  for (var i = 1; i <= copies; i++) {
    randomInfo();
    photo['url'] = `photos/${i}.jpg`;
    photo['description'] = 'Описание моей фотографии такое классное';
    photo['likes'] = Math.round(Math.random() * (likeMax - likeMin) + likeMin);
    photo['comments'] = comments[Math.round(Math.random() * (comments.length - 1))];
    photos.push(photo);
     console.log(photos);
  }
}
createPhotoDescr(4);


