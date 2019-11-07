var bossadddeptnameflag = false;
var bossadddeptprefixflag=false;
var bossadddeptlocflag=false;

$(document).ready(function(){
	bossadddeptreset();
	
	//部门名称的格式校验
	$("#bossadddeptname").bind("blur",function(){
		var bossadddeptname=$("#bossadddeptname").val();
		if(bossadddeptname!=""){
            $("#bossadddeptnamecheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
            $("#bossadddeptname").css("border-color","#cccccc");
            bossadddeptnameflag = true;
		}else{
			$("#bossadddeptnamecheck").html("<img src='../img/error.png' class='verifypng'/>不可为空");
            $("#bossadddeptname").css("border-color","red");
            bossadddeptnameflag=false;
		}
	});
	
	//部门缩写的格式校验
	$("#bossadddeptprefix").bind("blur",function(){
		var bossadddeptprefix=$("#bossadddeptprefix").val();
		if(bossadddeptprefix!=""){
            $("#bossadddeptprefixcheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
            $("#bossadddeptprefix").css("border-color","#cccccc");
            bossadddeptprefixflag = true;
		}else{
			$("#bossadddeptprefixcheck").html("<img src='../img/error.png' class='verifypng'/>不可为空");
            $("#bossadddeptprefix").css("border-color","red");
            bossadddeptprefixflag=false;
		}
	});
	
	//部门所在地的格式校验
	$("#bossadddeptloc").bind("blur",function(){
		var bossadddeptloc=$("#bossadddeptloc").val();
		if(bossadddeptloc!=""){
            $("#bossadddeptloccheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
            $("#bossadddeptloc").css("border-color","#cccccc");
            bossadddeptlocflag = true;
		}else{
			$("#bossadddeptloccheck").html("<img src='../img/error.png' class='verifypng'/>不可为空");
            $("#bossadddeptloc").css("border-color","red");
            bossadddeptlocflag=false;
		}
	});
	
	//点击重置按钮
	$("#bossadddeptresetbtn").click(function(){
		bossadddeptreset();
	});
	
	//添加时点击录入按钮
	$("#bossadddeptconfirmbtn").click(function(){
		bossadddeptconfirm();
	});
	
	//确认时点击录入按钮
	$("#confirmdeptaddbtn").click(function(){
		confirmdeptaddfun();
	});
	
	
})

//清空添加部门数据函数
function bossadddeptreset(){
	bossadddeptnameflag = false;
    bossadddeptprefixflag=false;
	bossadddeptlocflag=false;
            
	$("#bossadddeptname").val("")
	$("#bossadddeptnamecheck").html("");
    $("#bossadddeptname").css("border-color","#cccccc");
    
    $("#bossadddeptprefix").val("")
	$("#bossadddeptprefixcheck").html("");
    $("#bossadddeptprefix").css("border-color","#cccccc");
    
    $("#bossadddeptloc").val("")
	$("#bossadddeptloccheck").html("");
    $("#bossadddeptloc").css("border-color","#cccccc");
    
	$("#bossadddeptfunc").val("");
}

//点击添加时查重
function bossadddeptconfirm(){
	if(bossadddeptlocflag && bossadddeptprefixflag && bossadddeptprefixflag){
	    bossdeptnameandloccheck();
	}else{
		alert("请检查必填字段!");
	}
}

//部门名 所在地区查重
function bossdeptnameandloccheck(){
	var deptName = $("#bossadddeptname").val();
	var deptLoc = $("#bossadddeptloc").val();
	var deptPrefix = $("#bossadddeptprefix").val();
    var deptFunction = $("#bossadddeptfunc").val();
    
    var row_info ={"deptName":deptName,"deptLoc":deptLoc};
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"http://localhost:8050/USER-SERVICE/userApi/dept/recheck",
        contentType:'application/json;charset=UTF-8',
		data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
            if(data.code == 0){
            	confirmadddeptboss();
            }else{
            	alert("部门名、部门所在地已存在，请重新输入！");
            	resetaddbossdept();
        	}
        },
        error:function(data){
            alert("部门名、地区查重连接错误，请重试！");
        }
    });
}

//部门名 所在地区重置
function resetaddbossdept(){
	bossadddeptnameflag = false;
	bossadddeptlocflag=false;
            
	$("#bossadddeptname").val("")
	$("#bossadddeptnamecheck").html("");
    $("#bossadddeptname").css("border-color","#cccccc");
    
    $("#bossadddeptloc").val("")
	$("#bossadddeptloccheck").html("");
    $("#bossadddeptloc").css("border-color","#cccccc");
}

//部门名 所在地区确认弹框
function confirmadddeptboss(){
	var deptName = $("#bossadddeptname").val();
	var deptPrefix = $("#bossadddeptprefix").val();
	var deptLoc = $("#bossadddeptloc").val();
    var deptFunction = $("#bossadddeptfunc").val();
    $("#confirmbossadddeptname").val(deptName);
    $("#confirmbossadddeptprefix").val(deptPrefix);
    $("#confirmbossadddeptloc").val(deptLoc);
    $("#confirmbossadddeptfunc").val(deptFunction);
	$("#bossadddept_modal").modal("show");
}

//确认模态框中的录入信息
function confirmdeptaddfun(){
	var confirmdeptName = $("#confirmbossadddeptname").val();
	var confirmdeptPrefix = $("#confirmbossadddeptprefix").val();
	var confirmdeptLoc = $("#confirmbossadddeptloc").val();
    var confirmdeptFunction = $("#confirmbossadddeptfunc").val();
    var confirm_info = {"deptName":confirmdeptName,"deptPrefix":confirmdeptPrefix,"deptLoc":confirmdeptLoc,"deptFunction":confirmdeptFunction};
	$.ajax({
        type:"POST",
        dataType:"json",
        url:"http://localhost:8050/USER-SERVICE/userApi/dept/insertDept",
        contentType:'application/json;charset=UTF-8',
		data:JSON.stringify(confirm_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
            if(data.code == 0){
            	alert("录入成功!");
				$("#bossadddept_modal").modal("hide");
				bossadddeptreset();
            }else{
            	alert("录入成功，请重新录入！");
            	$("#bossadddept_modal").modal("hide");
        	}
        },
        error:function(data){
            alert("部门信息添加连接错误，请重试！");
        }
    });
}
