(function() {
    'use strict';

    angular.module('notesea.authentication.controllers')
           .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$location', '$scope', 'Authentication'];

    function RegisterCtrl($location, $scope, Authentication) {
        $scope.user = {}
        $scope.register = register;

        function register() {
            Authentication.register($scope.user.email, $scope.user.password, $scope.user.username);
        }
    }
})();