//引入layui的服务
angular.module('wjglApp')
	.factory('layui',function(){
		return layui;
	});
//模拟从服务器获得数据
angular.module('wjglApp')
	.factory('measure',['$resource',function($resource){
		return $resource('datajson/:typeId.json',{},{
			get: {
				method: 'GET',
        params: { typeId: 'measurement' }
			}
		})
	}]);
//引入zTree的服务
angular.module('wjglApp')
	.factory('zTree',function(){
		return $.fn.zTree;
	});
//引入echarts服务
angular.module('wjglApp')
  .factory('echarts',function(){
    return echarts;
  });

