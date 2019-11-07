var userId="";
var userid_reg=false;
var successuserid="";
$(document).ready(function(){	
	  //账号的格式校验及查重
	$("#user_id").bind("blur",function(){
		var regId=/^[A-Za-z0-9]+$/;
		var loginId=$("#user_id").val();
		if(loginId!=""){
			if(regId.test(loginId)){
				$("#userid_reg").html("</br><img src='../img/correct.png' class='icon'/>格式正确");
				userid_reg=true;
			}else{
				$("#userid_reg").html("</br><img src='../img/error.png'  class='icon' />格式错误");
			}
		}else{
			$("#userid_reg").html("</br><img src='../img/error.png'  class='icon'/>不可为空");
		}
	});
	//验证码判断
})
//验证码刷新
function changeImg(){
       $("#img").attr("src","http://localhost:8050/USER-SERVICE/userApi/getImage?date=" + new Date());
}
//验证码判断
function code_ready(){
	if($("#code").val()!=""){		
		////判断验证码正确
			var valid_info={"code":$("#code").val()};
			$.ajax({
			    type: "POST",
			    url: "http://localhost:8050/USER-SERVICE/userApi/alidImage",
			    contentType:'application/json;charset=UTF-8',
			    dataType: "json",
			    data:JSON.stringify(valid_info),
			    success: function(data){
			    	if(data.code==0){
			    		//验证码正确
			    		login_ready();
			    	}else{
			    		alert("验证码错误！请重新输入！");	
			    	}
			    },
			    error:function(data){
			    	console.log(data);
			        console.log("连接失败！请检查连接！");
			    }
		    	});
		}else{
			console.log("验证码不可为空！")
		}	
}
//登录判断
function login_ready(){	
//判断用户密码正确
		if(userid_reg){
			var login_info={"userId":$("#user_id").val(),"password":$("#psw").val()};
			$.ajax({
			    type: "POST",
			    url: "http://localhost:8050/USER-SERVICE/userApi/login",
			    contentType:'application/json;charset=UTF-8',
			    dataType: "json",
			    async:false,
			    data: JSON.stringify(login_info),
			    success: function(data){
			    	if(data.code==0){
			    			alert("登陆成功！");
			    			successuserid = data.payload["userId"];
			    			document.cookie="userId="+successuserid;
			    			window.location.href='index.html'
			    		}else{
			    			 alert("账号密码错误！请重新输入！");
			    		}
			    },
			    error:function(data){
			        alert("连接失败！请检查连接！");
			    }
	    	});
		}else{
			alert("用户格式错误，请重新输入！")
		}
		console.log(document.cookie);
			alert(successuserid);
}

