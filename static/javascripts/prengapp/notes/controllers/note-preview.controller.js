(function() {
    'use strict';

    angular.module('notesea.notes.controllers')
           .controller('NotePreviewController', NotePreviewController);

    NotePreviewController.$inject = ['$rootScope', '$routeParams', '$scope', '$location', 'Notes'];

    function NotePreviewController($rootScope, $routeParams, $scope, $location, Notes) {
        $scope.previewedNote = {}
        getPreviewedNote();

        function getPreviewedNote() {
            Notes.getByUUid($routeParams.uuid).then(noteSuccessFn, noteErrorFn);

            function noteSuccessFn(data, status, headers, config) {
                $scope.previewedNote = data.data;
            }

            function noteErrorFn(data, status, headers, config) {
                swal('Упс', 'У вас нету такой заметки', 'warning');
                $location.url('/notes');
            }
        }
    }

})();