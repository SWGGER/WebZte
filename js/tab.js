var FancyForm=function(){
	return{
		inputs:"#aaaaa",
		setup:function(){
			var a=this;
			this.inputs=$(this.inputs);
			a.inputs.each(function(){
				var c=$(this);
				a.checkVal(c)
			});
			a.inputs.on("keyup blur", "#aaaa", function(){
				var c=$(this);
				a.checkVal(c);
			})

		},checkVal:function(a){
			a.val().length>0?a.parent("li").addClass("val"):a.parent("li").removeClass("val")
		}
	}
}();




$(document).ready(function() {
	FancyForm.setup();
});


var searchAjax=function(){};
var G_tocard_maxTips=10;

$(function(){(
	function(){
		
		var a=$(".plus-tag");
		
		$(document).on("click",'a em',function(){
			var c=$(this).parents("a"),b=c.attr("title"),d=c.attr("value");
			delTips(b,d)
		});
		
		
		hasTips=function(b){
			var d=$("a",a),c=false;
			d.each(function(){
				if($(this).attr("title")==b){
					c=true;
					return false
				}
			});
			return c;
		};

		isMaxTips=function(){
			return $("a",a).length>=G_tocard_maxTips;
		};

		setTips=function(c,d){
			if(hasTips(c)){
				return false
			}if(isMaxTips()){
				alert("最多添加"+G_tocard_maxTips+"个标签！");
				return false
			}
			if($("a",a).length<5){
				$("#moretagsbobx").hide();
				var b=d?'value="'+d+'"':"";
				a.append($("<a "+b+' title="'+c+'" href="javascript:void(0);" style="display:block"><span>'+c+"</span><em></em></a>"));
			}else{
				$("#moretagsbobx").show();
				var b=d?'value="'+d+'"':"";
				a.append($("<a "+b+' title="'+c+'" href="javascript:void(0);" style="display:none"><span>'+c+"</span><em></em></a>"));
			}
			searchAjax(c,d,true);
			return true
		};

		delTips=function(b,c){
			if(!hasTips(b)){
				return false
			}
			$("a",a).each(function(){
				var d=$(this);
				if(d.attr("title")==b){
					d.remove();
					if($("a",a).length>4){
						$("a",a)[4].style.display="block";
					}
					
					if($("a",a).length>5){
						$("#moretagsbobx").show();
					}else{
						
						$("#moretagsbobx").hide();
					}
					return false
				}
			});
			searchAjax(b,c,false);
			return true
		};

		getTips=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("title"))
			});
			return b
		};

		getTipsId=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value"))
			});
			return b
		};
		
		getTipsIdAndTag=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value")+"##"+$(this).attr("title"))
			});
			return b
		}
	}
	
)()});

var searchAjax = function(name, id, isAdd){
	setSelectTips();
};

// 搜索
(function(){
	var $i = $('#aaaaa');
	$i.keyup(function(e){
		if(e.keyCode == 13){
			var name = $i.val().toLowerCase();
			if(name != '') setTips(name,-1);
			$i.val('');
			$i.select();
		}
	});
})();

// 推荐标签
(function(){
	// 更新高亮显示
	setSelectTips = function(){
		var arrName = getTips();
		if(arrName.length){
			$('#myTags').show();
		}else{
			$('#myTags').hide();
		}
	}
})();
