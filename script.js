jQuery.noConflict();
jQuery(document).ready(function ($) {
    // variables and functions
    var windowWidth = $('#wrapper').width();
    var windowHeight = $('#wrapper').height();
    var countFalse = false;
    var killBugs = 1;
    var bugsPassed = 1;
    var bugsSpeed = 4500;
    var roadSpeed = 3;
    var tankSpeed = 15;
    var level = 1;
    var startRoad = -9200;
    var bugsList = new Array('1','2','3','4');

    // finish game
    function finishGame(){
        if(bugsPassed > 10){
            alert('Cчет:\nВы дошли до уровня: '+level+' и убили: '+killBugs+' врагов');
            killBugs = 0;
            bugsPassed = 0;
            bugsSpeed = 4500;
            roadSpeed = 3;
            tankSpeed = 15;
            level = 1;
            startRoad = -9200;

            $('.bugs-passed').text('0');
            $('.kill-bugs').text('0');
            $('.level').text('1');
        }
    }

    // rand
    function rand (min, max){
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor( Math.random() * (max - min + 1)) + min;
    }

    $(document).keydown(function(keyclick){
        var leftpositionStyle = $('.tank').css('left');
        var leftposition = parseInt(leftpositionStyle);
        if(keyclick.which == 39) {
            var i = leftposition;
            if(i >= windowWidth - $('.tank').width() ){
                return false
            }
            var i = i + tankSpeed;
            $('.tank').stop().animate({left: i}, 5, 'swing');

        } else if (keyclick.which == 37){
            var i = leftposition;
            if(i <= -5){
                return false
            }
            var i = i - tankSpeed;
            $('.tank').stop().animate({left: i}, 5, 'swing');

        } else if (keyclick.which == 32) {
            var rocket = true;

            var leftShotPosition = parseInt($('.tank').css('left')) + ($('.tank').width() / 2);
            $('#wrapper').append('<div class="rocket" />');

            function removeRocket(){
                rocket = false;
                $(this).remove();
            }
            $('.rocket').css('left',leftShotPosition).animate({bottom: windowHeight},800, 'linear', removeRocket);
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

                            // kill counts
                            $('.kill-bugs').text(killBugs++);

                        }
                    });
                }
            }
            setInterval(count, 30);

            return false
        }
    });

    // road
    function changeRoad(){
        if(startRoad >= 10){

            startRoad = -9200;
            bugsSpeed = bugsSpeed - 400;
            roadSpeed = roadSpeed + 1;
            tankSpeed = tankSpeed + 3;
            $('.level').text(level+=1);
        }
        $('#wrapper').css('backgroundPosition','0' +startRoad+'px');
        startRoad = startRoad + roadSpeed;

        $('.bug').each(function(){
            if($(this).offset().top >= windowHeight){
                countFalse = true;
            }
        });
    }
    setInterval(changeRoad, 10);

    // add rand bug
    function addBug(){
        randNubrer = rand(1, windowWidth - $('.tank').width());
        randBug = rand(1, bugsList.length);

        function removeBug(){
            // cont bugs passed
            if(countFalse == true){
                $('.bugs-passed').text(bugsPassed++);
                countFalse = false;

                finishGame(); // finish game call
            }

            $(this).remove();
        }
        $('#wrapper').append('<div style="left: '+randNubrer+'px" class="bug bug-'+randBug+'" />');
        $('.bug').animate({top: windowHeight + $('.bug').height() }, bugsSpeed, 'linear', removeBug);
    }
    setInterval(addBug, 3200);

    // window resize
    $(window).resize(function(){
        windowWidth = $('#wrapper').width();
        windowHeight = $('#wrapper').height();
    });
});