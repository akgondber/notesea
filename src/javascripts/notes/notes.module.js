(function() {
    'use strict';

    angular
        .module('notesea.notes', [
            'notesea.notes.services',
            'notesea.notes.controllers',
            'notesea.notes.directives',
            'ngDialog'
        ]);

    angular.module('notesea.notes.services', []);

    angular.module('notesea.notes.controllers', []);

    angular.module('notesea.notes.directives', []);

})();