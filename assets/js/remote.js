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
        socket.emit('box_selected', $('.svg').index($(this)));
        socket.emit('box_content', 
        {
        	content_type : $(this).data('content_type'),
        	content : $(this).data('content'),
        }
        );
    });

    //Passage en inline des SVG pour les rendre dynamiques
	$('.svg').inlineSVG(
    	{
    	 	allAfter: function () {
            $('.box').each(function() {
    			$(this).find('text').text($(this).data('box_name'));
    			$(this).find('image').attr('xlink:href', $(this).data('photo_url'));
    		});
        },
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
            gamma = Math.round(event.gamma);
    }   
                
    //Gestion de l'inclinaison
    setInterval(function() {
        $('#coords').html('Alpha : ' + alpha + ' / Beta : ' + beta + ' / Gamma ' + gamma)
        if (gamma > 2)
        {
            socket.emit('play_video');
        }
        if (gamma == 0) {
            socket.emit('empty_video');
        }

    }, checkDelay);
            
});
           
