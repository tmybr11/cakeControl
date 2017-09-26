
'use strict';

$(document).ready(function() {

	var redirect = checkSession() ? 'menu.html' : 'login.html';

	setTimeout(function() { window.location.href = redirect; }, 2000);

});

function checkSession() {

	if(window.localStorage.getItem('USER_ID') !== null) { return true; }
	else { return false; }

}