(function() {
    'use strict';

    angular
        .module('notesea.authentication', [
            'notesea.authentication.controllers',
            'notesea.authentication.services'
        ]);

    angular
        .module('notesea.authentication.controllers', []);

    angular
        .module('notesea.authentication.services', ['ngCookies']);

})();