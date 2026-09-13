// js/windowResize.js
import { $ } from 'jquery'

function waitForJquery(callback) {
    const intervalId = setInterval(() => {
        if (typeof($) !== 'undefined') {
            clearInterval(intervalId);
            console.log('cleared the interval');
            callback();
        } else {
            console.log('waiting for $ to be defined')
        }
    }, 100); // Check every 1000ms
}

waitForJquery(() => {
    $(function () {
        $(window).on('resize', function () {
            const w = $(window).width()
            const h = $(window).height()
            const dimension = w + ' x ' + h
            console.log(dimension)
            $('.myheader h1').text(dimension)
        }).trigger('resize');
    });
});