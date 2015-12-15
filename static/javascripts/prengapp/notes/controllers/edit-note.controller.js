(function() {
    'use strict';

    angular.module('notesea.notes.controllers')
           .controller('EditNoteController', EditNoteController);

    EditNoteController.$inject = ['$rootScope', '$location', '$routeParams', '$scope', 'Notes', 'NoteCats'];

    function EditNoteController($rootScope, $location, $routeParams, $scope, Notes, NoteCats) {
        $scope.note = {};
        $scope.togglePublish = false;
        $scope.update = update;
        $scope.noteCategories = NoteCats.pairs;
        getEditedNote();
        $scope.cancel = cancel;
        $scope.errorFields = {}

        function getEditedNote() {
            Notes.getByUUid($routeParams.uuid).then(noteSuccessFn, noteErrorFn);

            function noteSuccessFn(data, status, headers, config) {
                $scope.note = data.data;
            }

            function noteErrorFn(data, status, headers, config) {
                swal('Упс','Данной заметки у вас нету, по всей вероятности вы ввели url вручную...','error');
                $location.url('/notes');
            }
        }

        function update() {
            /*
            * If request publishing note and note is not published yet,
            * then pass query parameter `togglepublish` with `t` value for note publishing
            * otherwise pass query parameter `togglepublish` with `f` value for publish canceling
            */
            var mode = null;

            if($scope.togglePublish) {
                if($scope.note.pub_token) {
                    mode = 'f';
                }
                else {
                    mode = 't';
                }
            }

            Notes.update($scope.note, mode).then(noteSuccessFn, noteErrorFn);

            function noteSuccessFn(data, status, headers, config) {
                $scope.note = data.data;
                $location.url('/notes/' + $scope.note.uuid);
            }

            function noteErrorFn(data, status, headers, config) {
//                swal('Статус', 'Обновление совершить не удалось', 'warning')

                for(var field in data.data) {
                    $scope.errorFields[field] = data.data[field].join(' ');
                }
                console.log(data.data);
            }
        }

        function cancel() {
            $location.url('/notes');
        }
    }

})();