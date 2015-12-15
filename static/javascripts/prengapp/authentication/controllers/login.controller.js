(function() {
    'use strict';

    angular
        .module('notesea.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

    function LoginController($location, $scope, Authentication) {
        var vm = this;

        vm.login = login;

        activate();

        function activate() {
            if (Authentication.isAuthenticated()) {
                $location.url('/notes');
            }
        }

        function login() {
            Authentication.login(vm.username, vm.password);
        }
    }
})();