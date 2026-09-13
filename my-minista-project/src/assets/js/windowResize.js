// js/windowResize.js
import { $ } from 'jquery'

$(function () {
    $(window).on('resize', function () {
        const w = $(window).width()
        const h = $(window).height()
        const dimension = w + ' x ' + h
        $('.myheader h1').text(dimension)
    }).trigger('resize');
});