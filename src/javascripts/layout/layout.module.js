(function() {
    'use strict';

    angular
        .module('notesea.layout', [
            'notesea.layout.controllers',
            'notesea.layout.directives'
        ]);

    angular
        .module('notesea.layout.controllers', ['ngCookies']);

    angular
        .module('notesea.layout.directives', []);
})();