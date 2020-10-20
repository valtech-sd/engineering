function throttle(callback, limit) {
  var waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

imagesLoaded('.grid', function () {
  checkVisibilityOfAllVideos();

  new Colcade('.grid', {
    columns: '.grid-col',
    items: '.grid-item',
  });

  checkVisibilityOfAllVideos();
});

function playVideoIfVisible(video) {
  var rect = video.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;
  var isPartiallyVisible = elemTop < window.innerHeight && elemBottom >= 0;
  // var isCompletelyVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

  if (isPartiallyVisible) {
    video.play();
  } else {
    video.pause();
  }
}

function checkVisibilityOfAllVideos() {
  document.querySelectorAll('.grid video').forEach(function (video) {
    playVideoIfVisible(video);
  });
}

window.addEventListener('scroll', throttle(checkVisibilityOfAllVideos, 250));
