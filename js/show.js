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