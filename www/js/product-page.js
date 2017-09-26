
'use strict';

$(document).ready(function() {

    document.getElementById('price-input').addEventListener('keyup', function(e) { formatPrice(this, e); }, false)
    document.getElementById('price-input').addEventListener('focusout', function() { priceUnfocused(this); }, false);
    document.getElementById('delete-button').addEventListener('click', function() { deleteProduct(); }, false);
    document.getElementById('save-button').addEventListener('click', function() { updateProduct(); }, false);

	$.ajax({

		url: 'http://vps3647.publiccloud.com.br:82/products.php',
		method: 'get',
		data: {
			'mode': 2,
            'id': window.localStorage.getItem('PRODUCT_ID')
		}

	}).done(function(data) {      

        data = $.parseJSON(data);

        if(data !== null) {

            document.getElementsByTagName('span')[0].innerHTML = data.name;
            document.getElementById('name-input').value = data.name;
            document.getElementById('price-input').value = data.price;

        } else {

            alert('Produto inexistente!');

        }

    }).fail(function() {

        alert('Erro ao carregar os produtos, tente novamente mais tarde.');

    });

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

function deleteProduct() {

    $.ajax({

        url: 'http://vps3647.publiccloud.com.br:82/products.php',
        method: 'post',
        data: {
            'mode': 3,
            'id': window.localStorage.getItem('PRODUCT_ID')
        }

    }).done(function(data) {       

        data = $.parseJSON(data);

        if(data) {

            window.location.href = 'products.html';

        } else {

            alert('Não foi possível remover este produto, tente novamente mais tarde.');

        }

    }).fail(function() {

        alert('Não foi possível remover este produto, tente novamente mais tarde.');

    });

}

function updateProduct() {

    $.ajax({

        url: 'http://vps3647.publiccloud.com.br:82/products.php',
        method: 'post',
        data: {
            'mode': 4,
            'id': window.localStorage.getItem('PRODUCT_ID'),
            'product_name': document.getElementById('name-input').value,
            'product_price': document.getElementById('price-input').value
        }

    }).done(function(data) {       

        data = $.parseJSON(data);

        if(data) {

            window.location.href = 'products.html';

        } else {

            alert('Não foi possível atualizar os dados deste produto, tente novamente mais tarde.');

        }

    }).fail(function() {

        alert('Não foi possível atualizar os dados deste produto, tente novamente mais tarde.');

    });

}