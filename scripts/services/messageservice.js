'use strict';

angular.module('chattyApp')
  .service('MessageService', function MessageService($q, $http) {
    this.getMessages = function(){
    	var defer = $q.defer();
    	$http.get('http://localhost:8500').then(function(data){
    		defer.resolve(data.data);
    	});
    	return defer.promise;
    };
    this.postMessage = function(message){
    	var defer = $q.defer();
    	$http.post('http://localhost:8500/messages', message).then(function(data){
            console.log(data.data);
    		var messages = data.data;
    		defer.resolve(messages);
    	});
    	return defer.promise;
    };
  });
