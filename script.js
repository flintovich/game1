jQuery.noConflict();
jQuery(document).ready(function ($) {
	$('body').keydown(function(shotClick){
	  if(shotClick.which == 32){
		var leftShotPosition = parseInt($('.tank').css('left')) + ($('.tank').width() / 2);
		$('#wrapper').append('<div class="rocket" />');
		
		function removeRocket(){
			$(this).remove();
		}
		$('.rocket').css('left',leftShotPosition).animate({bottom: '500px'},1000, removeRocket);	
	  }
	});
});