jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // For visibility of a live logo
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
       $('#boardwalklogo').addClass('logo-icon-show');
      $('#boardwalklogo').removeClass('logo-icon-hide');
    } else {
       $('#boardwalklogo').removeClass('logo-icon-show');
      $('#boardwalklogo').addClass('logo-icon-hide');
    }
});

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5},
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })
});

// // To change the active class on the navbar - NOT WORKED!!!
// window.onscroll = () => {
//   var current = "";

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     if (pageYOffset >= sectionTop ) {
//       current = section.getAttribute("id"); }
//   });
//   console.log(current);

//   navLi.forEach((li) => {
//     li.classList.remove("active");
//     if (li.classList.contains(current)) {
//       li.classList.add("active");
//     }
//   });
// };

// // Another attempt to change the active class on the navbar

// const sections = document.querySelectorAll("section[id]");

// // console.log(sections);

// // Add an event listener listening for scroll
// window.addEventListener("scroll", navHighlighter);

// function navHighlighter() {
  
//   // Get current scroll position
//   let scrollY = window.pageYOffset;
  
//   // Now we loop through sections to get height, top and ID values for each
//   sections.forEach(current => {
//     // console.log(current);
//     const sectionHeight = current.offsetHeight;
//     const sectionTop = current.offsetTop - 50;
//     sectionId = current.getAttribute("id");

//     console.log(sectionId);
    
//     /*
//     - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
//     - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
//     */
//     if (
//       scrollY > sectionTop &&
//       scrollY <= sectionTop + sectionHeight
//     ){
//       document.querySelector(".nav-menu-container a[href*=" + sectionId + "]").classList.add("active");
//     } else {
//       document.querySelector(".nav-menu-container a[href*=" + sectionId + "]").classList.remove("active");
//     }
//   });
// }

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
 
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
 
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
              console.log(links);
                links.classList.remove('active');
                document.querySelector('header nav ul li a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};