jQuery.noConflict();
jQuery(document).ready(function ($) {
	$('body').keydown(function(shotClick){
	  if(shotClick.which == 32){
		var leftShotPosition = parseInt($('.tank').css('left')) + ($('.tank').width() / 2);
		$('#wrapper').append('<div class="rocket" />');
		
		function removeRocket(){
			$(this).remove();
		}
		$('.rocket').css('left',leftShotPosition).animate({bottom: '500px'},1000, 'linear', removeRocket);	
		
		  function count(){
			var leftTopBug = jQuery(".bug").eq(2).position().top;
			var leftBottomBug = leftTopBug + jQuery('.bug').height();
			var rightTopBug = leftTopBug + jQuery('.bug').width();
			var rightBottomBug = leftBottomBug + jQuery('.bug').width();

			var leftTopRocket = jQuery('.rocket').position().top;
			if(leftTopRocket > leftTopBug && leftTopRocket < leftBottomBug){
				alert('попал');
				$(this).remove();
			}
		  }
		setInterval(count, 50);
		
	  }
	});
});