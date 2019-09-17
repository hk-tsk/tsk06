// $(document).ready(function() {
//     var $dashOffset = $(".path").css("stroke-dashoffset");
  
//     $(window).on('scroll', function () {     
//       var $percentageComplete = (($(window).scrollTop()/($("html").height()-$(window).height()))*100);    
//       var $newUnit = parseInt($dashOffset, 10); 
//       var $offsetUnit = $percentageComplete * ($newUnit / 100);
//       $(".path").css("stroke-dashoffset", $newUnit - $offsetUnit);
//     });
  
//   });

//   /////////////////////////////

//   $(document).ready(function() {
//     // set the revealOnScroll function to run when we scroll the page
//     var $window = $(window);
//     $window.on('scroll', revealOnScroll);
    
//     function revealOnScroll() {
//       var scrolled = $window.scrollTop(),
//       win_height_padded = $window.height() * 1.1;
    
//       // Animation is showing...
//       $("path.revealOnScroll:not(.animated)").each(function () {
//         var $this = $(this);
//         var offsetTop = $this.offset().top;
    
//         // Add the animated class to trigger the animation
//         if (scrolled + win_height_padded > offsetTop) {
//           $this.addClass('animated');
//         }
//       });
//     }
    
//     revealOnScroll(); // Call the reavealOnScroll when the page is ready
//     });

//     ///////////////////////////////

//     $(document).ready(function() {
//         var $window = $(window);
//         $window.on('scroll', revealOnScroll);
    
//         function revealOnScroll() {
//           var scrolled = $window.scrollTop(),
//           win_height_padded = $window.height() * 1.1;
    
//           // Is animation showing?
//           $(".revealOnScroll:not(.animated)").each(function () {
//             // animation scrolled into view
//             var $this = $(this);
//             var offsetTop = $this.offset().top;
    
//             // Add the animated class to trigger the animation
//             if (scrolled + win_height_padded > offsetTop) {
//               $this.addClass('animated');
//             }
//           });
//         }
    
//         initAnimations(); // Start the initiation for the animations
//         revealOnScroll(); // Call the revealOnScroll when the page is ready
//       });
