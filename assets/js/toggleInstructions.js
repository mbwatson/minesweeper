$(document).ready(function(){
	$("#instructions-toggler").click(function(){
		$(".instructions").slideToggle();
	  $("#instructions-toggler").toggleClass('down-arrow up-arrow');
	});
});