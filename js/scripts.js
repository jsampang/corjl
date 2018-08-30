/*
Template Name: materialize
Author: TrendyTheme
Version: 1.5
*/



(function($) {
            $.fn.videoPopup = function(options) {
                var videoPopup = {
                    embedLink: ''
                }

                var settings = $.extend({
                    autoplay: false,
                    showControls: true,
                    controlsColor: null,
                    loopVideo: false,
                    showVideoInformations: true,
                    width: null,
                    customOptions: {}
                }, options);

                var parsers = {
                    youtube: {
                        regex: /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
                        test: function(videoUrl, regex) {
                            var match = videoUrl.match(regex);
                            return (match && match[7].length == 11) ? match[7] : false;
                        },
                        mount: function(videoCode) {
                            var youtubeOptions = {
                                autoplay: settings.autoplay,
                                color: settings.controlsColor,
                                loop: settings.loopVideo,
                                controls: settings.showControls,
                                showinfo: settings.showVideoInformations,
                            }

                            Object.assign(youtubeOptions, settings.customOptions);

                            return "https://www.youtube.com/embed/" + videoCode + "/?" + $.param(youtubeOptions);
                        }
                    },
                    vimeo: {
                        regex: /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/,
                        test: function(videoUrl, regex) {
                            var match = videoUrl.match(regex);
                            return (match && match[5].length) ? match[5] : false;
                        },
                        mount: function(videoCode) {
                            var vimeoOptions = {
                                autoplay: settings.autoplay,
                                color: settings.controlsColor,
                                loop: settings.loopVideo,
                                controls: settings.showControls,
                                title: settings.showVideoInformations,
                            }

                            Object.assign(vimeoOptions, settings.customOptions);

                            return "https://player.vimeo.com/video/" + videoCode + "/?" + $.param(vimeoOptions);
                        }
                    }
                }

                function mountEmbedLink(videoUrl) {
                    $.each(parsers, function(index, parser) {
                        var videoCode = parser.test(videoUrl, parser.regex);

                        if (videoCode) {
                            videoPopup.embedLink = parser.mount(videoCode);
                            return this;
                        }
                    })
                }

                function mountIframe() {
                    var iframeElement = '<iframe src="' + videoPopup.embedLink + '" allowfullscreen frameborder="0" width="' + settings.width + '"></iframe>';

                    if (!videoPopup.embedLink) {
                        iframeElement = '<div class="videopopupjs__block--notfound">Video not found</div>';
                    }

                    return '<div class="videopopupjs videopopupjs--animation">' +
                        '<div class="videopopupjs__content">' +
                        '<span class="videopopupjs__close"></span>' +
                        iframeElement +
                        '</div>' +
                        '</div>';
                }

                $(this).css('cursor', 'pointer');
                $(this).on('click', function(event) {
                    event.preventDefault();

                    var videoUrl = $(this).attr("video-url");
                    var videoIframe = mountEmbedLink(videoUrl);

                    $("body").append(mountIframe());

                    $('.videopopupjs__content').css('max-width', 700);
                    if (settings.width) {
                        $('.videopopupjs__content').css('max-width', settings.width);
                    }

                    if ($('.videopopupjs').hasClass('videopopupjs--animation')) {
                        setTimeout(function() {
                            $('.videopopupjs').removeClass("videopopupjs--animation");
                        }, 200);
                    }

                    $(".videopopupjs, .videopopupjs__close").click(function() {
                        $(".videopopupjs").addClass("videopopupjs--hide").delay(515).queue(function() {
                            $(this).remove();
                        });
                    });
                });

                $(document).keyup(function(event) {
                    if (event.keyCode == 27) {
                        $('.videopopupjs__close').click();
                    }
                });

                return this;
            };
        }(jQuery));
        
        
        $(function() {
            $("#video,#video1,#video2").videoPopup({
                autoplay: 1,
                controlsColor: 'white',
                showVideoInformations: 0,
                width: 1000,
                customOptions: {
                    rel: 0,
                    end: 60
                }
            });
            $("#videoxx").videoPopup();
        });
        

;(function () {

    "use strict"; // use strict to start

    $(document).ready(function () {


        /* === Preloader === */
        $("#preloader").delay(200).fadeOut("slow");


        /* === Alternate menu appear === */
        $("#materialize-menu-alt").html('<ul class="menuzord-menu">' + $("#menu-list").html() + "</ul>");


        /* === materialize Mega Menu === */
        jQuery("#materialize-menu, #materialize-menu-alt").menuzord({
            indicatorFirstLevel: "<i class='fa fa-angle-down'></i>",
            indicatorSecondLevel: "<i class='fa fa-angle-right'></i>"
        });


        /* === nav sticky header === */
        var navBottom = $(".nav-bottom").offset();

        $(window).on('scroll', function () {
            var w = $(window).width();
            if ($(".nav-bottom").length == 0) {
                if (w > 768) {
                    if ($(this).scrollTop() > 1) {
                        $('header').addClass("sticky");
                    }
                    else {
                        $('header').removeClass("sticky");
                    }
                }
            } else {
                if (w > 768) {
                    if ($(this).scrollTop() > navBottom.top + 100) {
                        $('header').addClass("sticky");
                    }
                    else {
                        $('header').removeClass("sticky");
                    }
                }
            }
        });



        /* === sticky header alt === */
        $(window).on('scroll', function () {
            var w = $(window).width();
            if (w > 768) {
                if ($(this).scrollTop() > 1) {
                    $('.mainmenu').slideUp(function () {
                        $('.menu-appear-alt').css({position: "fixed", top: 0, left: 0, width: w, zIndex: 99999});
                        $('.menu-appear-alt').slideDown();
                    });

                }
                else {
                    $('.menu-appear-alt').slideUp(function () {
                        $('.menu-appear-alt').css({position: "relative", top: 0, left: 0, width: w, zIndex: 99999});
                        $('.mainmenu').slideDown();

                    });

                }
            }

            $(".nav-bottom").css("z-Index", 100000);

            if(navBottom) {
                if ($(window).scrollTop() > (navBottom.top)) {
                    $(".nav-bottom").css({"position": "fixed", "top": "0px", "left": "0px"});
                } else {
                    $(".nav-bottom").css({"position": "fixed", top: navBottom.top - $(window).scrollTop() + "px"});
                }
            }

        });


        /* === Onepage Menu === */
        $(".op-nav li").on("click",function(){
            if($(".showhide").is(":visible")){
                $(".showhide").trigger("click");
            }
            $(".op-nav li").removeClass("active");
            $(this).addClass("active");
        });



        /* === Search === */
        (function () {
            $('.search-trigger').on('click', function (e) {
                $('body').addClass('active-search');
            });

            $('.search-close').on('click', function (e) {
                $('body').removeClass('active-search');
            });
        }());


        /* === Page scrolling feature - requires jQuery Easing plugin === */

        $('a.page-scroll').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 60
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
        
        
        /* === for onepage menu scroll === */
        if( typeof smoothScroll == 'object'){
            smoothScroll.init();
        }


        /* === Full Screen Banner === */
        $(window).on('resizeEnd', function () {
            $(".fullscreen-banner").height($(window).height());
        });

        $(window).resize(function () {
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
                $(this).trigger('resizeEnd');
            }, 300);
        }).trigger("resize");




        /* === Tab to Collapse === */
        if ($('.nav-tabs').length > 0) {
           $('.nav-tabs').tabCollapse();
        }


        /* === Detect IE version === */
        (function () {
            
            function getIEVersion() {
                var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
                return match ? parseInt(match[1], 10) : false;
            }

            if( getIEVersion() ){
                $('html').addClass('ie'+getIEVersion());
            }

        }());



        /* === Counter === */
        $('.counter-section').on('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.timer').each(function () {
                    var $this = $(this);
                    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
                $(this).off('inview');
            }
        });



        /* === Instagram Photo Feed === */

        /**
         * ### HOW TO CREATE A VALID INSTAGRAM ID TO USE: ###
         * You need your user name and your access token for use Instagram API. Login to Instagram https://www.instagram.com 
         * You can get your user ID from here: https://smashballoon.com/instagram-feed/find-instagram-user-id/
         * Get your access token from http://jelled.com/instagram/access-token and folow the instruction
         * You can also generate access token from here: http://instagram.pixelunion.net/.
         * Use your userId and accessToken as below instead!

         */


        if ($('#myinstafeed').length > 0) {
            var feed = new Instafeed({
                target: 'myinstafeed', //The ID of a DOM element you want to add the images to
                limit: 6,
                get: 'user',
                userId: 2963143209,
                accessToken: '2963143209.1677ed0.6cf28ac3f9c041759202e3e1af8baa46'
            });
            feed.run();
        }


        /* === CountDown === */
        if ($('.countdown').length > 0) {
            $(".countdown").countdown({
                date: "31 december 2017 12:00:00",
                format: "on"
            });
        }


        /* === magnificPopup === */
        if ($('.tt-lightbox').length > 0) {
            $('.tt-lightbox').magnificPopup({
                type: 'image',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                fixedContentPos: false
                // other options
            });
        }

        if ($('.popup-video').length > 0) {
            $('.popup-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }


        /* === Gallery Thumb Carousel === */
        if ($('.gallery-thumb').length > 0) {
            $('.gallery-thumb').flexslider({
                animation: "slide",
                controlNav: "thumbnails",
            });

        }

        /* === Circle Thumb Testimonial === */
        if ($('.circle-thumb').length > 0) {
            $('.circle-thumb').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        }

        /* === Square Thumb Testimonial === */
        if ($('.square-thumb').length > 0) {
            $('.square-thumb').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        }

        /* === Logo Thumb Testimonial === */
        if ($('.logo-thumb').length > 0) {
            $('.logo-thumb').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        }

        /* === Logo Thumb Right Testimonial === */
        if ($('.logo-thumb-right').length > 0) {
            $('.logo-thumb-right').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        }


        /* === Parallax Testimonial on agency demo === */
        if ($('.parallax-carousel').length > 0) {
            $('.parallax-carousel').flexslider({
                animation: "slide"
            });
        }


        /* === Quote Carousel === */
        if ($('.quote-carousel').length > 0) {

            $('.quote-carousel').owlCarousel({
                loop:true,
                autoHeight : true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    1000:{
                        items:1
                    }
                }
            });
        }


        /* === Featured item carousel === */
        if ($('.featured-carousel').length > 0) {

            $('.featured-carousel').owlCarousel({
                loop:true,
                margin:12,

                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:3
                    }
                }
            });
        }



        /* === SEO Featured Service carousel === */
        if ($('.seo-featured-carousel').length > 0) {

            $('.seo-featured-carousel').owlCarousel({
                loop:true,
                margin:30,

                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:4
                    }
                }
            });
        }




        /* === Latest Blog Carousel === */
        if ($('.blog-carousel').length > 0) {

            $('.blog-carousel').owlCarousel({
                loop:true,
                margin:26,

                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:3
                    }
                }
            });
        }




        /* === project carousel in digital agency demo === */
        if ($('.project-carousel').length > 0) {

            $('.project-carousel').owlCarousel({
                loop:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    1000:{
                        items:1
                    }
                }
            });
        }



        /* === career carousel in digital agency demo === */
        if ($('.career-carousel').length > 0) {

            $('.career-carousel').owlCarousel({
                loop:true,
                autoPlay:true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    1000:{
                        items:1
                    }
                }
            });
        }



        /* === blogGrid === */
        if ($('#blogGrid').length > 0) {

            var $grid = $('#blogGrid').imagesLoaded( function() {
              // init Masonry after all images have loaded
              $grid.masonry({
                itemSelector: '.blog-grid-item',
              });
            });
        }


        /* === Progress Bar === */
        $('.progress').on('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $.each($('div.progress-bar'),function(){
                    $(this).css('width', $(this).attr('aria-valuenow')+'%');
                });
                $(this).off('inview');
            }
        });



        /* ======= Contact Form ======= */
        $('#contactForm').on('submit',function(e){

            e.preventDefault();

            var $action = $(this).prop('action');
            var $data = $(this).serialize();
            var $this = $(this);

            $this.prevAll('.alert').remove();

            $.post( $action, $data, function( data ) {

                if( data.response=='error' ){

                    $this.before( '<div class="alert danger-border"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <i class="fa fa-times-circle"></i> '+data.message+'</div>' );
                }

                if( data.response=='success' ){

                    $this.before( '<div class="alert success-border"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><i class="fa fa-thumbs-o-up"></i> '+data.message+'</div>' );
                    $this.find('input, textarea').val('');
                }

            }, "json");

        });



        /* ======= Stellar for background scrolling ======= */
        if ($('.parallax-bg').length > 0) {
            $('.parallax-bg').imagesLoaded( function() {

            	$(window).stellar({
                    horizontalScrolling: false,
                    verticalOffset: 0,
                    horizontalOffset: 0,
                    responsive: true,
                    hideDistantElements: true
                });
            });
        }


        /* ======= shuffle js ======= */
        $(window).on('load', function () {

            $('.portfolio-container').each(function(i, e){

                var ttGrid = $(this).find('.portfolio');
                var self = this;
                ttGrid.shuffle({
                    itemSelector: '.portfolio-item' // the selector for the items in the grid
                });

                /* reshuffle when user clicks button filter item */
                $(this).find('.portfolio-filter li').on('click',function (e) {
                    e.preventDefault();

                    // set active class
                    $(self).find('.portfolio-filter li').removeClass('active');
                    $(this).addClass('active');

                    // get group name from clicked item
                    var ttGroupName = $(this).attr('data-group');

                    // reshuffle grid
                    ttGrid.shuffle('shuffle', ttGroupName);
                });

            });

        });


        /* ======= Portfolio Slider ======= */
        $(window).on('load', function () {

            if ($('.portfolio-slider').length > 0) {
                $('.portfolio-wrapper').each(function(i, e){

                    var ttPortfolio = $(this).find('.portfolio-slider');

                    var ttDirection = ttPortfolio.attr('data-direction');
                    
                    ttPortfolio.flexslider({
                        animation: "slide",
                        direction: ttDirection,
                        slideshowSpeed: 3000,
                        start:function(){
                            imagesLoaded($(".portfolio"),function(){
                                setTimeout(function(){
                                    $('.portfolio-filter li:eq(0)').trigger("click");
                                },500);
                            });
                        }
                    });

                });

            }    

        });


        /* ======= Portfolio Individual Gallery ======= */
        $('.portfolio-slider').each(function () { 
            var _items = $(this).find("li > a");
            var items = [];
            for (var i = 0; i < _items.length; i++) {
                items.push({src: $(_items[i]).attr("href"), title: $(_items[i]).attr("title")});
            }
            $(this).parent().find(".action-btn").magnificPopup({
                items: items,
                type: 'image',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                fixedContentPos: false,
                gallery: {
                    enabled: true
                }
            });
        });

    });


})(jQuery);


$(function () {
    var url = window.location.pathname; //sets the variable "url" to the pathname of the current window
    var activePage = url.substring(url.lastIndexOf('/') + 1); //sets the variable "activePage" as the substring after the last "/" in the "url" variable
        $('.primary-nav li a').each(function () { //looks in each link item within the primary-nav list
            var linkPage = this.href.substring(this.href.lastIndexOf('/') + 1); //sets the variable "linkPage" as the substring of the url path in each &lt;a&gt;
 
            if (activePage == linkPage) { //compares the path of the current window to the path of the linked page in the nav item
                $(this).parent().addClass('active'); //if the above is true, add the "active" class to the parent of the &lt;a&gt; which is the &lt;li&gt; in the nav list
            }
        });
});

  $(document).ready(function () {
    md.initSliders()
    demo.initFormExtendedDatetimepickers();
  });



(function () {
			var backTop = document.getElementsByClassName('js-cd-top')[0],
				// browser window scroll (in pixels) after which the "back to top" link is shown
				offset = 300,
				//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
				offsetOpacity = 1200,
				scrollDuration = 700
			scrolling = false;
			if (backTop) {
				//update back to top visibility on scrolling
				window.addEventListener("scroll", function (event) {
					if (!scrolling) {
						scrolling = true;
						(!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250): window.requestAnimationFrame(checkBackToTop);
					}
				});
				//smooth scroll to top
				backTop.addEventListener('click', function (event) {
					event.preventDefault();
					(!window.requestAnimationFrame) ? window.scrollTo(0, 0): scrollTop(scrollDuration);
				});
			}

			function checkBackToTop() {
				var windowTop = window.scrollY || document.documentElement.scrollTop;
				(windowTop > offset) ? addClass(backTop, 'cd-top--show'): removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
				(windowTop > offsetOpacity) && addClass(backTop, 'cd-top--fade-out');
				scrolling = false;
			}

			function scrollTop(duration) {
				var start = window.scrollY || document.documentElement.scrollTop,
					currentTime = null;

				var animateScroll = function (timestamp) {
					if (!currentTime) currentTime = timestamp;
					var progress = timestamp - currentTime;
					var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
					window.scrollTo(0, val);
					if (progress < duration) {
						window.requestAnimationFrame(animateScroll);
					}
				};

				window.requestAnimationFrame(animateScroll);
			}

			Math.easeInOutQuad = function (t, b, c, d) {
				t /= d / 2;
				if (t < 1) return c / 2 * t * t + b;
				t--;
				return -c / 2 * (t * (t - 2) - 1) + b;
			};

			//class manipulations - needed if classList is not supported
			function hasClass(el, className) {
				if (el.classList) return el.classList.contains(className);
				else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
			}

			function addClass(el, className) {
				var classList = className.split(' ');
				if (el.classList) el.classList.add(classList[0]);
				else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
				if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
			}

			function removeClass(el, className) {
				var classList = className.split(' ');
				if (el.classList) el.classList.remove(classList[0]);
				else if (hasClass(el, classList[0])) {
					var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
					el.className = el.className.replace(reg, ' ');
				}
				if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
			}
		})();


$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focusx")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
