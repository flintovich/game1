jQuery.noConflict();
jQuery(document).ready(function ($) {
	$('body').keydown(function(shotClick){
		if(shotClick.which == 32){
			var rocket = true;

			var leftShotPosition = parseInt($('.tank').css('left')) + ($('.tank').width() / 2);
			$('#wrapper').append('<div class="rocket" />');

			function removeRocket(){
				$(this).remove();
				rocket = false;
			}
			$('.rocket').css('left',leftShotPosition).animate({bottom: '500px'},800, 'linear', removeRocket);	
			function count(){
				if(rocket == true){
					$(".bug").each(function(){
						// bugs coordinates
						var topBug = $(this).position().top;
						var bottomBug = topBug + $(this).height();
						var leftBug = $(this).position().left;
						var rightBug = $(this).position().left + $(this).width();
						
						// rocket coordinates
						var topRocket = $('.rocket').position().top;
						var leftRocket = $('.rocket').position().left;
						
						if(topRocket > topBug && topRocket < bottomBug && leftRocket > leftBug && leftRocket < rightBug){
							rocket = false;
							$(this).remove();
							$('.rocket').eq(0).remove();
						}
					});
				}
			}
			setInterval(count, 30);
			
			return false
		}
	});
});