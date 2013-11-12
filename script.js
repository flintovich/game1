jQuery.noConflict();
jQuery(document).ready(function ($) {
    // variables and functions
    var windowWidth = $('body').width();
    var windowHeight = $('body').height();
    var countFalse = false;
    var killBugs = 0;
    var bugsPassed = 0;
    var bugsSpeed = 4500;
    var roadSpeed = 3;
    var tankSpeed = 15;
    var level = 1;
    var startRoad = -9200;

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


    $('#wrapper').css('height', windowHeight);

    $('#wrapper, .bug').click(function(e){
        var rocket = true;
        var rocketPosition = e.clientX;
        var leftShotPosition = parseInt($('.tank').css('left')) + ($('.tank').width() / 2);
        $('#wrapper').append('<div class="rocket rocket-'+rocketPosition+'" />');

        function removeRocket(){
            rocket = false;
            $(this).remove();
        }
        $('.rocket-'+rocketPosition).css('left',leftShotPosition -6).animate({bottom: windowHeight},800, 'linear', removeRocket);
        function count(){
            if(rocket == true){
                $(".bug").each(function(){
                    // bugs coordinates
                    var topBug = $(this).position().top;
                    var bottomBug = topBug + $(this).height();
                    var leftBug = $(this).position().left;
                    var rightBug = $(this).position().left + $(this).width();

                    // rocket coordinates
                    var topRocket = $('.rocket-'+rocketPosition).position().top;
                    var leftRocket = $('.rocket-'+rocketPosition).position().left;

                    if(topRocket > topBug && topRocket < bottomBug && leftRocket > leftBug && leftRocket < rightBug){
                        rocket = false;
                        $(this).remove();
                        $('.rocket-'+rocketPosition).remove();

                        // kill counts
                        $('.kill-bugs').text(killBugs+=1);

                    }
                });
            }
        }
        setInterval(count, 30);

        return false
    });

    // mouse move
    $('#wrapper').mousemove(function(e){
        var x_mousePosition = e.clientX;
        if(x_mousePosition + 100 >= windowWidth){
            x_mousePosition = windowWidth - 100
            return false
        }

        $('.tank').css('left',x_mousePosition + 50 - $('.tank').width() / 2);
    });

    // road
    function changeRoad(){
        if(startRoad >= 10){

            startRoad = -9200;
            bugsSpeed = bugsSpeed - 300;
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


    // amount bugs for some time
    var BugsSpeed = 600;
    if(level <= 3){
        BugsSpeed = 1000;
    } else if(level <= 6){
        BugsSpeed = 2000;
    } else if (level >= 7 ){
        BugsSpeed = 3200;
    }

    // add rand bug
    function addBug(){
        randNubrer = rand(1, windowWidth - $('.tank').width());
        randBug = rand(1, 4);

        function removeBug(){
            // cont bugs passed
            if(countFalse == true){
                $('.bugs-passed').text(bugsPassed+=1);
                countFalse = false;

                finishGame(); // finish game call
            }

            $(this).remove();
        }
        $('#wrapper').append('<div style="left: '+randNubrer+'px" class="bug bug-'+randBug+'" />');
        $('.bug').animate({top: windowHeight + ($('.bug').height()*5)}, bugsSpeed, 'linear', removeBug);
    }
    setInterval(addBug, BugsSpeed);

    // window resize
    $(window).resize(function(){
        windowWidth = $('body').width();
        windowHeight = $('body').height();
        $('#wrapper').css('height', windowHeight);
    });
});