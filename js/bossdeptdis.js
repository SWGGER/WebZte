var leadertextflag = false;
var bossdisdeptnametextflag = false;
$(document).ready(function(){
	var leadertext = document.getElementById("leadertext"); 
    var leadertextul = document.getElementById("leadertextul"); 
	leadertext.onkeyup = function(){ 
	    var leadertext = document.getElementById("leadertext"); 
	    var leadertextul = document.getElementById("leadertextul"); 	
	    var val = leadertext.value; 
	    var row_info = {"data": val};
		    $.ajax({
			    type:"POST",
			    dataType:"json",
			    url:"http://localhost:8050/USER-SERVICE/userApi/emp/fuzzyselectNameAndId",
			    async:false,
			    contentType:'application/json;charset=UTF-8',
		        data:JSON.stringify(row_info),
		        xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
			    success:function(data){
			        if(data.code == 0){
						callback(data.payload);
			        }
			    },
			    error:function(data){
					alert("查询指定负责人连接失败，请重试！");
			    }
		    });
	} 
	
	
	var bossdisdeptnametext = document.getElementById("bossdisdeptnametext"); 
    var bossdisdeptnameul = document.getElementById("bossdisdeptnameul"); 
	bossdisdeptnametext.onkeyup = function(){ 
	    var bossdisdeptnametext = document.getElementById("bossdisdeptnametext"); 
	    var bossdisdeptnameul = document.getElementById("bossdisdeptnameul"); 	
	    var val = bossdisdeptnametext.value; 
	    var row_info = {"data": val};
		    $.ajax({
			    type:"POST",
			    dataType:"json",
			    url:"http://localhost:8050/USER-SERVICE/userApi/addRole/fuzzySelectRolename",
			    async:false,
			    contentType:'application/json;charset=UTF-8',
		        data:JSON.stringify(row_info),
		        xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
			    success:function(data){
			        if(data.code == 0){
						calldeptnameback(data.payload);
			        }else{
			        	$("#bossdisdeptnameul").hide();
			        }
			    },
			    error:function(data){
					alert("选择部门连接失败，请重试！");
			    }
		    });
	} 
	
    
    $("#bossdeptdisrese").click(function(){
		bossdeptdisrese();
	});
    
    $("#bossdeptdisadd").click(function(){
		bossdeptdisadd();
	});
  
  
})

//回调函数 
function calldeptnameback(data){ 
    var str=""; 
    for(var i=0;i<data.length;i++){ 
    	str+="<li><div onclick=\"changetodeptinput('"+data[i]+"')\">"+data[i]+"</div></li>"
    } 
    bossdisdeptnameul.innerHTML=str; 
    bossdisdeptnameul.style.display="block"; 
} 
  
function changetodeptinput(data){
	bossdisdeptnametextflag = true;
  	bossdisdeptnametext.value=data;
  	bossdisdeptnameul.style.display="none"; 
}

//回调函数 
function callback(data){ 
    var str=""; 
    for(var i=0;i<data.length;i++){ 
    	str+="<li><div onclick=\"changetoinput('"+data[i]+"')\">"+data[i]+"</div></li>"
    } 
    leadertextul.innerHTML=str; 
    leadertextul.style.display="block"; 
} 
  
function changetoinput(data){
	leadertextflag = true;
  	leadertext.value=data;
  	leadertextul.style.display="none"; 
}


//重置
function bossdeptdisrese(){
	$("#leadertext").val("");
	$("#bossdisdeptnametext").val("");
}

//录入
function bossdeptdisadd(){
	var dept = $("#bossdisdeptnametext").val();
	var people = $("#leadertext").val();
	if(dept != "" && people != ""){
		if(leadertextflag && bossdisdeptnametextflag){
			var row_info = {"dept":dept,"people":people};
			console.log(row_info);
//			$.ajax({
//		        type:"POST",
//		        dataType:"json",
//		        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/ ",
//		        contentType:'application/json;charset=UTF-8',
//			    data:JSON.stringify(row_info),
//		        async:false,
//		        xhrFields: {
//					withCredentials: true
//				},
//				crossDomain: true,
//		        success:function(data){
//		            if(data.code == 0){
//		            	alert("权限分配成功！");
//						bossdeptdisrese();
//		            }else{
//		            	alert("权限分配错误，请重试！");
//		        	}
//		        },
//		        error:function(data){
//		            alert("权限分配连接错误，请重试！");
//		        }
//		    });
		    
		}else{
			alert("您输入的部门、负责人不在数据库中,请重新检查!");
		}


	}else{
		alert("请检查是否全部填写,请重新检查!");
	}

}
      