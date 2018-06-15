document.addEventListener('DOMContentLoaded', function(){
	function blur(){
		document.getElementById("overlay").style.display = "flex";
		document.getElementById("top-nav").style.filter = "blur(10px)";
		document.getElementById("content").style.filter = "blur(10px)";
		document.getElementById("footer").style.filter = "blur(10px)";
	}
	function focus(){
		document.getElementById("top-nav").style.filter = "";
		document.getElementById("content").style.filter = "";
		document.getElementById("footer").style.filter = "";
		document.getElementById("overlay").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("register").style.display = "none";
	}
	function login(){
		blur();
		document.getElementById("login").style.display = "block";
	}
	function register(){
		blur();
		document.getElementById("register").style.display = "block";
	}
	document.getElementById("overlay").addEventListener("click",function(e){
		if (e.isTrusted && e.target.id == "overlay")
			focus();
	});
	document.getElementById("login-link").addEventListener("click",login)
	
	document.getElementById("register-link").addEventListener("click",register)

	var redirect = document.getElementById("redirect");
	if (redirect.innerHTML.indexOf("signin") != -1)
		login();
	else
		register();

});