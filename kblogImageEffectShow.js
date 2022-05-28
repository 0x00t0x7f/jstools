/*
* 加载主页巨幕图片轮播-动态加载效果代码全部动态生成(包含css,js)
* 建议图片大小： 1400*406(400)/幅*3
* arguments列表:图片列表,效果-启动淡入淡出效果(依赖于jquery),速度(毫秒),开启nav导航栏透明化.
* by kuing
* date: 2017-02-06
*/
function loadImageShowScreen(imglist,position,effect,speed,navopacity){
	if(!document.getElementById || !document.getElementsByTagName || !document.createElement) return false;
	if(document.getElementsByTagName("nav").length == 0){
		return false;
	}else{
		if(0>speed && 10<speed){
			alert("速率参数合法值应该在0~10范围之内,请重新设置");
			return false;
		}
		var showeffect = effect;
		//此插件如果启动效果需依赖jquery
		if(!window.jQuery && showeffect){
			showeffect = false;
		}
		var nav = document.getElementsByTagName("nav")[0];
		//document.body.appendChild(nav);
		if(navopacity){
		  document.getElementsByTagName("nav")[0].setAttribute("style","background-color:transparent");
		  document.getElementById("aboutme").getElementsByTagName("span")[0].setAttribute("style","color:#20D8BE");
		  //默认释放导航栏
		  window.onload = function(){
		     document.getElementById("queryinput").setAttribute("style","border-color:transparent;width:280px;margin-left:50px;border-radius:3px 0px 0px 3px;");
		     document.getElementsByClassName("glyphicon-magnet")[0].click();
		     document.getElementsByClassName("glyphicon-magnet")[0].className = "glyphicon glyphicon-paperclip";
		}
		}
		var div = document.createElement("div");
		div.setAttribute("id","showscreenimg");
		div.setAttribute("class","hidden-xs hidden-sm");
		//div.setAttribute("class","container-fluid");
		div.setAttribute("style","width:100%;margin-top:60px");
		//div.setAttribute("class","hidden-xs hidden-sm");
		var img = document.createElement("img");
		var _imagelist = imglist;
		img.setAttribute("src",_imagelist[_imagelist.length-1]);
		img.setAttribute("alt","巨幕图片展示");
		//img.setAttribute("style","width: 100%;height: 860px;");
		img.setAttribute("style","width: 100%;height: 406px;");
		div.appendChild(img);
  		//可选-插入位置
  		if(position == "before"){
		   nav.parentNode.insertBefore(div,nav);
 		}
 		if(position == "after"){
		   insertAfter(div,nav);
		}
		//开始节点&图片库数量
		var start = 0;
		var _num = _imagelist.length;
		//设置速度和循环轮播
		setInterval(function(){
			start = (start/_num == 1)? 0:start;
			//console.log("正在展示第 "+(start+1)+" 张图片");
			var img = document.getElementById("showscreenimg");
			if(showeffect){
				$("div#showscreenimg>img").fadeOut(200,function(){
					img.getElementsByTagName("img")[0].setAttribute("src",_imagelist[start]);
					start += 1;
					$(this).fadeIn(300);
				});
			}else{
				img.getElementsByTagName("img")[0].setAttribute("src",_imagelist[start]);
				start += 1;
			}
		},speed*1000);
	}
	
}
function insertAfter(newElement,targetElement){
	var target = targetElement.parentNode;
	if(target.lastChild == targetElement){
		target.appendChild(newElement)
	}else{
		target.insertBefore(newElement,targetElement.nextSibling);
	}
}

(function(){
	if(arguments.length != 5) return false;
	loadImageShowScreen(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
})(["http://static.metastdio.com/01new.jpg","http://static.metastdio.com/02new.jpg","http://static.metastdio.com/05new.jpg"],"before",true,6,true)
