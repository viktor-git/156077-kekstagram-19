'use strict';

(function () {

  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  });

})();
