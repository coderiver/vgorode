function fromString(val) {
    var parts = val.split(',');
    return [parseFloat(parts[0]), parseFloat(parts[1])];
}

function getUrlParam (name, location){
	location = location || window.location.hash;
	var res = location.match(new RegExp('[#&]' + name + '=([^&]*)', 'i'));

	return (res && res[1] ? res[1] : '');
}

function getBounds(coords) {
    var result = [[999, 999], [0, 0]], i, l;
    for (i = 0, l = coords.length; l; --l, ++i) {
        result[0][0] = Math.min(result[0][0], coords[i][0]);
        result[0][1] = Math.min(result[0][1], coords[i][1]);
        result[1][0] = Math.max(result[1][0], coords[i][0]);
        result[1][1] = Math.max(result[1][1], coords[i][1]);

    }
    return result;
}

$.fn.scrollableAddClones = function(addItems) {
    // grab scrollable plugin
    var scrollable;
    if (!(scrollable = $(this).data('scrollable')) || !scrollable.getConf().circular)
    return;
    // grab scrollable elements and remember it's count
    var nodes = scrollable.getItems();
    var length = nodes.length;

    // grab class for the nodes
    var clonedClass = scrollable.getConf().clonedClass;
    // get wrap object to append the clones to
    var wrap = scrollable.getItemWrap();
    // fill as much nodes as needed for 500 pixels
    if (!addItems) addItems = Math.ceil(500 / nodes.eq(1).width());
    // create fake container to add the clones to (max 15 clones)
    var newNodesAppend = $('<span />');
    for (var i = 1; i <= (addItems < 15 ? addItems : 15); i++)
    nodes.eq(i % length).clone().addClass(clonedClass).appendTo(newNodesAppend);
    // insert HTML
    newNodesAppend.children().appendTo(wrap);
}

jQuery.fn.hint = function() {
    return this.each(function() {
        var t = jQuery(this);
        var title = t.attr('title');
        if (title) {
            t.blur(function() {
                if (t.val() == '') {
                    t.val(title);
                    t.addClass('blur');
                }
            });
            t.focus(function() {
                if (t.val() == title) {
                    t.val('');
                    t.removeClass('blur');
                }
            });
            t.blur();
        }
    });
}

$(document).ready(function () {

    // k-scrollable init
    $(".k-caro").scrollable({
        speed: 400,
        next: ".k-caro-next",
        prev: ".k-caro-prev",
        circular: true,
        onBeforeSeek: function (event, index) {
            var el = $(".k-caro img:eq(" + (index + 6) + ")");
            if ($(el).hasClass("lzl") && $(el).attr("src") == "/v2/i/blank.gif")
                $(el).attr("src", $(el).attr("data-href")).unbind("appear").removeClass("lzl");
        }
    });


    //Fixing scrollable bug (of scrollable.js not used - this is useless)
    // Get the Scrollable control
    var scrollable = jQuery(".k-caro").data("scrollable");
    // Set to the number of visible items
    var size = 6;

    if (scrollable != null)
        scrollable.seekTo($('.k-caro .active').index(), 0);

    if ($('.k-caro .active').index() == 0)
        $('#k-currentslide').text(1);
    else
        $('#k-currentslide').text($('.k-caro .active').index());

    // Handle the Scrollable control's onSeek event
    if (scrollable) {
        scrollable.onSeek(function (event, index) {
            // Check to see if we're at the end
            if (this.getIndex() >= this.getSize() - size) {
                // Disable the Next link
                jQuery(".k-caro-next").addClass("disabled");
            }
        });


        // Handle the Scrollable control's onBeforeSeek event
        scrollable.onBeforeSeek(function (event, index) {
            // Check to see if we're at the end
            if (this.getIndex() >= this.getSize() - size) {
                // Check to see if we're trying to move forward
                if (index > this.getIndex()) {
                    // Cancel navigation
                    return false;
                }
            }
        });
    }

    setInterval(function () {
        nextt = $('.rotate:visible').next();
        if (nextt.attr('style') == undefined) {
            nextt = $('.rotate').eq(0);
        }
        $('.rotate:visible').hide();
        nextt.show();
    }, 3000);

    $(".r-caro").scrollable({
        speed: 800,
        circular: true,
        onBeforeSeek: function (event, index) {
            if (index > 0) {
                $(".r-caro img").each(function (i) {
                    if ($(this).hasClass("lzl") && $(this).attr("src") == "/v2/i/blank.gif")
                        $(this).attr("src", $(this).attr("data-href")).unbind("appear").removeClass("lzl");
                });

//                for (var i = 0; i < 4; i++) {
//                    var el = $(".r-caro img:eq(" + (index * 4 + i) + ")");
//                    if ($(el).hasClass("lzl") && $(el).attr("src") == "/v2/i/blank.gif")
//                        $(el).attr("src", $(el).attr("data-href")).unbind("appear").removeClass("lzl");
//                }
            }


        }
    });
    $(".r-caro").scrollableAddClones();

    $('input[title!=""],textarea[title!=""]').hint();
});

////usNewsTab - BEGIN switcher
//$(document).ready(function() {
//    $(".s-switcher .s-vk a").click(function() {
//        if (!$(this).hasClass("active")) {

//            $(".s-switcher .s-fb a").removeClass("active");
//            $("#pop").addClass("hid");
//            !$(this).addClass("active");
//            $("#read").removeClass("hid");
//        }
//    });
//    $(".s-switcher .s-fb a").click(function() {
//        if (!$(this).hasClass("active")) {

//            $(".s-switcher .s-vk a").removeClass("active");
//            $("#read").addClass("hid");
//            !$(this).addClass("active");
//            $("#pop").removeClass("hid");
//        }
//    });
//});
////usNewsTab - END switcher

function SetSearch(value, id, text, sid, isRefsearch) {
    $("#" + id).val(value);
    $("#" + sid).text(text);

    var referenceSearchClass = $("#" + id).parent().parent().find('.referencesearch')
    var defaultSearchClass = $("#" + id).parent().parent().find('.defaultsearch');

    var inputRefElement = $(referenceSearchClass).find('input.search-keyword');
    var inputDefaultElement = $(defaultSearchClass).find('input.search-keyword');

    if (isRefsearch.toLowerCase() == 'true') {
        if (value == 24) {
            $(defaultSearchClass).css({ 'display': 'none' });
            $(referenceSearchClass).css({ 'display': 'block' });

            $(inputRefElement).val($(inputDefaultElement).val());
        }
        else {
            $(referenceSearchClass).css({ 'display': 'none' });
            $(defaultSearchClass).css({ 'display': 'block' });

            $(inputDefaultElement).val($(inputRefElement).val());
        }
    }
}

//ucAfishaSchedule.ascx
function initAfishaDatePicker(date) {
    $(".sched-calendar input").datepicker({
        showOn: "button",
        buttonImage: "v2/i/date.png",
        buttonImageOnly: true,
        onSelect: function (dateText, inst) {
            window.location.href = decodeURIComponent($(".sched-title input").val()).replace('{{0}}', dateText.replace('.', '').substring(0, 4)).replace(/[\d]+\.[\d]+\.[\d]+/g, dateText);
        },
        beforeShowDay: selectAfishaDays
    });

    jQuery(function($) {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '',
            nextText: '',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
    });

    $(".sched-calendar input").datepicker("setDate", date);
}

//ucTestAlone.ascx
function validate_answer() {
    var flag = false;
    $("input[name='question_0']").each(function (index) {
        if (!flag) {
            flag = $(this).attr('checked');
        }
    });
    return flag;
}


$(document).ready(function () {
    if ($('.scrollable.selected-news').length != 0) {
        $('.scrollable.selected-news').tinyscrollbar({ sizethumb: 245, size: 533 });
    }

    if ($('.scrollable.g-side').length != 0) {
        var oScrollbar = $('.scrollable.g-side');
        oScrollbar.tinyscrollbar({ sizethumb: 245, size: 500 });
    }

    if ($('.scrollable.ver2.g-side').length != 0) {
        var oScrollbar = $('.scrollable.ver2.g-side');
        oScrollbar.tinyscrollbar({ sizethumb: 245, size: 564 });
    }

    if ($('.scrollable.ver2_600.g-side').length != 0) {
        var oScrollbar = $('.scrollable.ver2_600.g-side');
        oScrollbar.tinyscrollbar({ sizethumb: 245, size: 600 });
    }

    $('.s-switcher a').click(function () {
        $('.s-switcher a').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    $('.s-switcherUnique a').click(function () {
        $('.s-switcherUnique a').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    $('.cat dt').click(function () {
        if ($(this).parent().find('dd').css('display') == 'block') {
            $(this).parent().find('dd').slideToggle(500, function () { oScrollbar.tinyscrollbar_update('relative'); });
        }

        else {
            $(this).parent().parent().find('dl.cat-active li a').removeClass('active');
            $(this).parent().parent().find('dl.cat-active').removeClass('cat-active');
            $(this).parent().addClass('cat-active');

            $(this).parent().parent().find('dd').filter(function () { return this.style.display == 'block' }).slideToggle(500, function () { oScrollbar.tinyscrollbar_update('relative'); });
            $(this).next().slideToggle(500, function () { oScrollbar.tinyscrollbar_update('relative'); });

            if ($(this).parent().hasClass('cat-active')) {

                $(this).parent().find('li a').removeClass('active');

                $(this).parent().find('li').click(function () {
                    $(this).parent().find('li a').removeClass('active');
                    $(this).find('a').addClass('active');
                });
            }
        }
    });

    $('.cat-active dd li').click(function () {
        $(this).parent().find('li a').removeClass('active');
        $(this).find('a').addClass('active');
    });

    $('dl.cat a').click(function () {
        if (document.location.hash) {
            document.location.hash = '';
        }
    });

});