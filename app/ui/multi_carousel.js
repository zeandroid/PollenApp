
app.ui.MultiCarousel = (function ($) {

    var $el;

    var init = function () {
        // Get carousel items
        var $items = $el.find('.item');

        // Add the multi carousel class
        $el.addClass('multi-carousel');

        // Adds extra carousel slides to active slide
        addExtraCarouselItems($items);
    };

    var addExtraCarouselItems = function ($items) {
        $items.each(function () {
            var $originalItem = $(this);
            var $next = appendCarouselItem($originalItem.next(), $originalItem);
            appendCarouselItem($next.next(), $originalItem);
        });
    };

    var appendCarouselItem = function ($item, $originalItem) {
        if (!$item.length) {
            $item = $originalItem.siblings(':first');
        }

        $item.children(':first-child').clone().appendTo($originalItem);

        return $item;
    };

    var MultiCarousel = function ($element) {
        $el = $element;

        init();
    };

    return MultiCarousel;
})(window.jQuery);
