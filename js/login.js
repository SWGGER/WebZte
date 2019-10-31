var userId="";
$(document).ready(function(){
	var userid_reg=false;var psw_reg=false;var code_reg=false;
	  //账号的格式校验及查重
	$("#user_id").bind("blur",function(){
		var regId=/^[A-Za-z0-9]+$/;
		var loginId=$("#user_id").val();
		if(loginId!=""){
			if(regId.test(loginId)){
				$("#userid_reg").html("</br><img src='../img/correct.png'/>格式正确");
				userid_reg=true;
			}else{
				$("#userid_reg").html("</br><img src='../img/error.png' />格式错误");
			}
		}else{
			$("#userid_reg").html("</br><img src='../img/error.png' />不可为空");
		}
	});
	$("#psw").bind("blur",function(){
		var regId=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/;
		var pswId=$("#psw").val();
		if(pswId!=""){
			if(regId.test(pswId)){
				$("#psw_reg").html("</br><img src='../img/correct.png' />格式正确");
				psw_reg=true;
			}else{
				$("#psw_reg").html("</br><img src='../img/error.png' />格式错误");
			}
		}else{
			$("#psw_reg").html("</br><img src='../img/error.png' />不可为空");
		}
	});
	//验证码判断
	$("#code").bind("blur",function(){		
		if($("#code").val()!=""){
			$.session.set('verCode',$("#code").val());
			$.ajax({
			    type: "GET",
			    url: "http://localhost:8050/USER-SERVICE/userApi/validImage",
			    contentType:'application/json;charset=UTF-8',
			    dataType: "json",
			    success: function(data){
			    	if(data=="200"){
			    		code_reg=true;
			    	}	
			    },
			    error:function(data){
			        alert("连接失败！请检查连接！");
			    }
		    	});
		}else{
			alert("验证码不可为空！")
		}	
})
//验证码刷新
function changeImg(){
        var img = $("#img");
        img.src = "http://localhost:8050/USER-SERVICE/userApi/getImage?date=" + new Date();
}
//登录判断
function login_ready(){	
	//判断验证码正确
	if(!code_reg){
		alert("验证码错误!请重新输入！");
	}
	//判断用户密码正确
	if(userid_reg && psw_reg && code_reg){
		var login_info={"userId":$("#user_id").val(),"password":$("#psw").val()};
		$.ajax({
		    type: "POST",
		    url: "http://localhost:8050/USER-SERVICE/userApi/login",
		    contentType:'application/json;charset=UTF-8',
		    dataType: "json",
		    data: JSON.stringify(login_info),
		    success: function(data){
		    	if(data.code==0){
		    		if(data.msg=="success"){
		    			userId=data.payload.get("userId");
		    			console.log(userId);
		    			alert("登陆成功！");
		    		}else{
		    			 alert("用户不存在！请重新输入！");
		    		}
		    	}
		    },
		    error:function(data){
		        alert("连接失败！请检查连接！");
		    }
    	});
	}else{
		alert("格式错误，请重新输入！")
	}
}
