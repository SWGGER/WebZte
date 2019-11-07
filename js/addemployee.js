var detailsflag = false; // 添加员工是否打开更多
var confirmdetailsflag = false; // 确认添加员工是否打开更多
var addemploynameflag = false;
var addemployemailflag = false;
var addemploysidflag = false;
var addemploysalflag = false;
var addemploytelflag = false;

$(document).ready(function(){
	clearreset();
	
	findalldept();
	
	//姓名的格式校验
	$("#addemployname").bind("blur",function(){
		var addemployname=$("#addemployname").val();
		if(addemployname!=""){
            $("#addemploynamecheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
            $("#addemployname").css("border-color","#cccccc");
            addemploynameflag = true;
		}else{
			$("#addemploynamecheck").html("<img src='../img/error.png' class='verifypng'/>不可为空");
            $("#addemployname").css("border-color","red");
            addemploynameflag=false;
		}
	});
	
	//邮箱的格式校验
	$("#addemployemail").bind("blur",function(){
		var addemployemailmatch=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		var addemployemail=$("#addemployemail").val();
		if(addemployemail!=""){
			if(addemployemailmatch.test(addemployemail)){
                $("#addemployemailcheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
                $("#addemployemail").css("border-color","#cccccc");
                addemployemailflag = true;
			}else{
				$("#addemployemailcheck").html("<img src='../img/error.png' class='verifypng'/>格式错误");
                $("#addemployemail").css("border-color","red");
                addemployemailflag=false;
			}
		}else{
			$("#addemployemailcheck").html("");
            $("#addemployemail").css("border-color","#cccccc");
            addemployemailflag = false;
		}
	});
	
	//身份证的格式校验
	$("#addemploysid").bind("blur",function(){
		var addemploysidmatch=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
		var addemploysid=$("#addemploysid").val();
		if(addemploysid!=""){
			if(addemploysidmatch.test(addemploysid)){
                $("#addemploysidcheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
                $("#addemploysid").css("border-color","#cccccc");
                addemploysidflag = true;
			}else{
				$("#addemploysidcheck").html("<img src='../img/error.png' class='verifypng'/>15或17位数字");
                $("#addemploysid").css("border-color","red");
                addemploysidflag=false;
			}
		}else{
			$("#addemploysidcheck").html("<img src='../img/error.png' class='verifypng' />不可为空");
			$("#addemploysid").css("border-color","red");
            addemploysidflag=false;
		}
	});
	
	//工资的格式校验
	$("#addemploysal").bind("blur",judgesalbylevel);
	
	//电话的格式校验
	$("#addemploytel").bind("blur",function(){
		var istelmatch = /^(\d{3,4}-)?\d{6,9}$/;
		var addemploytelmatch=/^((\+?86)|(\(\+86\)))?( )?1(3|4|5|7|8)\d{9}$/;
		var addemploytel=$("#addemploytel").val();
		if(addemploytel!=""){
			if(addemploytelmatch.test(addemploytel) || istelmatch.test(addemploytel)){
                $("#addemploytelcheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
                $("#addemploytel").css("border-color","#cccccc");
                addemploytelflag = true;
			}else{
				$("#addemploytelcheck").html("<img src='../img/error.png' class='verifypng'/>格式错误");
                $("#addemploytel").css("border-color","red");
                addemploytelflag=false;
			}
		}else{
			$("#addemploytelcheck").html("");
            $("#addemploytel").css("border-color","#cccccc");
            addemploytelflag = false;
		}
	});
	
	$("#addemploydept").bind("blur",function(){
		findaddressbydept();
	});
	
	$("#addemployaddress").bind("blur",function(){
		findjobbydeptandaddress();
	});
	
	$("#addemployjob").click(function(){
		findlevelbydeptandjob();
	});
	
	$("#addemploylevel").click(function(){
		judgesalbylevel();
	});
	
	//点击重置按钮
	$("#addemployreset").click(function(){
		clearreset();
	});
	
	//添加时点击录入按钮
	$("#addemploystore").click(function(){
		addemploystore();
	});
	
	//确认添加时点击录入按钮
	$("#confirmsubmit").click(function(){
		confirmaddemploystore();
	});
	
    
});

//清空表格数据函数
function clearreset(){
	detailsflag = true;
	moredetails();
	addemploynameflag = false;
	addemployemailflag = false;
	addemploysidflag = false;
	addemploysalflag = false;
	addemploytelflag = false;
	$("#addemployname").val("")
	$("#addemploynamecheck").html("");
    $("#addemployname").css("border-color","#cccccc");
	$("#addemployemail").val("")
	$("#addemployemailcheck").html("");
    $("#addemployemail").css("border-color","#cccccc");
    $("#addemploysid").val("")
	$("#addemploysidcheck").html("");
    $("#addemploysid").css("border-color","#cccccc");
    $("#addemploysal").val("")
	$("#addemploysalcheck").html("");
    $("#addemploysal").css("border-color","#cccccc");
    $("#addemploytel").val("")
	$("#addemploytelcheck").html("");
    $("#addemploytel").css("border-color","#cccccc");
    $("#addemployliv").val("");
    $("#addemploynav").val("");
    $("#addemployedu").val("");
    $("#addemployedulev").val("");
    $("#addemploycert").val("");
};

//点击收起，点击展开
function moredetails(){
    if(detailsflag){
    	$("#showmoretext").html("更多展开");
    	$("#showmoreicon").addClass("ion-chevron-down");
    	$("#showmoreicon").removeClass("ion-chevron-up");
    	$("#showmoretext").css("color","#107CB7");
    	$("#showmoreicon").css("color","#107CB7");
    	$("#moredetails").css("display","none");
    	detailsflag = false;
    }else{
    	$("#showmoretext").html("点击收起");
    	$("#showmoreicon").removeClass("ion-chevron-down");
    	$("#showmoreicon").addClass("ion-chevron-up");
    	$("#showmoretext").css("color","#cccccc");
    	$("#showmoreicon").css("color","#cccccc");
    	$("#moredetails").css("display","block");
    	detailsflag = true;
    }
};

//点击收起，点击展开
function confirmmoredetails(){
    if(confirmdetailsflag){
    	$("#confirmshowmoretext").html("更多展开");
    	$("#confirmshowmoreicon").addClass("ion-chevron-down");
    	$("#confirmshowmoreicon").removeClass("ion-chevron-up");
    	$("#confirmshowmoretext").css("color","#107CB7");
    	$("#confirmshowmoreicon").css("color","#107CB7");
    	$("#confirmmoredetails").css("display","none");
    	confirmdetailsflag = false;
    }else{
    	$("#confirmshowmoretext").html("点击收起");
    	$("#confirmshowmoreicon").removeClass("ion-chevron-down");
    	$("#confirmshowmoreicon").addClass("ion-chevron-up");
    	$("#confirmshowmoretext").css("color","#cccccc");
    	$("#confirmshowmoreicon").css("color","#cccccc");
    	$("#confirmmoredetails").css("display","block");
    	confirmdetailsflag = true;
    }
};

//点击添加员工录入按钮
function addemploystore(){
	if(addemployemailflag || addemploytelflag){
		if(addemploysidflag && addemploysalflag && addemploynameflag){
			alert("格式正确!");
			senddeptandaddress();
			confirmmodalshow();
		}else{
			alert("请检查必填选项格式!");
		}
	}else{
		alert("请任意输入邮箱或电话!");
	}

};

//确认添加员工录入
function confirmmodalshow(){
	if(addemployemailflag || addemploytelflag){
		if(addemploysidflag && addemploysalflag && addemploynameflag){
			$("#addemployconfirm_modal").modal("show");
			
			var name = $("#addemployname").val();
			var email = $("#addemployemail").val();
			var tel = $("#addemploytel").val();
		    var sid =  $("#addemploysid").val();
		    var natation = $("#addemploynav").val();
		    var livecity = $("#addemployliv").val();
		    var gender = $("#addemploygen").val()
		    var sal = $("#addemploysal").val();
		    
		    var education = $("#addemployedu").val();
		    var educationlevel = $("#addemployedulev").val();
		    var certificate = $("#addemploycert").val();
		    
		    var dept = $("#addemploydept").val();
		    var job = $("#addemployjob").val();
		    var address = $("#addemployaddress").val();
		    var level = $("#addemploylevel").val();
		    
		    $("#confirmname").val(name);
		    $("#confirmemail").val(email);
		    $("#confirmtel").val(tel);
		    $("#confirmsid").val(sid);
		    $("#confirmnav").val(natation);
		    $("#confirmlivcity").val(livecity);
		    $("#confirmsex").val(gender)
		    $("#confirmsal").val(sal);
		    
		    $("#confirmedu").val(education);
		    $("#confirmedulev").val(educationlevel);
		    $("#confirmcerti").val(certificate);
		    
		    $("#confirmdept").val(dept);
		    $("#confirmjob").val(job);
		    $("#confirmlivplace").val(address);
		    $("#confirmlevel").val(level);
			
		}else{
			alert("请检查必填选项格式!");
		}
	}else{
		alert("请任意输入邮箱或电话!");
	}

};

//将部门名地区传至后台获取员工编号
function senddeptandaddress(){
    var dept = $("#addemploydept").val();
    var address = $("#addemployaddress").val();
    var row_info ={"dept":dept,"address":address};
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getUserId",
        contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
            if(data.code == 0){
            	var userid = data.userid;
            	$("#confirmusereid").val(userid);
            }else{
                $("#errorshowtext").html("<img src='../img/error.png' class='verifypng'/>请求冲突，请重试");
        	}
        },
        error:function(data){
            alert("获取员工编号连接错误，请重试！");
        }
    });
};

//将添加的员工信息存储在数据库中
function confirmaddemploystore(){
	
	var userid = $("#confirmusereid").val();
	var name = $("#confirmname").val();
	var email = $("#addemployemail").val();
	var tel = $("#addemploytel").val();
    var sid =  $("#addemploysid").val();
    var natation = $("#addemploynav").val();
    var livecity = $("#addemployliv").val();
    var gender = $("#addemploygen").val()
    var sal = $("#addemploysal").val();
    
    
    var education = $("#addemployedu").val();
    var educationlevel = $("#addemployedulev").val();
    var certificate = $("#addemploycert").val();
    
    var dept = $("#addemploydept").val();
    var job = $("#addemployjob").val();
    var address = $("#addemployaddress").val();
    var level = $("#addemploylevel").val();
	var row_info ={"userid":userid,"name":name,"email":email,"tel":tel,"sid":sid,"natation":natation,"livecity":livecity,"gender":gender,"sal":sal,"education":education,"educationlevel":educationlevel,"certificate":certificate,"dept":dept,"job":job,"address":address,"level":level};
			
	$.ajax({
        type:"POST",
        dataType:"json",
        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/insertAllInfo",
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
        success:function(data){
            if(data.code == 0){
				alert("添加员工成功！");
				$("#addemployconfirm_modal").modal("hide");
				init_showemploytable();
				$("#showemploytable").show();
				$("#showaddemploy").hide();
            }else{
            	alert("添加员工失败，请重试！");
            }
        },
        error:function(data){
			alert("添加员工连接失败，请重试！");
        }
    });
	
};

//初始化时查找所有部门
function findalldept(){ 
	$.ajax({
	    type:"POST",
	    dataType:"json",
	    url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getDeptName",
	    async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
	    success:function(data){
	        if(data.code == 0){
				create_type_option($("#addemploydept"),data.deptnames);
				findaddressbydept();
				findjobbydeptandaddress();
				findlevelbydeptandjob();
	        }else{
	        	alert("查询所有部门失败，请重试！");
	        }
	    },
	    error:function(data){
			alert("查询所有部门连接失败，请重试！");
	    }
    });
};

//根据所选部门联动地区
function findaddressbydept(){ 
	var dept = $("#addemploydept").val();
	var row_info ={"dept":dept};
		
	$.ajax({
	    type:"POST",
	    dataType:"json",
	    contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
	    url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getAddress",
	    async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
	    success:function(data){
	        if(data.code == 0){
				create_type_option($("#addemployaddress"),data.addresses);
				findjobbydeptandaddress();
				findlevelbydeptandjob();
	        }else{
	        	alert("根据所选部门联动地区失败，请重试！");
	        }
	    },
	    error:function(data){
			alert("根据所选部门联动地区连接失败，请重试！");
	    }
    });
};

//根据所选部门和地区联动职位
function findjobbydeptandaddress(){ 
	var dept = $("#addemploydept").val();
    var address = $("#addemployaddress").val();
	var row_info ={"dept":dept,"address":address};
	
	$.ajax({
	    type:"POST",
	    dataType:"json",
	    url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getJob",
	    contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
	    async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
	    success:function(data){
	        if(data.code == 0){
				create_type_option($("#addemployjob"),data.job);
				findlevelbydeptandjob();
	        }else{
	        	alert("根据所选部门联动地区失败，请重试！");
	        }
	    },
	    error:function(data){
			alert("根据所选部门联动地区连接失败，请重试！");
	    }
    });
};

//根据所选部门和职位联动级别
function findlevelbydeptandjob(){ 
	var dept = $("#addemploydept").val();
    var job = $("#addemployjob").val();
    var address = $("#addemployaddress").val();
	var row_info ={"dept":dept,"job":job,"address":address};
	
	$.ajax({
	    type:"POST",
	    dataType:"json",
	    contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
	    url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getLevel",
	    async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
	    success:function(data){
	        if(data.code == 0){
				create_type_option($("#addemploylevel"),data.level);
	        }else{
	        	alert("根据所选部门和职位联动级别，请重试！");
	        }
	    },
	    error:function(data){
			alert("根据所选部门和职位联动级别，请重试！");
	    }
    });
};

function create_type_option(element,role) {
    element.find("option").remove()
    var sel = "";
    for(var  i=0;i<role.length;i++){
        sel += "<option value='"+role[i]+"'>"+role[i] +"</option>";
    }
    
    element.append(sel);
};

function judgesalbylevel(){
	var addemploysalmatch=/^(([1-9][0-9]*)|((([1-9][0-9]*)|0)\.[0-9]{1,2}))$/;
	var addemploysal=$("#addemploysal").val();
	if(addemploysal!=""){
		if(addemploysalmatch.test(addemploysal)){
			//根据所选级别，判断薪资是否大于最大薪资
			var level = $("#addemploylevel").val();
		    var row_info ={"level":level,"sal":addemploysal};
		    $.ajax({
		        type:"POST",
		        dataType:"json",
		        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/judgeSal",
		        contentType:'application/json;charset=UTF-8',
    			data:JSON.stringify(row_info),
		        async:false,
		        xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
		        success:function(data){
		            if(data.code == 0){
		            	$("#addemploysalcheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
		                $("#addemploysal").css("border-color","#cccccc");
		                addemploysalflag = true;
		            }else{
		            	$("#addemploysalcheck").html("<img src='../img/error.png' class='verifypng' />工资过高");
						$("#addemploysal").css("border-color","red");
			            addemploysalflag=false;
		        	}
		        },
		        error:function(data){
		            alert("比较工资连接错误，请重试！");
		        }
		    });
			
		}else{
			$("#addemploysalcheck").html("<img src='../img/error.png' class='verifypng'/>格式错误");
            $("#addemploysal").css("border-color","red");
            addemploysalflag=false;
		}
	}else{
		$("#addemploysalcheck").html("<img src='../img/error.png' class='verifypng' />不可为空");
		$("#addemploysal").css("border-color","red");
        addemploysalflag=false;
	}
	
}
