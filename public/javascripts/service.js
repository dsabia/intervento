angular.module('interventoService', [])

	// super simple service
	// each function returns a promise object
	.factory('Intervento', ['$http',function($http) {
		return {
			addTecnico : function(tecnico) {
				console.log(tecnico.nome + ' ' + tecnico.cognome);
				return $http.post('/tecnico/add', tecnico);
			},
			getTecnico : function() {
				return $http.get('/tecnico');
			},
			homepage : function() {
				return $http.get('/');
			}
		}
	}]);
