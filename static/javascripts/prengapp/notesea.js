(function() {
    'use strict';

    angular.module('notesea', [
        'notesea.config',
        'notesea.routes',
        'notesea.utils',
        'notesea.authentication',
        'notesea.layout',
        'notesea.notes'
    ]);

    angular.module('notesea.config', []);

    angular.module('notesea.routes', ['ngRoute']);

    angular.module('notesea')
            .run(run);

    run.$inject = ['$http', '$rootScope', '$window'];

    function run($http, $rootScope, $window) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';

        $rootScope.$on('$viewContentLoaded', function(){
            $.material.init();
        });
    }
})();