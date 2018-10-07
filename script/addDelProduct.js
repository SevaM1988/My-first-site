'use strict';

$(document).ready(function () {

$.getJSON('products.json', function (item) {

});

$('.fa-times-circle').on('click', function () {
    var idProduct = parseInt($(this).attr('data-id'));

    basket.remove(idProduct);
});
});