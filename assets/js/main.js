/*
 *
 * JS Script
 * @ThemeEaster
 */
(function($) {
    "use strict";

    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    $(document).ready(function() {

        /*=============================================================
        Header Activation
        ==============================================================*/
        var primaryHeader = $('.primary-header'),
            headerClone = primaryHeader.clone();
        $('.header').after('<div class="sticky-header"></div>');
        $('.sticky-header').append(headerClone);
        var headerSelector = document.querySelector(".sticky-header");
        var triggerPoint = $('.header').height();
        var yOffset = 0;

        $(window).on('scroll', function () {
            yOffset = $(window).scrollTop();
            if (yOffset >= triggerPoint) {
                $('.sticky-header').addClass('sticky-fixed-top');
            } else {
                $('.sticky-header').removeClass('sticky-fixed-top');
            }
        });

        if ($('.primary-header').length) {
            $('.header .primary-header .burger-menu').on("click", function () {
                $(this).toggleClass('menu-open');
                $('.header .header-menu-wrap').slideToggle(300);
            });

            $('.sticky-header .primary-header .burger-menu').on("click", function () {
                $(this).toggleClass('menu-open');
                $('.sticky-header .header-menu-wrap').slideToggle(300);
            });
        }

        $('.header-menu-wrap ul li:has(ul)').each(function () {
            $(this).append('<span class="dropdown-plus"></span>');
            $(this).addClass('dropdown_menu');
        });

        $('.header-menu-wrap .dropdown-plus').on("click", function () {
            $(this).prev('ul').slideToggle(300);
            $(this,).toggleClass('dropdown-open');
            $('.header-menu-wrap ul li:has(ul)').toggleClass('dropdown-open');
        });

        $('.header-menu-wrap .dropdown_menu a').append('<span></span>');

        // Responsive Classes
        function responsiveClasses() {
            var body = $('body');
            if ($(window).width() < 992) {
                body.removeClass('viewport-lg');
                body.addClass('viewport-sm');
            } else {
                body.removeClass('viewport-sm');
                body.addClass('viewport-lg');
            }
        }

        // Transparent Header
        function transparentHeader(){
            if($('body').hasClass('header-3')){
                var stickyHeader = $('.header-3 .header .header-logo'),
                    stickyHeaderLogo = stickyHeader.data('sticky-logo');
                if('' != stickyHeaderLogo){
                    $(".header-3 .sticky-header .header-logo img").attr('src',stickyHeaderLogo);
                }
            }
            var header = $('.header.header-three'),
                headerHeight = header.height(),
                pageHeader = $('.page-header');
            pageHeader.css('padding-top', headerHeight + 'px');
        }

        //responsiveClasses();
        $(window).on("resize", function () {
            responsiveClasses();
            transparentHeader();
            toggleLanguageRow();
        }).resize();

        function toggleLanguageRow(){
            if ($(window).width() >= 992) {
                $('#responsiveLang').addClass('myHidden')
                $('#responsiveLangReverse').removeClass('myHidden')

            }else{
                $('#responsiveLang').removeClass('myHidden')
                $('#responsiveLangReverse').addClass('myHidden')

            }
        }

        /* ========== Popup Search Box ========== */
        $(function () {
            $('#dl-popup-search-box').removeClass('toggled');

            $('.dl-search-icon').on('click', function (e) {
                e.stopPropagation();
                $('#dl-popup-search-box').toggleClass('toggled');
                $("#popup-search").focus();
            });

            $('#dl-popup-search-box input').on('click', function (e) {
                e.stopPropagation();
            });

            $('#dl-popup-search-box, body').on('click', function () {
                $('#dl-popup-search-box').removeClass('toggled');
            });
        });

        // Header BTN Effect
        $('.header-btn').on('mouseenter', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top: relY, left: relX})
        }).on('mouseout', function (e) {
            var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            $(this).find('span').css({top: relY, left: relX})
        });

        /*=============================================================
        Vanobox Activation
        ==============================================================*/
         $('.venobox').venobox({
             spinner: 'spinner-pulse',
         });

        /*=============================================================
        Scroll to Top
        ==============================================================*/
        var scrollTop = $("#scroll-top");
        $(window).on('scroll', function() {
            var topPos = $(this).scrollTop();
            if (topPos > 100) {
                $('#scrollup').removeClass('hide');
                $('#scrollup').addClass('show');

            } else {
                $('#scrollup').removeClass('show');
                $('#scrollup').addClass('hide');
            }
        });

        $(scrollTop).on("click", function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        /*=============================================================
        Main Slider
        ==============================================================*/
        $('#main-slider').on('init', function(e, slick) {
            var $firstAnimatingElements = $('div.single-slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        $('#main-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
                  var $animatingElements = $('div.single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                  doAnimations($animatingElements);
        });
        $('#main-slider').slick({
           autoplay: true,
           autoplaySpeed: 10000,
           dots: true,
           fade: true,
           prevArrow: '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
                nextArrow: '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>'
        });
        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationDuration = $this.data('duration');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay,
                    'animation-duration': $animationDuration,
                    '-webkit-animation-duration': $animationDuration
                });
                $this.addClass($animationType+' element').one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }

        /*=============================================================
        Odometer
        ==============================================================*/
        $('.odometer').waypoint(
            function() {
                var odo = $(".odometer");
                odo.each(function() {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            }, {
                offset: "80%",
                triggerOnce: true
            }
        );

        /*=============================================================
        Hover Effect
        ==============================================================*/
        $(' .service-items .service-item, .project-carousel .project-item, .portfolio-items .portfolio-item, .project-items .project-item').each(function() {
            $(this).hoverdir();
        });

        /*=============================================================
        Team Hover Effect
        ==============================================================*/
        $('.team-items .team-item').each(function() {
            $(this).on('mouseenter', function() {
                if ($(this).data('name')) {
                    let name = $(this).data('name')
                    let position = $(this).data('position')
                    if($(window).width() >= 992) {
                        $('.team-info').html('<span class="name reveal-text-2">' + $(this).data('name') + '</span>' + '<span class="position reveal-text-2">' + $(this).data('position') + '</span>');

                        $('.description_Text').html(`
                        <p>
                        <h3>${name}</h3>
                        <h4>${position}</h4>
                        <p>
                        Julie is a Wellbeing Consultant, Leonardo 3-4-5 facilitator, Spa Educator, registered nutritional therapist and qualified holistic therapist specialising in anti-stress modalities. She has more than 30 years of experience in the design and delivery of training programmes across a broad spectrum of topics.  Her particular field of interest is related to wellness in the workplace, lifestyle and healthy aging. In addition to running her own private practice she has provided specialist consultancy services to international skin care and lifestyle brands, hotels, spas, beauty salons and companies looking to bring more wellness into the workplace.
                        She is really passionate about education and has a great interest in human behaviour and the power of educating people in self-awareness and effective communication, helping them to realise their potential.  She is regarded as an accomplished facilitator/mediator.
                        She is committed daily to working on innovative ways to stimulate and help those she works with to discover new ways of working and takes great delight in watching them open and grow.
                        Her 30+ years of professional experience in working and motivating people in diverse sectors and multi-cultural environments enables her to look at things from different perspectives to offer creative solutions and enriching learning opportunities.
                        She prides herself on being able to develop long-lasting and meaningful relationships with those she works with, supporting them with specially tailored programmes to meet their needs.  In addition to this she enjoys the opportunity to build new relationships whilst learning about their business needs and strategies.  This allows her not only to offer training but also to help with business solutions.
                        She is a strong advocate of Continuing Professional Development and to this end constantly keeps herself updated in all areas related to workplace wellbeing, lifestyle aging, diet, exercise, supplementation, stress management, mental health.  She chose these particular areas of specialisation as she believes that to be truly well in all aspects of one’s life you need to have an integrated approach and therefore a better understanding of the human mind/body connection and the effects of lifestyle choices and external factors have on our health and wellbeing.
                        
                        
                        
                                        </p>
                                        </p>
                                        `)
                        $('.description_Text').addClass('myVisible')
                        $(document).on('mousemove', function(e) {
                            $('.team-info').css({
                                left: e.clientX - 10,
                                top: e.clientY + 25
                            });
                        });
                    }else{
                        $('.team-info').html(`
                        <span class="name reveal-text-2"> ${$(this).data('name')} | ${$(this).data('position')}</span>
                        <div class="position reveal-text-2">
                        Yves Miserez is an energetic and influential leadership coach and leadership development expert.

                        With over 20 years of experience in group facilitation, Yves has contributed to the personal and professional growth of thousands of professionals.
                        
                        Benefitting from his background in operational and quality management, Yves has led change management projects in over 15 countries. He is passionate about helping individuals and groups, both online and offline, to lead teams and effectively communicate with different kinds of stakeholders. He is certified in the LP³-leadership development model, strategic roll-out and is also a certified trainer and coach in the Leonardo 3-4-5 model
                        
                        Yves is appreciated for his balance between the ‘head, heart and hands’ approach when bringing the message across. As a Positive Leadership and Accelerated Learning certified practitioner, he challenges the status quo.
                        
                        He is also a ‘boots in the mud’ change management consultant, aiming for operational excellence. He does so by aligning the C-Suite objectives with the day-to-day operational activities.
                        
                        Yves works with large, medium size organizations and SMEs and has expertise in the (financial) services, industry and government sectors.
                        
                        Yves working languages are Dutch, French and English.
                        </div>
                        `);
                        $(document).on('mousemove', function(e) {
                            console.log($(this))
                            $('.team-info').css({
                                left: e.clientX - 10,
                                top: e.clientY + 25
                            });
                        });
                    }

                    $('.team-info').addClass('visible');
                }

                
            }).on('mouseleave', function() {
                $('.team-info').removeClass('visible');
                $('.description_Text').removeClass('myVisible')
            });
        });

        /*=============================================================
        WOW JS Active
        ==============================================================*/
        new WOW().init();

        /*=============================================================
        Splitting JS Active
        ==============================================================*/
        Splitting();

        /*=============================================================
        Nice Select JS Active
        ==============================================================*/
        $('select').niceSelect();

        /*=============================================================
        Project Carousel
        ==============================================================*/
        $('.project-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<i class="las la-arrow-left left"></i>',
            nextArrow: '<i class="las la-arrow-right right"></i></i>',
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        /*=============================================================
        Project Details
        ==============================================================*/
        $('.project-details-carousel').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<i class="las la-arrow-left left"></i>',
            nextArrow: '<i class="las la-arrow-right right"></i></i>',
            infinite: true,
            dots: false,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        /*=============================================================
        ISOTOP Active
        ==============================================================*/
        $('.portfolio-items').imagesLoaded( function() {

             // Add isotope click function
            $('.portfolio-filter li').on( 'click', function(){
                $(".portfolio-filter li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr('data-filter');
                $(".portfolio-items").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });

            $(".portfolio-items").isotope({
                itemSelector: '.single-item',
                layoutMode: 'masonry',
            });
        });

        /*=============================================================
        Testimonial Carousel
        ==============================================================*/
        $('.testimonials-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<i class="las la-arrow-left left"></i>',
            nextArrow: '<i class="las la-arrow-right right"></i></i>',
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        /*=============================================================
        Testimonial Carousel 02
        ==============================================================*/
       $('.testimonials-carousel-2').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<i class="las la-arrow-left left"></i>',
            nextArrow: '<i class="las la-arrow-right right"></i></i>',
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        /*=============================================================
        Testimonial Carousel 03
        ==============================================================*/
       $('.testimonials-carousel-3').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
           arrows: false,
            infinite: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: true,
        });

        // Custom carousel nav
        $('.testi-controls .prev').on( 'click', function(){
            $('.testimonials-carousel-3').slick('slickPrev');
        });

        $('.testi-controls .next').on( 'click', function(e){
            e.preventDefault();
            $('.testimonials-carousel-3').slick('slickNext');
        });

        /*=============================================================
        Sponsor Carousel
        ==============================================================*/
        $('.sponsor-carousel').slick({
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            dots: false,
            arrows: true,
            prevArrow: '<i class="las la-arrow-left left"></i>',
            nextArrow: '<i class="las la-arrow-right right"></i></i>',
            loop: true,
            pauseOnFocus: false,
            pauseOnHover: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        });

        /*=============================================================
        Subscribe Mailchimp
        ==============================================================*/
        if ($('.subscribe_form').length > 0) {
            /*  MAILCHIMP  */
            $('.subscribe_form').ajaxChimp({
                language: 'es',
                callback: mailchimpCallback,
                url: "//alexatheme.us14.list-manage.com/subscribe/post?u=48e55a88ece7641124b31a029&amp;id=361ec5b369"
            });
        }

        function mailchimpCallback(resp) {
            if (resp.result === 'success') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-success').text(resp.msg).fadeIn();
                $('.subscription-error').fadeOut();

            } else if (resp.result === 'error') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-error').text(resp.msg).fadeIn();
            }
        }
        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: 'We have sent you a confirmation email',
            1: 'Please enter your email',
            2: 'An email address must contain a single @',
            3: 'The domain portion of the email address is invalid (the portion after the @: )',
            4: 'The username portion of the email address is invalid (the portion before the @: )',
            5: 'This email address looks fake or invalid. Please enter a real email address'
        };

        /*===== Copyright =====*/
        var currentYear  = new Date().getFullYear();
        $('#currentYear').append(currentYear);

    });

})(jQuery);
