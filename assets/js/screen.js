//Initialisation
var socket = io('http://172.17.3.174:8080');

var playing = false;
var content_to_display = '';
$(document).ready(function() {

  //Affichage des contenu
  socket.on('show_content_box', function(content) {
    console.log(content);
    content_to_display = '';
    if (content.content_type == 'youtube' && !playing) {
      content_to_display = '<iframe src="https://www.youtube.com/embed/' + content.content + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
    }
    if (content.content_type == 'image' && !playing) {
      content_to_display = '<img src="/assets/img/contents/' + content.content + '" />';
    }
  });

  //Déclenchement de la vidéo
  socket.on('launch_video', function(content) {
    //console.log(content_to_display);
    //console.info(playing);
    $('#coords').html('test');
    if (!playing && (content_to_display != '')) {
      console.log(content_to_display);
      $('#screen').html(content_to_display);
      playing = true;
    }
  });
  var playing = false;
  //Vidage contenu
  socket.on('blank_video', function(content) {
    console.log('Blank : ' + playing);
    if (playing && (content_to_display != '')) {
      console.log('blank');
      $('#screen').html('');
      playing = false;
    }
  });
});