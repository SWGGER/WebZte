$(document).ready(function(){
	init_showemploytable();
//	$("#employdetail_modal").modal("show");
});

//显示员工管理列表
function showemploytable(){
	init_showemploytable();
	$("#showemploytable").show();
	$("#showaddemploy").hide();
};

//显示员工管理添加员工表单
function showaddemployfun(){
	clearreset();
	$("#showaddemploy").show();
	$("#showemploytable").hide();
	
}
