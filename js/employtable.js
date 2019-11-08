var thisindex;
var globle_selected_id = [];
$(document).ready(function(){
	
	//关闭基本信息模态框按钮
	$("#closebaseinfobtn").click(function(){
		$("#employbaseinfo_modal").modal("hide");
		init_employbaseinfo_modal();
	});
	
	//关闭详细信息模态框按钮
	$("#closedetailinfobtn").click(function(){
		$("#employdetail_modal").modal("hide");
		init_employdetail_modal();
	});
	
	//点击导出
	$("#output").click(function(){
		console.log(globle_selected_id);
	});
	
	
});

//初始化员工管理列表
function init_showemploytable(){
    $("#tableemploydata").bootstrapTable('destroy');
    let ths = [{
        field: 'checkbox',
        checkbox: true,
        visible:true,
        //修改
        formatter: function(value, row, index) {
            for(i = 0;i<globle_selected_id.length;i++){
                if(row.userid == globle_selected_id[i]){
                    return {
                        disabled : false,//设置是否可用
                        checked : true//设置选中
                    };
                }
            }
            return value;
        }
    },{
        field: 'serialnumber',
	    title: '序号',
	    visible:true,
	    formatter: function (value, row, index) {
	    	index++;
	        return thisindex + index;
	        
	    }
    },{
        field: 'userid',
        title: 'User_ID',
        visible:true,
        class: 'useridclass'
    },{
        field: 'name',
        title: '姓名',
        visible:true,
        class:'nameclass'
    },{
        field: 'gender',
        title: '性别',
        visible:true,
        class:'genderclass'
    },{
        field: 'dept',
        title: '部门名',
        visible:true,
        class:'deptclass'
    },{
        field: 'job',
        title: '职位',
        visible:true,
        class:'jobclass',
    },{
        field: 'level',
        title: '级别',
        visible:true,
        class:'levelclass'
    },{
        field: 'address',
        title: '地区',
        visible:true,
        class:'addressclass'
    },{
        field: 'edit',
        title: '操作',
        width: 100,
        formatter: function (value, row, index) {
            if (value) {
                return value;
            } else {
                return '<div><div class="btn btn-warning" id="baseinfo"  title="基本信息"><span class="glyphicon glyphicon-th-list" ></span></div>'+'<div class="btn btn-info" style="margin-left: 10px;" id="detailinfo" title="详细信息"><span class="glyphicon glyphicon-list"></span></div>';
            }
        },
        events: {               // 编辑按钮组事件
            'click #baseinfo': function (event, value, row, index) {
               setbaseinfotabledata(row.userid);
            },
            'click #detailinfo': function (event, value, row, index) {
               setdetailinfotabledata(row.userid);
            }
        },
        visible:true,
        class:'editclass'
    }];


    $("#tableemploydata").bootstrapTable({
        method: 'post',
        dataType:'json',
        contentType:'application/json;charset=UTF-8',
        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getAlldatas",
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        formatNoMatches : function() {
            return '无符合条件的记录';
        },
        formatLoadingMessage : function() {
            return "请稍等，正在加载中...";
        },
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        dataField: "adddatas",
        queryParamsType: '',
        queryParams:queryParamsByBegin,
        toolbar : "#toolbar",
        striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 8,                       //每页的记录行数（*）
        pageList: [5, 8, 10, 15, 20, 25, 30],         //可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: false,                //是否启用点击选中行
        showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        columns: ths,
        onCheck: function(row){
            globle_selected_id.push(row.userid);
        },
        onUncheck: function (row) {
            var index = globle_selected_id.indexOf(row.userid);
            globle_selected_id.splice(index,1);
        },
        onLoadSuccess: function (data) {
            thistable_data = $('#tableemploydata').bootstrapTable('getData');
            if (thistable_data == '' || thistable_data == null) {
                MYnowpage = $('#tableemploydata').bootstrapTable('getOptions').pageNumber ;
                $('#tableemploydata').bootstrapTable('selectPage', parseInt(MYnowpage));
            }
        }

    });

};

function queryParamsByBegin(params){
	var serachtext = $("#searchinput").val();
    let re  = {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        searchtext: serachtext
    }
    
	if(params.pageNumber == 1){
		thisindex = 0;
	}else{
		thisindex = (params.pageNumber - 1) * params.pageSize;
	}
	
    return JSON.stringify(re);
};

//初始化基本信息模态框
function init_employbaseinfo_modal(){
	$("#showuserid").val("");
	$("#showname").val("");
	$("#showtel").val("");
	$("#shownat").val("");
	$("#showgen").val("");
	$("#showemail").val("");
	$("#showsid").val("");
	$("#showlivcity").val("");
	$("#showsal").val("");
}

//根据userid查找基本信息并填充模态框
function setbaseinfotabledata(userid){
	var row_info = {"userid":userid} ;
	$.ajax({
        type:"POST",
        dataType:"json",
        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getBaseInfo",
        contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
            if(data.code == 0){
            	init_employbaseinfo_modal();
            	$("#showuserid").val(data.baseinfo["userId"]);
            	$("#showname").val(data.baseinfo["ename"]);
            	$("#showemail").val(data.baseinfo["email"]);
            	$("#showtel").val(data.baseinfo["tel"]);
            	$("#showsid").val(data.baseinfo["sid"]);
            	$("#shownat").val(data.baseinfo["nation"]);
            	$("#showlivcity").val(data.baseinfo["liveCity"]);
            	$("#showgen").val(data.baseinfo["gender"]);
            	$("#showsal").val(data.baseinfo["sal"]);
            	
               $("#employbaseinfo_modal").modal("show");
            }else{
            	alert("数据库中没有该员工的基本信息！")
        	}
        },
        error:function(data){
            alert("获取员工基本信息连接错误，请重试！");
        }
    });
};

//初始化详细信息模态框
function init_employdetail_modal(){
	$("#showdetailuserid").val("");
	$("#showedu").val("");
	$("#showedulev").val("");
	$("#showcerti").val("");
}

//根据userid查找详细信息并填充模态框
function setdetailinfotabledata(userid){
	var row_info = {"userid":userid} ;
	$.ajax({
        type:"POST",
        dataType:"json",
        url:"http://127.0.0.1:8050/EMPLOYEE-SERVICE/employeeApi/getDetailInfo",
        contentType:'application/json;charset=UTF-8',
	    data:JSON.stringify(row_info),
        async:false,
        xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
        success:function(data){
            if(data.code == 0){
            	init_employdetail_modal();
            	$("#showdetailuserid").val(data.detailinfo["userId"]);
				$("#showedu").val(data.detailinfo["education"]);
				$("#showedulev").val(data.detailinfo["educationLevel"]);
				$("#showcerti").val(data.detailinfo["certificate"]);
            	
               $("#employdetail_modal").modal("show");
            }else{
            	alert("数据库中没有该员工的详细信息！")
        	}
        },
        error:function(data){
            alert("获取员工详细信息连接错误，请重试！");
        }
    });
}
