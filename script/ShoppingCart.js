'use strict';

function Basket(idBasket) {
    Container.call(this, idBasket);

    // Свойства для каждого товара
    this.countGoods = 0; // Общее кол-во товаров
    this.amountGoods = 0; // Общая стоимость товаров
    this.basketItems = []; // Массив для хранения товаров
    this.collectBasketItems(); // Получение товаров
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

/**
 * Метод получения/загрузки товаров.
 */

Basket.prototype.collectBasketItems = function () {
    var appendId = '#' + this.id + '_items';

    $.get({
        url: './basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var $basketData = $('<div />', {
                id: 'basketData'
            });

            this.countGoods = data.basket.length;
            this.amountGoods = data.amount;


            $basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
            $basketData.append('<p>Общая сумма: ' + this.amountGoods + '</p>');

            $basketData.appendTo(appendId);

            for(var itemKey in data.basket)
            {
                this.basketItems.push(data.basket[itemKey]);
            }
        }
    });
};

/**
 * Метода добавления товара в корзину.
 * @param idProduct
 * @param quantity
 * @param price
 */

Basket.prototype.add = function (idProduct, quantity, price) {
    var basketItems = {
        "idProduct": idProduct,
        "price": price
    };

    for (var i = 1; i <= quantity; i++) {
        this.countGoods++;
    }

    this.amountGoods += price;
    this.basketItems.push(basketItems);
    this.refresh(); // Перерисовываем корзину
};

/**
 * Метод удаления товаров.
 * @param idProduct
 */

Basket.prototype.remove = function (idProduct) {
    for (var i = 0; i < this.basketItems.length; i++) {
        if ((this.basketItems[i].idProduct === idProduct) && (this.amountGoods !== 0)) {
            this.amountGoods -= this.basketItems[i].price;
            this.countGoods--;
        }
    }

    this.refresh();

};

/**
 * Метод обновления корзины.
 */

Basket.prototype.refresh = function () {
    var $basketDataDiv = $('#basketData');
    $basketDataDiv.empty(); // Очищаем содержимое контейнера
    $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('<p>Общая сумма: ' + this.amountGoods + '</p>');
};