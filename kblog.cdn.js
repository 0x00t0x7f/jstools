/*
 * kblog使用cdn加载js失败则加载本地文件
 * date: 2017-02-05
 * by kuing
 */
//单独加载 jquery文件
function jqueryCdn(filelist){
	var _ret =  ((function  loadfile(num){
		var script = document.createElement("script");
		script.src = filelist[num];
		script.onload = function(){
			document.body.appendChild(script);
		}
		script.onerror = function(){
			num += 1;
			if(num < filelist.length) loadfile(num);
		}
		script.onload();
		return true;
	})(0))? true:false;   //函数执行完毕 返回true
	return _ret;
}

function jsAndcssLoad(filelist,callback){
	//对于依赖于 jquery 的js先行判断
	if(typeof callback == 'function'){
		var flag = callback(["http://cdn.bootcss.com/jquery/2.1.1/jquery.min.js",
        "js/jquery-2.1.1.min.js"
        ]);
	}
	if(!window.jQuery){
		//var flag = jqueryCdn(["http://cdn.bootcss.com/jquery/2.1.1/jquery.min.js",
        //"js/jquery-2.1.1.min.js"
        //]);
        var stop = setInterval(function(){
        	if(window.jQuery) {
        		//console.log("Jquery 已经加载");
        		clearInterval(stop);
        		//jquery加载完毕 执行后续 cdn js文件加载
        		for(var i in filelist){
					var jsfilelist = filelist[i];
					(function loadFile(num){
						var script = document.createElement("script");
						script.src = jsfilelist[num];
						//var _off = false;
						script.onload = function(e){
							//console.log("加载 远程 cdn文件");
							document.body.appendChild(script);
							//document.head.write(unescape('%3Cscript src='+filelist[num]+'%3E%3C/script%3E'));
						}
						script.onerror = function(){
							//console.log("加载本地 js 文件");
							num += 1;
							if(num < filelist.length) loadFile(num);
						}
						script.onload();
					})(0);
				}
        		return true;}
        },50);//时间间隔50ms确认一次
		if(!flag) return false; //不加载任何 cdn 文件跳出
	}	
}

//调用 参数是需要加载的文件的列表,每个列表包含一份cdn文件和本地文件
jsAndcssLoad([
	["http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js",
	"js/bootstrap.min.js"]
],jqueryCdn);