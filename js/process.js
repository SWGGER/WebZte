$(document).ready(function(){
	
	$("#downloadclosebtn").click(function(){
		$("#process_modal").modal("hide");
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
    if(provalue<80) {
        setTimeout(function(){
        	gotoend(provalue);
        },20)
    }else if(provalue<101 && provalue>78) {
    	var row_info = {"globle_selected_id":globle_selected_id};
			        
    	$.ajax({
	        type:"POST",
	        dataType:"json",
	        url:" ",
	        contentType:'application/json;charset=UTF-8',
			data:JSON.stringify(row_info),
	        async:false,
	        xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
	        success:function(data){
	            if(data.code == 0){
	            	$(".green").css('width','100%');
    				$("#progressvalue").html('100');
	            	setTimeout(function(){
			        	alert("任务完成");
			        },20);
	            }
	        },
	        error:function(data){
	            alert("下载文件连接错误，请重试！");
	        }
	    });
	    
    }
    
}




