'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, MessageService) {
  	$scope.chat = {};
    $scope.messages = [];
    MessageService.getMessages().then(function(data) {
  		$scope.messages = data;
	});

	$scope.sendMessage = function(){
		if ($scope.chat.msg === ''){
			return;
		} 
		MessageService.postMessage($scope.chat).then(function(data) {
			$scope.chat.msg = '';
			$scope.chat.user = '';
  			$scope.messages = data;
		});
	};
  });
