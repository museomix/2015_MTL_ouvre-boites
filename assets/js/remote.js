$(document).ready(function(){
	$('.svg').click(function() {
		alert('Index' + $( ".svg" ).index( $(this) ));
	})
});