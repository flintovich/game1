jQuery.noConflict();
jQuery(document).ready(function ($) {
    // ---------------------------------------
    // variables and functions
    // ---------------------------------------
    var windowWidth = $('body').width();
    var windowHeight = $('body').height();
    var countFalse = false;
    var killBugs = 0;
    var bugsPassed = 0;
    var bugsSpeed = 4500;
    var roadSpeed = 2;
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
            roadSpeed = 1;
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

    // Если ничего нет - возвращаем обычный таймер
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    // ---------------------------------------
    // base
    // ---------------------------------------

    $('#wrapper').css('height', windowHeight);

    // window resize
    $(window).resize(function(){
        windowWidth = $('body').width();
        windowHeight = $('body').height();
        $('#wrapper').css('height', windowHeight);
    });


    // ---------------------------------------
    // mouse click
    // ---------------------------------------
    $('#wrapper, .bug').click(function(){
        var rocket = true;
        var i = rand(0,9999);
        var leftShotPosition = parseInt($('.tank').css('left')) + ($('.tank').width() / 2);
        $('#wrapper').append('<div class="rocket rocket-'+i+'" />');

        function removeRocket(){
            rocket = false;
            $(this).remove();
        }
        $('.rocket-'+i).css('left',leftShotPosition -6).animate({bottom: windowHeight},800, 'linear', removeRocket);
        function count(){
            if(rocket == true){
                $(".bug").each(function(){
                    // bugs coordinates
                    var topBug = $(this).position().top;
                    var bottomBug = topBug + $(this).height();
                    var leftBug = $(this).position().left;
                    var rightBug = $(this).position().left + $(this).width();

                    // rocket coordinates
                    var topRocket = $('.rocket-'+i).position().top;
                    var leftRocket = $('.rocket-'+i).position().left;

                    if(topRocket > topBug && topRocket < bottomBug && leftRocket > leftBug && leftRocket < rightBug){
                        rocket = false;
                        $(this).remove();
                        $('.rocket-'+i).css('opacity',0);

                        // kill counts
                        $('.kill-bugs').text(killBugs+=1);

                    }
                });
            }
        }
        (function animationLoop(){
            count();
            requestAnimationFrame(animationLoop, '.bug');
        })();

        return false
    });


    // ---------------------------------------
    // mouse move
    // ---------------------------------------
    $('#wrapper').mousemove(function(e){
        var x_mousePosition = e.clientX;
        if(x_mousePosition + 100 >= windowWidth){
            x_mousePosition = windowWidth - 100
            return false
        }

        $('.tank').css('left',x_mousePosition + 50 - $('.tank').width() / 2);
    });


    // ---------------------------------------
    // road
    // ---------------------------------------
    function changeRoad(){
        if(startRoad >= 10){

            startRoad = -9200;
            bugsSpeed = bugsSpeed - 300;
            roadSpeed = roadSpeed + 0.7;
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
    (function animationLoop(){
        changeRoad();
        requestAnimationFrame(animationLoop, '#wrapper');
    })();

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

        if(level <= 3){
            bugsSpeed = rand(3500, 7000);
        } else if(level <= 6){
            bugsSpeed = rand(3000, 6000);
        } else if (level >= 7 ){
            bugsSpeed = rand(3100, 5000);
        }
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

    // ---------------------------------------
    // add rand bonuses
    // ---------------------------------------

    // fighter
    function fighter(){
        $('#wrapper').append('<div style="left: '+randNubrer+'px" class="bonus fighter" />');
        $('.fighter').animate({top: windowHeight + ($('.fighter').height()*5)}, bugsSpeed, 'linear');
    }
    setInterval(fighter, 3000);

});