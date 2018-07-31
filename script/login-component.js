angular.module('wjglApp')
  .component('login',{
  	templateUrl: 'tpl/login.html',
  	controller: function($scope,$http,$state,$document,layui){
  	  layui.use('layer',function(){
  	    let layer = layui.layer;
        $scope.submitLogin = function(){
          $http({
            url: 'https://www.apiopen.top/login?key=00d91e8e0cca2b76f515926a36db68f5',
            method: 'POST',
            params: {
              phone: $scope.admin.username,
              passwd: $scope.admin.passwd
            },
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
          }).then(function(res){
            if(res.data.code === 200){
              let userinfo = {
                phone: res.data.data.phone,
                passwd: res.data.data.passwd,
                name: res.data.data.name,
                checked: $("#rember_me").prop("checked")	//保存checkbox中checked属性的值
              };
              localStorage.setItem('userinfo',JSON.stringify(userinfo));
              // console.log(1);
              $state.go('index.measurement');
            }else{
              let msg = res.data.msg;
              layer.msg(msg,{time: 2000});
              $state.go('login');
            }
          })
        };
      });
  		if(localStorage.getItem('userinfo')){	//判断缓存信息是否存在
  			let userinfo = JSON.parse(localStorage.getItem("userinfo"));	//获得缓存的对象
  			$("#rember_me").prop("checked",true);	//将checkbox复选框设置为true
  			$scope.admin = {	//将输入框的值设置为缓存中的值
  				username: userinfo.phone,
  				passwd: userinfo.passwd
  			}
  		}
      $document.one('keypress',function(e){
        // console.log(e);
        if(e.keyCode === 13){
          $scope.submitLogin();
        }
      });
 	  }
  });
