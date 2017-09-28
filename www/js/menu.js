
'use strict';

$(document).ready(function() {

    var conn = new WebSocket('ws://191.252.102.226:8080');
    
    conn.onopen = function(e) {
        alert("Connection established!");
    };

    conn.onmessage = function(e) {
        alert(e.data);
    };

    var buttons = document.getElementsByTagName('button');

    for(var i = 0; i < buttons.length; i++) {
        
        buttons[i].addEventListener('click', function() { buttonAction(this); }, false);
    
    }

});

function buttonAction(button) {

    switch(parseInt(button.getAttribute('data-action'))) {

        case 0:
            window.location.href = 'sales.html';
            break;
        case 1:
            window.location.href = 'products.html';
            break;
        case 2:
            console.log('haha');
            window.localStorage.removeItem('USER_ID');
            window.location.href = 'login.html';
            break;

    }

}