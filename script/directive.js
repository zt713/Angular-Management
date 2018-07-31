angular.module('wjglApp')
    .directive('division',['zTree','measure',function (zTree,measure) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div id="treeDemo" class="ztree"></div>',
            link: function(scope,ele,attr){
                measure.get({typeId: 'area'},function(res){
                    let originData = res.origin;
                    let zNodes = transData(originData,'id','pid','children');
                    console.log(originData);
                    console.log(zNodes);
                    let setting = {	};

                    $(document).ready(function(){
                      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                    });
                    function transData(a, id, pid, children){
                        /**
                        * json格式转树状结构
                        * @param   {json}      json数据
                        * @param   {String}    id的字符串
                        * @param   {String}    父id的字符串
                        * @param   {String}    children的字符串
                        * @return  {Array}     数组
                        */
                      let r = [], hash = {}, len = a.length;
                        for(let i = 0; i < len; i++){
                            hash[a[i][id]] = a[i];    //将数组转换成对象
                        }
                        for(let j = 0; j < len; j++){
                            let aVal = a[j], hashVP = hash[aVal[pid]];  //获取每一个子对象的父对象
                            if(hashVP){    //判断父对象是否存在，如果不存在直接将对象放到第一层
                                !hashVP[children] && (hashVP[children] = []);    //如果父元素的children对象不存在，则创建数组
                                hashVP[children].push(aVal);    //将本对象压入chidlren数组
                            }else{
                                r.push(aVal);    //将不存在父对象的对象存入一级目录
                            }
                        }
                        return r;
                      }
                });
            }
        }
    }]);

angular.module('wjglApp')
    .directive('mapData',['$state','echarts',function($state,echarts){
        return {
          restrict: 'A',
          scope: {
            options: '='  //options和他所代表的值option进行绑定，option就是其控制器作用域的值
          },
          link: function(scope,ele,attr){
              let map = echarts.init(ele[0]);
              map.setOption(scope.options);
              map.on('click',function(e){
                console.log(e);
                $state.go('index.dashboard');
              })
          }
        }
    }]);
angular.module('wjglApp')
    .directive('dashboard',['echarts',function(echarts){
      return {
        restrict: 'A',
        scope: {
          options: '='
        },
        link: function(scope,ele,attr){
          let map = echarts.init(ele[0]);
          map.setOption(scope.options);
        }
      }
    }]);
