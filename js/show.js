$(document).ready(function(){
	init_showemploytable();
	var successuserid=getCookieValue("userId");
	$("#thisuserid").html(successuserid);
});

//显示员工管理列表
function showemploytable(){
	init_showemploytable();
	$("#showemploytable").show();
	$("#showaddemploy").hide();
	$("#showaddbossdept").hide();
	$("#showbossdeptdis").hide();
	$("#showleadaddjob").hide();
};

//显示员工管理添加员工表单
function showaddemployfun(){
	clearreset();
	$("#showaddemploy").show();
	$("#showemploytable").hide();
	$("#showaddbossdept").hide();
	$("#showbossdeptdis").hide();
	$("#showleadaddjob").hide();
};

//显示权限管理添加部门
function showadddeptfun(){
	$("#showaddbossdept").show();
	$("#showemploytable").hide();
	$("#showaddemploy").hide();
	$("#showbossdeptdis").hide();
	$("#showleadaddjob").hide();
}

//显示权限管理权限分配
function showpermissiondisfun(){
	$("#showbossdeptdis").show();
	$("#showemploytable").hide();
	$("#showaddbossdept").hide();
	$("#showaddemploy").hide();
	$("#showleadaddjob").hide();
}

//显示权限管理添加职位
function showaddjobfun(){
	var row_info = {"userid":getCookieValue("userId")};
	$.ajax({
        type:"POST",
        dataType:"json",
        url:"http://localhost:8050/USER-SERVICE/userApi/addRole/selectlocanddeptbyuserid",
        contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
	    success:function(data){
	        if(data.code == 0){
	        	$("#jobloc").html(data.payload["deptloc"]);
	        	$("#addjobdeptname").html(data.payload["deptname"]);
	        }
	    },
	    error:function(data){
			alert("根据uesrid获取地区部门连接失败，请重试！");
	    }
    });
    
	addjobresetbtnfunction();
	$("#showleadaddjob").show();
	$("#showbossdeptdis").hide();
	$("#showemploytable").hide();
	$("#showaddbossdept").hide();
	$("#showaddemploy").hide();
}

function getCookieValue(name) {
    var strCookie=document.cookie;
    var arrCookie=strCookie.split(";");
    for(var i=0;i<arrCookie.length;i++){
        var c=arrCookie[0].split("=");
        if(c[0]==name){
            return c[1];
        }
    }
    return "";
}