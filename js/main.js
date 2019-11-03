jQuery(document).ready(function(){
	$("input[type='checkbox']").prop("checked",false);
	var accordionsMenu = $('.cd-accordion-menu');
	
	if( accordionsMenu.length > 0 ) {
		
		accordionsMenu.each(function(){
			var accordion = $(this);
			accordion.on('change', 'input[type="checkbox"]', function(){
				var checkbox = $(this);
				if( checkbox.prop('checked') ){
					checkbox.next().children().eq(2).removeClass("ion-chevron-down");
					checkbox.next().children().eq(2).addClass("ion-chevron-up");
					checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) 
				}else{
					checkbox.next().children().eq(2).addClass("ion-chevron-down");
					checkbox.next().children().eq(2).removeClass("ion-chevron-up");
					checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
				}
			});
		});
	}
});