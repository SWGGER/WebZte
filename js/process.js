$(document).ready(function(){
	
	$("#downloadclosebtn").click(function(){
		$("#process_modal").modal("hide");
	})
	
});

var provalue = 0;
function goprogress(){
	var row_info = {"globle_selected_id":globle_selected_id};
	$.ajax({
        type:"POST",
        dataType:"json",
        url:"http://localhost:8050/EMPLOYEE-SERVICE/employeeApi/generatorExcel",
        contentType:'application/json;charset=UTF-8',
		data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
        	if(data.code == 0){
        		createflag = true;
        	}
        },
        error:function(data){
            alert("生成文件连接错误，请重试！");
        }
    });
	gotoend(1);
}
	
var createflag = false;
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
    	if(createflag){
    		window.location.href="http://localhost:8050/EMPLOYEE-SERVICE/employeeApi/downloadExcel";
    		$(".green").css('width','100%');
			$("#progressvalue").html('100');
	    	setTimeout(function(){
	        	alert("生成任务完成");
	        	globle_selected_id = [];
	        	$('#tableemploydata').bootstrapTable('refresh');
	        },20);
    	}else{
    		alert("下载文件失败！");
    	}
	    
    }
    
}