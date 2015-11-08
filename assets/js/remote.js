//Initialisation
var socket = io('http://172.17.3.174:8080');

//Affichage des boites sur l'écran
socket.on('show_box', function(index) {
	$('.svg').css('background-color','');
	$('.svg').eq(index).css('background-color', 'Red');
});


$(document).ready(function() {

    //Sélection des boites
	$('.box').click(function () {
        socket.emit('box_selected', $('.box').index($(this)));
        socket.emit('box_content', 
        {
        	content_type : $(this).data('content_type'),
        	content : $(this).data('content'),
        }
        );
    });

    $('svg').each(function() {
        $(this).find('text').eq(0).text($(this).parent().data('box_name'));
        $(this).find('text').eq(1).text($(this).parent().data('box_year'));
        $(this).find('text').eq(2).text($(this).parent().data('box_job'));
        $(this).find('text').eq(2).hide();
        $(this).find('image').attr('xlink:href', '/assets/img/photos/' + $(this).parent().data('photo_url'));

    });
    

    //Gestion du gyroscope
	var alpha = 0;
    var beta = 0;
    var gamma = 0;

    //Mesure de l'orientation
    var checkDelay = 600;
    window.ondeviceorientation = function(event) {
            alpha = Math.round(event.alpha);
            beta = Math.round(event.beta);
            previousGamma = gamma;
            gamma = Math.round(event.gamma);
    }   
                
    //Gestion de l'inclinaison
    var playing = false;
    setInterval(function() {
        if (gamma > 10)
        {
            socket.emit('play_video');
            playing = true;
        }
        if ((gamma < 10) && (playing)) {
            playing = false;
            socket.emit('no_video');
        }

    }, checkDelay);
            
});
           
