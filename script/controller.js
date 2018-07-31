angular.module("wjglApp")
	.controller("MainController",["$scope","$state","layui",function($scope,$state,layui){
		  layui.use(['element','layer'],function(){
			  let element = layui.element,
            layer = layui.layer;
			      element.render('nav');
            $scope.alterPwd = function(){
            layer.open({
                title: ['修改密码','background: #333;color: #fff;opacity: 0.7'],
                type: 1,
                content: $("#alter"),
                area: ['500px','260px'],
                maxmin: true
              })
            }
		  });
		 //判断是否有缓存，有的话就进入默认的页面
  		if(localStorage.getItem('userinfo')){
  			$state.go('index.measurement');  //二级嵌套路由的默认页面
  		}else{
  			$state.go('login');
  		}
		$scope.cancel = function(){
			//点击退出，判断缓存的checked属性是否存在，存在的话保留缓存信息
			if(JSON.parse(localStorage.getItem("userinfo")).checked){
				$state.go("login");
			}else{
				localStorage.clear(); //checked属性为false的话，则清除缓存信息，页面跳转至登录页
				$state.go('login');
			}
		};


	}])
	.controller('MeaController',['$scope','layui','measure',function($scope,layui,measure){
		layui.use(['element','layer'],function(){
			let element = layui.element;
				element.render('collapse');
		});
		measure.get(function(res){
			$scope.meaObj = res;
			$scope.items = res.frames;
		});
	}])
	.controller('QuesController',['$scope','layui','measure',function($scope,layui,measure){
		//导出Excel表格
		$scope.export = function(){
            // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
            let html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById("details").outerHTML + "</body></html>";
            // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
            let blob = new Blob([html], { type: "application/vnd.ms-excel" });
            let a = document.getElementById("export");
            // 利用URL.createObjectURL()方法为a元素生成blob URL
            a.href = URL.createObjectURL(blob);
            // 设置文件名，目前只有Chrome和FireFox支持此属性
            a.download = "问卷模板.xls";
		};
		measure.get({typeId: 'questions'},function(res){
			  $scope.results = res.ques;
			  let len = $scope.results.length;
			  layui.use(['table','layer'],function(){
                console.log($scope.results);
                  let table = layui.table,
					            layer = layui.layer;
                  table.render({
					            elem: "#ques",
					            data: $scope.results,
					            page: {
						              first: false,
						              last: false,
						              groups: 4,
						              layout: ['page','next'],
                          next: "下一页",
						              theme: "pullRight"
					            },
					            count: len,
                      limit: 20,
					            cols: [[
						            // {field:'id', title: '序号', type: 'checkbox', width: '10%'},
						              {field: "id", title: "序号", width: "10%"},
						              {field: "directory", title: "目录", width: "20%"},
						              {field: "templateName", title: "模板名称", width: "35%"},
						              {field: "note", title: "备注", width: "25%"},
						              {field: "details", title: "详情", width: "10%",toolbar: "#func-btn"}
					            ]],
                      id: "test",
					            done: function(res,curr,count){
						              let item = $(".layui-table-body tbody").find("tr");
                          //点击选中事件
                          item.on(
                            {click: function(){$(this).addClass("layui-table-click").siblings().removeClass("layui-table-click");}},
                            {dbclick: function(e){console.log(e)}}
                          );
					            }
                  });

				table.on('tool(demo)',function(obj){
					console.log(obj);
					let layEvent = obj.event;
					if(layEvent === 'detail'){
                        layer.open({
                            title: ['问卷预览','background: #333;color: #fff;opacity: 0.7'],
                            type: 1,
                            content: $('#details'),
                            area: ['600px','100%'],
                            shade: 0
                        });
					}
				});
				let active = {
					detail: function(){
						if($(".layui-table-body tbody").find("tr").hasClass('layui-table-click')){
							layer.open({
                            	title: ['问卷预览','background: #333;color: #fff;opacity: 0.7'],
                            	type: 1,
                            	content: $('#details'),
                            	area: ['600px','100%'],
                            	shade: 0
                            })
						}else{
							layer.msg('请选择一条数据！');
						}
						let checkStatus = table.checkStatus('test');
					},
					copy: function(){
                        let checkStatus = table.checkStatus('test'),
                            data = checkStatus.data;
                        // console.log(data);
					},
					add: function(){
                        let checkStatus = table.checkStatus('test'),
                            data = checkStatus.data;
                        // console.log(data);
					},
					alter: function(){
                        let checkStatus = table.checkStatus('test'),
                            data = checkStatus.data;
                        // console.log(data);
					},
					del: function(){
                        if($(".layui-table-body tbody").find("tr").hasClass('layui-table-click')){
                        	layer.confirm('是否确认删除？',{icon: 3, title: '提示'},function(index){
                       			$('.layui-table-click').remove();
                       			layer.msg('删除成功',{
                       				time: 2000,
                       				icon: 1,
                       				shade: 0.5
                       			});
                       			layer.close(index);
                       		});
                        }else{
                        	layer.msg('请选择一条数据！');
                        }

					}
				};
				$('.btn-group .layui-btn').on('click',function(){
					let type = $(this).data('type');
					active[type] ? active[type].call(this) : '';
				});

               	$scope.search = function(){
                   	let load = table.reload('test');
               		// console.log(load.config);
               		// console.log($('.layui-table tbody').find("tr").eq(64));
               		$(".layui-form").hide();	//隐藏layui自动生成的表格
               		$("#quesAll").show();		//让模板当中的表格显示出来
               		$("#quesAll tbody").find("tr").hide();	//让模板当中的表格行隐藏
                   if($("#directory").val() === "" && $("#tempName").val() === ""){
                   	//判断两个输入框的值是否为空，如果为空的话，则让layui的表格显示出来，模板数据的表格隐藏
                       $(".layui-form").show();
                       $("#quesAll").hide();
                   }else if($("#directory").val() !== "" && $("#tempName").val() === ""){
                       // 判断目录输入框不为空且模板输入框为空的情况
                       for (let i = 0; i < len; i++){
                       		if($scope.results[i].directory.indexOf($("#directory").val()) !== -1){
                       			//遍历模板表格里面的所有的数据，当目录里面字符串的值是模板数据中某一项的子串的时候
                       			let index = $scope.results[i].id - 1;	//记录下ID值，减1赋给index，ID值从1开始，所以计算的时候减1
                       			// console.log(index - 1);
                                $("#quesAll tbody").find("tr").eq(index).show();	//让下标为index的表格行显示出来
							}
					   }
				   }else if($("#directory").val() === "" && $("#tempName").val() !== ""){
                       for (let i = 0; i < len; i++){
                           if($scope.results[i].templateName.indexOf($("#tempName").val()) !== -1){
                               let index = $scope.results[i].id - 1;
                               $("#quesAll tbody").find("tr").eq(index).show();
                           }
                       }
				   }else {
                       for (let i = 0; i < len; i++){
                           if($scope.results[i].templateName.indexOf($("#tempName").val()) !== -1 && $scope.results[i].directory.indexOf($("#directory").val()) !== -1){
                               let index = $scope.results[i].id - 1;
                               $("#quesAll tbody").find("tr").eq(index).show();
                           }
                       }
				   }
			   	};
			  });
		});
	}])
    .controller('AnalyController',['$scope',function($scope){
        $scope.option = {
          tooltip : {
            trigger: 'item'
          },
          // visualMap: {
          //   min: 0,
          //   max: 2500,
          //   left: 'left',
          //   top: 'bottom',
          //   text:['高','低'],           // 文本，默认为数值文本
          //   calculable : true
          // },
          toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series : [
            {
              
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name: '北京'},
                {name: '天津'},
                {name: '上海'},
                {name: '重庆'},
                {name: '河北'},
                {name: '河南'},
                {name: '云南'},
                {name: '辽宁'},
                {name: '黑龙江'},
                {name: '湖南'},
                {name: '安徽'},
                {name: '山东'},
                {name: '新疆'},
                {name: '江苏'},
                {name: '浙江'},
                {name: '江西'},
                {name: '湖北'},
                {name: '广西'},
                {name: '甘肃'},
                {name: '山西'},
                {name: '内蒙古'},
                {name: '陕西'},
                {name: '吉林'},
                {name: '福建'},
                {name: '贵州'},
                {name: '广东'},
                {name: '青海'},
                {name: '西藏'},
                {name: '四川'},
                {name: '宁夏'},
                {name: '海南'},
                {name: '台湾'},
                {name: '香港'},
                {name: '澳门'}
              ]
            }
          ]
        }
    }])
    .controller('DashController',['$scope',function($scope){
      $scope.option = {
        title: {
          text: '第三方综合评估指数'
        },
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter:'{value}%'},
            data: [{value: 50, name: '完成率'}]
          }
        ]
      }
    }]);
