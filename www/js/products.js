
'use strict';

$(document).ready(function () {

    document.getElementById('add-button').addEventListener('click', function () {
        window.location.href = 'new-product.html';
    }, false);
    document.getElementById('return-button').addEventListener('click', function () {
        window.location.href = 'menu.html';
    }, false);

    $.ajax({

        url: 'http://vps3647.publiccloud.com.br:82/products.php',
        method: 'get',
        data: {
            'mode': 1
        }

    }).done(function (data) {

        var str = '';

        data = $.parseJSON(data);

        for (var i = 0; i < data.length; i++) {

            var price = data[i].price.toString().replace('.', ',');

            str += '<li class="td-valign-wrapper product-item" data-id="' + 
                    data[i].id + '"><span class="name">' + 
                    data[i].name + '</span><span class="stock"><i class="fa fa-cubes"></i>&nbsp;' + 
                    data[i].stock + '</span><span class="price">R$ ' + 
                    price + '</span><span class="chevron"><i class="fa fa-pencil-square-o"></i></span></li>';

        }

        document.getElementById('products-list').innerHTML = str;

        var products = document.getElementsByClassName('product-item');

        for (var i = 0; i < products.length; i++) {

            products[i].addEventListener('click', function () {
                this.style.backgroundColor = '#eee';
                openPage(this.getAttribute('data-id'));
            }, false);

        }

    }).fail(function () {

        alert('Erro ao carregar os produtos, tente novamente mais tarde.');

    });

});

function openPage(product) {

    window.localStorage.setItem('PRODUCT_ID', product);
    window.location.href = 'product-page.html';

}