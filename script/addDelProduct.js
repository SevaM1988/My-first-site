'use strict';

$('.buy_pr').on('click', function () {
    var idProduct = 'MANGO PEOPLE T-SHIRT';
    var quantity = 1;
    var price = '$' + 52.00;

    basket.add(idProduct, quantity, price);
});

$('.fa-times-circle').on('click', function () {
    var idProduct = parseInt($(this).attr('data-id'));

    basket.remove(idProduct);
});