Package.describe({
  summary: "Blueimp's bootstrap image gallery"
});

Package.on_use(function(api) {
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