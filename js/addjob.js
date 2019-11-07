var leadaddjobpermissiontext; 
var leadaddjobpermissiontextul; 
var leadaddjobnametext; 
var leadaddjobnamenul; 
var levellist;
var jobflag = false;
var endlist = [];
$(document).ready(function(){
	findalllevel();
	
	leadaddjobpermissiontext = document.getElementById("leadaddjobpermissiontext"); 
    leadaddjobpermissiontextul = document.getElementById("leadaddjobpermissionul"); 
	leadaddjobpermissiontext.onkeyup = function(){ 
	    leadaddjobpermissiontext = document.getElementById("leadaddjobpermissiontext"); 
	    leadaddjobpermissiontextul = document.getElementById("leadaddjobpermissionul"); 
	    var val = $("#leadaddjobpermissiontext").val(); 
	    if(val != null && val != ""){
	    	var row_info = {"data": val};
		    $.ajax({
			    type:"POST",
			    dataType:"json",
			    url:"http://localhost:8050/USER-SERVICE/userApi/addRole/fuzzySelectPermissionname",
			    async:false,
			    contentType:'application/json;charset=UTF-8',
		        data:JSON.stringify(row_info),
		        xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
			    success:function(data){
			        if(data.code == 0){
						callbackpermission(data.payload);
			        }else{
			        	$("#leadaddjobpermissionul").hide();
			        }
			    },
			    error:function(data){
					alert("查询权限连接失败！");
			    }
		    });
	    }else{
	    	$("#leadaddjobpermissionul").hide();
	    }
	}
	
	$("#leadaddjobnametext").bind("blur",function(){
		var jobname = $("#leadaddjobnametext").val();
		if(jobname!=""){
			var row_info = {"data": jobname};
		    $.ajax({
			    type:"POST",
			    dataType:"json",
			    url:"http://localhost:8050/USER-SERVICE/userApi/addRole/selectRolename",
			    async:false,
			    contentType:'application/json;charset=UTF-8',
		        data:JSON.stringify(row_info),
		        xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
			    success:function(data){
			        if(data.code == 0){
						$("#leadaddjobnamecheck").html("<img src='../img/correct.png' class='verifypng' />格式正确");
			            $("#leadaddjobnametext").css("border-color","#cccccc");
			            jobflag = true;
			        }else{
			        	$("#leadaddjobnamecheck").html("<img src='../img/error.png' class='verifypng'/>职位名已存在");
			            $("#leadaddjobnametext").css("border-color","red");
			            jobflag=false;
			        }
			    },
			    error:function(data){
					alert("职位查重连接失败！");
			    }
		    });
			
		}else{
			$("#leadaddjobnamecheck").html("<img src='../img/error.png' class='verifypng'/>不可为空");
            $("#leadaddjobnametext").css("border-color","red");
            jobflag=false;
		}
	})
	
	//添加时点击重置按钮
    $("#addjobresetbtn").click(function(){
		addjobresetbtnfunction();
	});
    
    //添加时点击录入按钮
    $("#moretags").click(function(){
		moretagsfunction();
	});
	
	//点击显示更多标签按钮
    $("#addjobtn").click(function(){
		addjobtoconfirmfunction();
	});
	
	//显示更多标签模态框确定按钮
    $("#closeallpermission_modal").click(function(){
		$("#allpermission_modal").modal('hide');
	});
	
	//确定模态框中的确定添加按钮
    $("#alljobstorebtn").click(function(){
		alljobstorefunction();
	});
  
  	
  	$("#leadaddjoblevelfrom").bind("blur",function(){
  		endlist = [];
  		var tolist = levellist;
  		var leadaddjoblevelstart = $("#leadaddjoblevelfrom").val();
		for(var i = 0;i<tolist.length;i++){
			if(tolist[i] == leadaddjoblevelstart){
				for(var j = i;j<tolist.length;j++){
					endlist.push(tolist[j]);
				}
				break;
			}else if(i == tolist.length - 1){
				endlist.push(tolist[i]);
			}
		}
		create_type_option($("#leadaddjoblevelto"),endlist);
  	});
	
})

//回调函数 
function callbackpermission(data){ 
    var str=""; 
    for(var i=0;i<data.length;i++){ 
    	str+="<li><div onclick=\"changetoinputpermission('"+data[i]+"')\">"+data[i]+"</div></li>"
    } 
    leadaddjobpermissiontextul.innerHTML=str; 
    leadaddjobpermissiontextul.style.display="block"; 
} 
  
function changetoinputpermission(data){
	if(!$('#tags_2').tagExist(data)){
		$('#tags_2').addTag(data);
		mylist.push(data);
	}else{
		alert("已添加该标签，请重新输入");
	}
	
  	leadaddjobpermissiontext.value=data;
  	leadaddjobpermissiontextul.style.display="none"; 
}

//初始化时查找所有级别
function findalllevel(){ 
	$.ajax({
	    type:"POST",
	    dataType:"json",
	    url:"http://localhost:8050/USER-SERVICE/userApi/addRole/selectAllLevel",
	    async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
	    success:function(data){
	        if(data.code == 0){
	        	levellist = data.payload;
				create_type_option($("#leadaddjoblevelfrom"),data.payload);
				create_type_option($("#leadaddjoblevelto"),data.payload);
	        }else{
	        	alert("查询所有部门失败，请重试！");
	        }
	    },
	    error:function(data){
			alert("查询所有部门连接失败，请重试！");
	    }
    });
};

//添加时点击录入按钮
function addjobtoconfirmfunction(){
	var levelend = $("#leadaddjoblevelto").val();
	if(levelend != "" && jobflag  && mylist.length >0){
		var jobname = $("#leadaddjobnametext").val();
		var jobloc = "南京";
		var addjobdeptname = "JAVA开发部";
		var jobfunc = $("#leadaddjobdiscription").val();
		var levelstart = $("#leadaddjoblevelfrom").val();
		var levelend = $("#leadaddjoblevelto").val();
		
		$("#alljob_modal").modal("show");
		$("#confirmleadaddjobname").val(jobname);
		$("#confirmleadaddjoblevelfrom").val(levelstart);
		$("#confirmleadaddjoblevelto").val(levelend);
		$("#confirmleadaddjobdiscription").val(jobfunc);
		$("#confirmleadaddjobpermission").val(mylist);
	}else{
		alert("请确认必填选项!");
	}
}

//确认模态框弹窗时点击确定按钮
function alljobstorefunction(){
	var jobname = $("#leadaddjobnametext").val();
	var jobloc = "南京";
	var addjobdeptname = "JAVA开发部";
	var jobfunc = $("#leadaddjobdiscription").val();
	var levelstart = $("#leadaddjoblevelfrom").val();
	var levelend = $("#leadaddjoblevelto").val();
	var row_info = {"deptname":addjobdeptname,"deptloc":jobloc,"rolename":jobname,"rolefunc":jobfunc,"level_start":levelstart,"level_end":levelend,"permissionname": mylist};
	console.log(row_info);
	$("#alljob_modal").modal('hide');
	addjobresetbtnfunction();
	
//	$.ajax({
//      type:"POST",
//      dataType:"json",
//      url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getUserId",
//      contentType:'application/json;charset=UTF-8',
//	    data:JSON.stringify(row_info),
//      async:false,
//      xhrFields: {
//			withCredentials: true
//		},
//		crossDomain: true,
//	    success:function(data){
//	        if(data.code == 0){
//	        	alert("添加职位成功！");
//	        	$("#allpermission_modal").modal('hide');
//	        	addjobresetbtnfunction();
//	        }else{
//	        	alert("添加职位失败，请重试！");
//	        }
//	    },
//	    error:function(data){
//			alert("添加职位连接失败，请重试！");
//	    }
//  });
	
}



//点击显示更多标签按钮
function moretagsfunction(){
	alert(11);
	$("#allpermission_modal").modal('show');
};

//添加时点击重置按钮
function addjobresetbtnfunction(){
	jobflag = false;
	findalllevel();
	$("#leadaddjobnametext").val("")
	$("#leadaddjobnamecheck").html("");
    $("#leadaddjobnametext").css("border-color","#cccccc");
    jobflag = false;
    $("#leadaddjobdiscription").val("");
    $("#leadaddjobpermissiontext").val("");
    mylist = [];
    $('#tags_2_tagsinput .tag').remove();
    $('#tags_2').clearTag();
    $("#moretagsbobx").hide();
};