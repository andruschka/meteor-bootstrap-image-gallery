Package.describe({
  summary: "Blueimp's bootstrap image gallery",
  version: "0.0.5",
  git: "https://github.com/andruschka/meteor-bootstrap-image-gallery.git"
});

Package.on_use(function(api) {
  api.versionsFrom("METEOR@0.9.0");
  api.use(['jquery'], 'client');
  api.add_files(
    [
      'lib/blueimp-gallery.js', 
      'lib/blueimp-helper.js', 
      'lib/blueimp-gallery.min.css', 
      'lib/blueimp-gallery-video.js',
      'lib/jquery.blueimp-gallery.js',
      'lib/bootstrap-image-gallery.css',
      'lib/bootstrap-image-gallery.js',
      'lib/blueimp-gallery-video.css',
      'lib/blueimp-youtube.js',
      'lib/blueimp-gallery-audio.css',
      'lib/blueimp-gallery-audio.js'
    ]
    , 'client'
  );
  api.add_files(['lib/loading.gif'], 'client');
});