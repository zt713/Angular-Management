angular.module('wjglApp')
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  	$urlRouterProvider.otherwise('/login');				//一级路由的默认页面
  	$stateProvider
  	  	.state('index',{
  	  		  url: '/index',
  	  		  templateUrl: 'tpl/main.html'
      	})
  	  	.state('login',{
  	  		  url: '/login',
  	  		  template: '<login></login>'
  	  	})
  	  	.state('index.measurement',{
  	  		  url: '/measurement',
  	  		  templateUrl: 'tpl/measurement.html'
  	  	})
      	.state('index.questions',{
        	  url: '/questions',
        	  templateUrl: 'tpl/questions.html'
      	})
      	.state('measure',{
        	  url: '/measure',
        	  templateUrl: 'tpl/measurement.html'
      	})
		    .state('index.project',{
		        url: '/project',
			      templateUrl: 'tpl/project.html'
		    })
		    .state('index.judge',{
			      url: '/judge',
			      templateUrl: 'tpl/judge.html'
		    })
		    .state('index.questionnaire',{
			      url: 'questionnaire',
			      templateUrl: 'tpl/questionnaire.html'
		    })
		    .state('index.users',{
			      url: '/users',
			      templateUrl: 'tpl/users.html'
		    })
		    .state('index.dictionary',{
			      url: '/dictionary',
			      templateUrl: 'tpl/dictionary.html'
		    })
		    .state('index.area',{
			      url: '/area',
			      templateUrl: 'tpl/area.html'
		    })
		    .state('index.analysis',{
			      url: '/analysis',
			      templateUrl: 'tpl/analysis.html'
		    })
		    .state('index.attendence',{
			      url: '/attendence',
			      templateUrl: 'tpl/attendence.html'
		    })
        .state('index.dashboard',{
            url: '/dashboard',
            templateUrl: 'tpl/dashboard.html'
        })
}]);
