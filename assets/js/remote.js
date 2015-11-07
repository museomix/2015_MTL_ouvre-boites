var socket = io('http://172.17.3.174:8080');
            socket.on('show_box', function(index) {
            	$('.svg').css('background-color','');
            	$('.svg').eq(index).css('background-color', 'Red');
            });
$(document).ready(function() {
	 $('.svg').click(function () {
        socket.emit('box_selected', $('.svg').index($(this)));
    });
});
           
