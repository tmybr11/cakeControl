
'use strict';

$(document).ready(function() {

    document.getElementById('price-input').addEventListener('keyup', function(e) { formatPrice(this, e); }, false)
    document.getElementById('price-input').addEventListener('focusout', function() { priceUnfocused(this); }, false);
    document.getElementById('return-button').addEventListener('click', function() { window.location.href = 'products.html'; }, false);
    document.getElementById('save-button').addEventListener('click', function() { insertProduct(); }, false);

});

function formatPrice(input, event) {

    var value = input.value.replace(',', '.');

    if(value.includes('.') && value.substring(value.indexOf('.') + 1).length > 2) {

        value = parseFloat(Math.round(value * 100) / 100).toFixed(2);

    }

    input.value = value;

}

function priceUnfocused(input) {

    var value = input.value;

    value = parseFloat(Math.round(value * 100) / 100).toFixed(2);

    input.value = value;

}

function insertProduct() {

    $.ajax({

        url: 'http://vps3647.publiccloud.com.br:82/products.php',
        method: 'post',
        data: {
            'mode': 5,
            'product_name': document.getElementById('name-input').value,
            'product_price': document.getElementById('price-input').value,
            'product_stock': document.getElementById('stock-input').value
        }

    }).done(function(data) {

        data = $.parseJSON(data);

        if(data) {

            window.location.href = 'products.html';

        } else {

            alert('Não foi possível inserir este produto, tente novamente mais tarde.');

        }

    }).fail(function() {

        alert('Não foi possível inserir este produto, tente novamente mais tarde.');

    });

}