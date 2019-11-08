$(document).ready(function(){
	
	$("#startbtn").click(function(){
		goprogress();
	})
	
});

var provalue = 0;
function goprogress(){
	gotoend(1);
}
	
function gotoend(provalue){
	
    var newString = provalue + "%";
    $(".green").css('width',newString);
    $("#progressvalue").html(provalue);
    provalue ++;
    if(provalue<101) {
        setTimeout(function(){
        	gotoend(provalue);
        },20)
    }else{
        setTimeout(function(){
        	alert("任务完成")
        },20);
    }
    
}




