(function() {
    'use strict';

    angular.module('notesea.config')
            .config(config);

    config.$inject = ['$locationProvider'];

    function config($locationProvider, $rootScope) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();