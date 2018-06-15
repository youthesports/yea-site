document.addEventListener('DOMContentLoaded', function(){
	var carousels = document.getElementsByClassName("carousel");

	function init(){
		for (var i = 0; i < carousels.length; i++){
			carousels[i].dataset.curItem = 0;
			carousels[i].getElementsByClassName("carousel-button-left")[0].onclick = function(){
				var items = this.parentNode.getElementsByClassName("carousel-item");
				this.parentNode.dataset.curItem = (items.length+this.parentNode.dataset.curItem-1)%items.length;
				renderCarousels();
			}
			carousels[i].getElementsByClassName("carousel-button-right")[0].onclick = function(){
				var items = this.parentNode.getElementsByClassName("carousel-item");
				this.parentNode.dataset.curItem = (items.length+this.parentNode.dataset.curItem-0+1)%items.length;
				renderCarousels();
			}
		}
		renderCarousels();
	}
	function renderCarousels(){
		for (var i = 0; i < carousels.length; i++){
			var items = carousels[i].getElementsByClassName("carousel-item");
			var dots = carousels[i].getElementsByClassName("carousel-dots")[0];
			dots.innerHTML = "";
			for (var j = 0; j < items.length; j++){
				if (j == carousels[i].dataset.curItem){
					dots.innerHTML += "●";
					items[j].style.display = "block";
				}else{
					dots.innerHTML += "○";
					items[j].style.display = "none";
				}
			}
			console.log(dots);
		}
	}
	init();
});