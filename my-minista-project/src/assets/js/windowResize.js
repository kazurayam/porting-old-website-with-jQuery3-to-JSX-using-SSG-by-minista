// js/windowResize.js
import { $ } from '/src/assets/js/jquery-4.0.0.module.min.js'
$(function () {
    $(window).on('resize', function () {
        const w = $(window).width()
        const h = $(window).height()
        const dimension = w + ' x ' + h
        $('.myheader h1').text(dimension)
    }).trigger('resize');
});