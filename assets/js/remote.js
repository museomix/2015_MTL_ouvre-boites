//Initialisation
var socket = io('http://172.17.3.174:8080');

//Affichage des boites sur l'écran
   


$(document).ready(function() {
    var base_box_height = $('.box').eq(0).height();
    var base_box_width = $('.box').eq(0).width();
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

    socket.on('show_box', function(index) {
        $('.box').css('background-color','').removeClass('selected').addClass('not_selected');
        $('.box_name, .box_year').attr('y', 0);
        $('#lightbox').fadeOut(function() {
            $(this).remove();
        });
        $('.box svg').css('width',base_box_width);
        $('.box').eq(index).css('background-color', 'Red').removeClass('not_selected').addClass('selected');
        $('.box.selected').prepend('<div id="lightbox"></div>');
        $('.box.selected .box_name, .box.selected .box_year').attr('y', -40);

        $('.box svg').eq(index).animate({
          //width: 700,
          top: (($( window ).height()/2) - (base_box_height/2) - parseInt($('#boxes').css("marginTop"))),
          left: (($( window ).width()/2) - ($('.box').eq(index).width()*1.1) - parseInt($('#boxes').css("marginLeft")))
        });
    });

    $('svg').each(function() {
        $(this).find('text').eq(0).text($(this).parent().data('box_name'));
        $(this).find('text').eq(1).text($(this).parent().data('box_year'));
        $(this).find('text').eq(2).text($(this).parent().data('box_job'));
        //$(this).find('text').eq(2).hide();
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
           
