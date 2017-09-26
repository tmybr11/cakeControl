
'use strict';

$(document).ready(function() {

    document.getElementsByTagName('button')[0].addEventListener('click', function() {

        $.ajax({

            url: 'http://vps3647.publiccloud.com.br:82/login.php',
            method: 'post',
            data: {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }

        }).done(function(data) {

            data = $.parseJSON(data);

            if(data.valid) {

                window.localStorage.setItem('USER_ID', data.id);
                window.location.href = 'menu.html';

            } else {

                alert('Usuário e/ou senha errados!');

            }

        }).fail(function() {

            alert('Erro ao realizar login. Tente novamente mais tarde.');

        });

    });

});
