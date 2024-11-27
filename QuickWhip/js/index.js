var carouselWidth = $('.carousel-inner')[0].scrollWidth;
var cardWidth = $('.carousel-item').width();

var scrollPosition = 0;
$('.carousel-control-next').on('click', function(){
console.log('next');
scrollPosition = scrollPosition + cardWidth;
$('.carousel-inner').animate({scrollleft: scrollPosition}, 600)
});
scrollPosition = scrollPosition + cardWidth;
