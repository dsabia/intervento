// angular js file
'use strict';

var app = angular.module('interventoApp',[]);

app.controller('interventoController', function($scope, $http, $location, $window) {

  $scope.addTecnico = function(){
      console.log('Some validation... - nome:'+$scope.form.nome + ' cognome:'+$scope.form.cognome );


      $http.get('/tecnico', $window)
        .then(function(res, $window){})
      redirect($window, '/tecnico');

        //$scope.$apply(function() { $location.path("/tecnico"); });
  }
});

function redirect($window, url){
  $window.location.href = url;
}
