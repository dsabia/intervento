angular.module('interventoController', [])
  .controller('mainController', function($scope, $http, $location, $window, Intervento) {

  $scope.addTecnico = function(){
      console.log('Some validation... - nome:'+$scope.form.nome + ' cognome:'+$scope.form.cognome );
      Intervento.addTecnico($scope.form)
        .success(function(data) {
          console.log('Success');
          redirect($window, '/tecnico')
				});
      }
});

function redirect($window, url){
  $window.location.href = url;
}
