var coverdetailsflag = false;
var sidreturndata = {};
var index1 = 0;
$(document).ready(function(){
	$("ul").on("click", "li", function() { //只需要找到你点击的是哪个ul里面的就行
		for(var i = 0; i < sidreturndata.rechecklist.length; i++) {
			if($(this).find('span').text() == sidreturndata.rechecklist[i].sid){
				$("#tagNameVal").text(sidreturndata.rechecklist[i].name);
				$("#tagTelephoneVal").text(sidreturndata.rechecklist[i].tel);
				$("#tagUsernativeVal").text(sidreturndata.rechecklist[i].natation);
				$("#tagSexVal").text(sidreturndata.rechecklist[i].gender);
				$("#tagEmailVal").text(sidreturndata.rechecklist[i].email);
				$("#tagSidVal").text(sidreturndata.rechecklist[i].sid);
				$("#tagLocVal").text(sidreturndata.rechecklist[i].livecity);
				$("#tagSalVal").text(sidreturndata.rechecklist[i].sal);
				$("#tagDucationVal").text(sidreturndata.rechecklist[i].education);
				$("#tagEducationlevelVal").text(sidreturndata.rechecklist[i].educationlevel);
				$("#tagCertificateVal").text(sidreturndata.rechecklist[i].certificate);
				$("#tagDeptVal").text(sidreturndata.rechecklist[i].dept);
				$("#tagJobVal").text(sidreturndata.rechecklist[i].job);
				$("#tagAddressVal").text(sidreturndata.rechecklist[i].address);
				$("#tagLevelVal").text(sidreturndata.rechecklist[i].level);
			}
			
		}
	});
	
	//导航栏动，通过改变marginLeft来实现
	$("#lefticon").click(function() {
		if(index1 == 0) {
			alert("已是第一个！");
		} else {
			index1--;
			var margin = -140 * index1;
			$("ul").animate({
				left: margin
			}, 1000);
		}

	});

	$("#righticon").click(function() {
		if(index1 == sidreturndata.rechecklist.length - 1) {
			alert("已是最后一个！");
		} else {
			index1++;
			var margin = -140 * index1;
			$("ul").animate({
				left: margin
			}, 1000);
		}

	});
	
	//点击单条记录跳过按钮
	$("#jumpimportbtn").click(function(){
		jumpimportsingle();
	});
	
	//点击单条记录覆盖按钮
	$("#coverimportbtn").click(function(){
		coverimportsingle();
		$('#tableemploydata').bootstrapTable('refresh');
	});
	
	//点击全部记录跳过按钮
	$("#jumpallimportbtn").click(function(){
		jumpallimportall();
	});
	
	//点击全部记录覆盖按钮
	$("#coverallimportbtn").click(function(){
		coverallimportall();
		$('#tableemploydata').bootstrapTable('refresh');
	});
	
			
})

//初始化选项卡的第一个内容卡片
function initfirsttag(sidreturndata){
	$("#tagNameVal").text(sidreturndata.rechecklist[0].name);
	$("#tagTelephoneVal").text(sidreturndata.rechecklist[0].tel);
	$("#tagUsernativeVal").text(sidreturndata.rechecklist[0].natation);
	$("#tagSexVal").text(sidreturndata.rechecklist[0].gender);
	$("#tagEmailVal").text(sidreturndata.rechecklist[0].email);
	$("#tagSidVal").text(sidreturndata.rechecklist[0].sid);
	$("#tagLocVal").text(sidreturndata.rechecklist[0].livecity);
	$("#tagSalVal").text(sidreturndata.rechecklist[0].sal);
	$("#tagDucationVal").text(sidreturndata.rechecklist[0].education);
	$("#tagEducationlevelVal").text(sidreturndata.rechecklist[0].educationlevel);
	$("#tagCertificateVal").text(sidreturndata.rechecklist[0].certificate);
	$("#tagDeptVal").text(sidreturndata.rechecklist[0].dept);
	$("#tagJobVal").text(sidreturndata.rechecklist[0].job);
	$("#tagAddressVal").text(sidreturndata.rechecklist[0].address);
	$("#tagLevelVal").text(sidreturndata.rechecklist[0].level);
}

//点击收起，点击展开
function Tagmoredetails(){
    if(coverdetailsflag){
    	$("#showmorecovertext").html("更多展开");
    	$("#showmorecovericon").addClass("ion-chevron-down");
    	$("#showmorecovericon").removeClass("ion-chevron-up");
    	$("#showmorecovertext").css("color","#107CB7");
    	$("#showmorecovericon").css("color","#107CB7");
    	$("#morecoverdetails").css("display","none");
    	coverdetailsflag = false;
    }else{
    	$("#showmorecovertext").html("点击收起");
    	$("#showmorecovericon").removeClass("ion-chevron-down");
    	$("#showmorecovericon").addClass("ion-chevron-up");
    	$("#showmorecovertext").css("color","#cccccc");
    	$("#showmorecovericon").css("color","#cccccc");
    	$("#morecoverdetails").css("display","block");
    	coverdetailsflag = true;
    }
};


//点击单条记录跳过按钮
function jumpimportsingle(){
	var jumpsid = $("#tagSidVal").text();
	var newrechecklist=[];
	for(var i = 0; i < sidreturndata.rechecklist.length; i++) {
		if(jumpsid== sidreturndata.rechecklist[i].sid){
			
		}else{
			newrechecklist.push(sidreturndata.rechecklist[i]);
		}
	}
	
	if(newrechecklist.length > 0 ){
		sidreturndata["rechecklist"] = newrechecklist;
		var append = "";
		$("#main-nav").html("");
		for(var i = 0; i < sidreturndata.rechecklist.length; i++) {
			append += '<li class="portfolio"><a>' + sidreturndata.rechecklist[i].name+'<span style=\"display:none;\">'+sidreturndata.rechecklist[i].sid +'</span>' + '</a></li>'
		}
		$("#main-nav").append(append);
		initfirsttag(sidreturndata);
		index1 = 0;
	}else{
		$("#main-nav").html("");
		$("#tagNameVal").text("");
		$("#tagTelephoneVal").text("");
		$("#tagUsernativeVal").text("");
		$("#tagSexVal").text("");
		$("#tagEmailVal").text("");
		$("#tagSidVal").text("");
		$("#tagLocVal").text("");
		$("#tagSalVal").text("");
		$("#tagDucationVal").text("");
		$("#tagEducationlevelVal").text("");
		$("#tagCertificateVal").text("");
		$("#tagDeptVal").text("");
		$("#tagJobVal").text("");
		$("#tagAddressVal").text("");
		$("#tagLevelVal").text("");
		$("#sidrecheck_modal").modal("hide");
		index1 = 0;
	}
	
}
	
//点击单条记录覆盖按钮
function coverimportsingle(){
	var jumpsid = $("#tagSidVal").text();
	var newrechecklist=[];
	var jumplist = [];
	for(var i = 0; i < sidreturndata.rechecklist.length; i++) {
		if(jumpsid== sidreturndata.rechecklist[i].sid){
			jumplist.push(sidreturndata.rechecklist[i]);
		}else{
			newrechecklist.push(sidreturndata.rechecklist[i]);
		}
	}
	
	var row_info ={"rechecklist":jumplist};
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/batchinsert",
        contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
            if(data.code == 0){
            	alert("覆盖成功!")
            	if(newrechecklist.length > 0 ){
					sidreturndata["rechecklist"] = newrechecklist;
					var append = "";
					$("#main-nav").html("");
					for(var i = 0; i < sidreturndata.rechecklist.length; i++) {
						append += '<li class="portfolio"><a>' + sidreturndata.rechecklist[i].name+'<span style=\"display:none;\">'+sidreturndata.rechecklist[i].sid +'</span>' + '</a></li>'
					}
					$("#main-nav").append(append);
					initfirsttag(sidreturndata);
					index1 = 0;
				}else{
					$("#main-nav").html("");
					$("#tagNameVal").text("");
					$("#tagTelephoneVal").text("");
					$("#tagUsernativeVal").text("");
					$("#tagSexVal").text("");
					$("#tagEmailVal").text("");
					$("#tagSidVal").text("");
					$("#tagLocVal").text("");
					$("#tagSalVal").text("");
					$("#tagDucationVal").text("");
					$("#tagEducationlevelVal").text("");
					$("#tagCertificateVal").text("");
					$("#tagDeptVal").text("");
					$("#tagJobVal").text("");
					$("#tagAddressVal").text("");
					$("#tagLevelVal").text("");
					$("#sidrecheck_modal").modal("hide");
					index1 = 0;
				}
	
            }else{
                alert("覆盖失败!")
            }
        },
        error:function(data){
            alert("覆盖操作连接错误，请重试！");
        }
    });
	
	
	
}
	
//点击全部记录跳过按钮
function jumpallimportall(){
	$("#main-nav").html("");
	$("#tagNameVal").text("");
	$("#tagTelephoneVal").text("");
	$("#tagUsernativeVal").text("");
	$("#tagSexVal").text("");
	$("#tagEmailVal").text("");
	$("#tagSidVal").text("");
	$("#tagLocVal").text("");
	$("#tagSalVal").text("");
	$("#tagDucationVal").text("");
	$("#tagEducationlevelVal").text("");
	$("#tagCertificateVal").text("");
	$("#tagDeptVal").text("");
	$("#tagJobVal").text("");
	$("#tagAddressVal").text("");
	$("#tagLevelVal").text("");
	$("#sidrecheck_modal").modal("hide");
	index1 = 0;
}
	
//点击全部记录覆盖按钮
function coverallimportall(){
	var row_info ={"rechecklist":sidreturndata.rechecklist};
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/batchinsert",
        contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
            if(data.code == 0){
            	alert("覆盖成功!")
            	$("#main-nav").html("");
				$("#tagNameVal").text("");
				$("#tagTelephoneVal").text("");
				$("#tagUsernativeVal").text("");
				$("#tagSexVal").text("");
				$("#tagEmailVal").text("");
				$("#tagSidVal").text("");
				$("#tagLocVal").text("");
				$("#tagSalVal").text("");
				$("#tagDucationVal").text("");
				$("#tagEducationlevelVal").text("");
				$("#tagCertificateVal").text("");
				$("#tagDeptVal").text("");
				$("#tagJobVal").text("");
				$("#tagAddressVal").text("");
				$("#tagLevelVal").text("");
				$("#sidrecheck_modal").modal("hide");
				index1 = 0;
            }else{
                alert("覆盖失败!")
            }
        },
        error:function(data){
            alert("覆盖操作连接错误，请重试！");
        }
    });
}