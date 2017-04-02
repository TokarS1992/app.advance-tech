$.fn.delimiter = function(args) {
    var self = $(this);

    self.bind('click', function() {
        var this_type = $(this).attr('data-type');
        $('.service-item').removeClass('active_del non-active-del');

        $('.service-item').each(function(i) {

            var type_port = $(this).attr('data-type');
            if (this_type !== 'all') {
                if (this_type == type_port) {
                    $(this).addClass('active_del');
                } else {
                    $(this).addClass('non-active-del');
                }
            } else {
                $('.service-item').removeClass('active_del non-active-del');
            }
        });
    });
}

$('.types__item').delimiter();
