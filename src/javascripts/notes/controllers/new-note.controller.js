(function() {
    'use strict';

    angular.module('notesea.notes.controllers')
           .controller('NewNoteController', NewNoteController);

    NewNoteController.$inject = ['$location', '$scope', 'Notes', 'NoteCats'];

    function NewNoteController($location, $scope, Notes, NoteCats) {
        $scope.submit = submit;
        $scope.noteCategories = NoteCats.pairs;
        $scope.note = {}
        $scope.cancel = cancel;

        function submit() {
            Notes.create($scope.note).then(succ, err);
            function succ(data, status, headers, config) {
                window.location = '/notes/' + data.data.uuid;
            }

            function err(data, status, headers, config) {
                console.log(JSON.stringify(data.data));
            }
        }

        function cancel() {
            $location.url('/notes');
        }
    }

})();