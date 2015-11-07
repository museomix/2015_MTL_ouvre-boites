//Initialisation
var socket = io('http://172.17.3.174:8080');

var playing = false;
var content_to_display = '';
$(document).ready(function() {

  //Affichage des contenu
  socket.on('show_content_box', function(content) {
    content_to_display = '';
    if (content.content_type == 'youtube' && !playing) {
      content_to_display = '<iframe src="https://www.youtube.com/embed/' + content.content + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
    }
  });

  //Déclenchement de la vidéo
  socket.on('launch_video', function(content) {
    $('#coords').html('test');
    if (!playing && (content_to_display != '')) {
      $('#screen').html(content_to_display);
      playing = true;
    }
  });

  //Vidage contenu
  socket.on('blank_video', function(content) {
    if (playing && (content_to_display != '')) {
      $('#screen').html('');
      playing = false;
    }
  });
});