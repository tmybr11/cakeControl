
'use strict';

$(document).ready(function() {

    var buttons = document.getElementsByTagName('button');

    for(var i = 0; i < buttons.length; i++) {
        
        buttons[i].addEventListener('click', function() { buttonAction(this); }, false);
    
    }

});

function buttonAction(button) {

    switch(parseInt(button.getAttribute('data-action'))) {

        case 0:
            window.location.href = 'stock.html';
            break;
        case 1:
            window.location.href = 'products.html';
            break;
        case 2:
            window.localStorage.removeItem('USER_ID');
            window.location.href = 'login.html';
            break;

    }

}