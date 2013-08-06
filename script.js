jQuery.noConflict();
jQuery(document).ready(function ($) {
	
	$(document).keydown(function(keyclick){
		var leftpositionStyle = $('.tank').css('left');
		var leftposition = parseInt(leftpositionStyle);
	  	if(keyclick.which == 39) {
			var i = leftposition;
				if(i == 520){
					return false
				}
				var i = i + 15;
				$('.tank').animate({left: i}, 1, 'swing');

		} else if (keyclick.which == 37){
			var i = leftposition;
			if(i == -5){
				return false
			}
			var i = i - 15;
			$('.tank').animate({left: i}, 1, 'swing');

		} else if (keyclick.which == 32) {
			var rocket = true;

			var leftShotPosition = parseInt($('.tank').css('left')) + ($('.tank').width() / 2);
			$('#wrapper').append('<div class="rocket" />');

			function removeRocket(){
				rocket = false;
				$(this).remove();
			}
			$('.rocket').css('left',leftShotPosition).animate({bottom: '700px'},800, 'linear', removeRocket);
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
	
	// roud
	var startRoud = -9200;
	function changeRoad(){
		if(startRoud == 0){
			startRoud = -9200;
		}
		$('#wrapper').css('backgroundPosition','0' +startRoud+'px');
		startRoud = startRoud + 2;


        $('.bug').each(function(){
            if($(this).offset().top >= '770'){
                alert('Проиграл!');
            }
        });
	}
	setInterval(changeRoad, 40);
	
	// add rand bug
	function addBug(){
		function rand (min, max){
		  min = parseInt(min);
		  max = parseInt(max);
		  return Math.floor( Math.random() * (max - min + 1)) + min;
		}
		randNubrer = rand(1, 540);
		
		function removeBug(){
			$(this).remove();
		}
		$('#wrapper').append('<div style="left: '+randNubrer+'px" class="bug" />');
		$('.bug').animate({top: '700px'}, 6500, 'linear', removeBug);
	}
	setInterval(addBug, 3200);
	
});

 
	