(function() {
    'use strict';

    angular
        .module('notesea.notes.controllers')
        .controller('NotesCtrl', NotesCtrl);

    NotesCtrl.$inject = ['$scope', 'Notes', 'NoteCats', 'DateStaff', 'ArrayStaff', 'Authentication', 'ngDialog'];

    function NotesCtrl($scope, Notes, NoteCats, DateStaff, ArrayStaff, Authentication, ngDialog) {
        $scope.notes = [];
        $scope.strV = 'cdRUSHAN';
        $scope.getShareInfo = getShareInfo;

        $scope.filterActive = true;
        $scope.sortActive = false;
        $scope.sortFields = [];
        $scope.toggleToSortFields = toggleToSortFields;
        $scope.sortBy = sortBy;
        $scope.addToSortFields = addToSortFields;
        $scope.removeFromSortFields = removeFromSortFields;
        $scope.hasField = ArrayStaff.hasField;
        $scope.inSortFields = inSortFields;
        $scope.getSortableIndex = getSortableIndex;
        $scope.deleteNote = deleteNote;
        $scope.noteCats = NoteCats.pairs;
        $scope.noteFilterCats = angular.copy(NoteCats.pairs);

        $scope.noteFilterCats.push({
            short: 'AL',
            value: 'Все заметки'
        });

        $scope.filterFields = {
            startDate: DateStaff.incrDateByMonth(new Date(), -1),
            endDate: DateStaff.getCurrentDate()
        };
        $scope.performFilter = performFilter;

        fillNotes();
        pickmeupStartDate();
        pickmeupEndDate();

        function performFilter() {
            Notes.filterBySeveralFields($scope.filterFields)
                  .then(filterSuccessFn, filterErrorFn);

            function filterSuccessFn(data, status, headers, config) {
                $scope.notes = data.data;
            }

            function filterErrorFn(data, status, headers, config) {
                console.log(data.data);
            }
        }

        function fillNotes() {
            Notes.all().then(notesSuccessFn, notesErorFn);
            function notesSuccessFn(data, status, headers, config) {
                $scope.notes = data.data;
            }
            function notesErorFn(data, status, headers, config) {
                swal('О-о', 'Произошла какая-то ошибка', 'error');
            }
        }

        function pickmeupStartDate() {
            $('#startDateSearchFilter').pickmeup({
                format  : 'Y-m-d',
                max: DateStaff.getCurrentDate(),
                hide_on_select: true,
                change: function(formattedDate) {
                    $scope.filterFields.startDate = formattedDate;
                    $scope.$apply();
                }
            });
        }

        function pickmeupEndDate() {
            $('#endDateSearchFilter').pickmeup({
                format  : 'Y-m-d',
                max: DateStaff.getCurrentDate(),
                hide_on_select: true,
                change: function(formattedDate) {
                    $scope.filterFields.endDate = formattedDate;
                    $scope.$apply();
                }
            });
        }

        function sortBy() {
            Notes.sortByMultipleFields($scope.sortFields)
                    .then(sortSuccessFn, sortErrorFn);

            function sortSuccessFn(data, status, headers, config) {
                $scope.notes = data.data;
            }

            function sortErrorFn(data, status, headers, config) {
                swal('Неудача','Произошла ошибка на сервере', 'warning');
            }
        }

        function toggleToSortFields(field) {
            var index = $scope.sortFields.indexOf(field)
            if (index !== -1) {
                $scope.sortFields.splice(index, 1)
            }
            else {
                $scope.sortFields.push(field);
            }
        }

        function addToSortFields(field) {
            var onlyFields = ArrayStaff.getItemsBySeparator($scope.sortFields);
            var index = onlyFields.indexOf(field);

            if(index === -1) {
                $scope.sortFields.push(field + ':asc');
            }
            else {
                var sourceField = $scope.sortFields[index];
                var fieldAndDir = sourceField.split(':');
                if(fieldAndDir.length > 1) {
                    var dir = fieldAndDir[fieldAndDir.length-1];
                    var newDir = dir == 'asc' ? 'desc' : 'asc';
                    $scope.sortFields[index] = fieldAndDir[0] + ':' + newDir;
                }
                else {
                    $scope.sortFields[index] = fieldAndDir[0] + ':asc';
                }
            }
        }

        function removeFromSortFields(field) {
            var onlyFields = ArrayStaff.getItemsBySeparator($scope.sortFields);
            var index = onlyFields.indexOf(field);
            if(index !== -1) {
                $scope.sortFields.splice(index, 1);
            }
        }

        function inSortFields(field) {
            return ArrayStaff.hasField($scope.sortFields, field);
        }

        function getSortableIndex(field) {
            return ArrayStaff.getIndexOfPositionByField($scope.sortFields, field);
        }

        function deleteNote(noteId) {
            Notes.destroy(noteId).then(noteSuccessFn, noteErrorFn);

            function noteSuccessFn(data, status, headers, config) {
                $scope.notes.splice(data.data, 1);
            }

            function noteErrorFn(data, status, headers, config) {
                swal('Ошибка', 'К сожалению, не удалось совершить действие, повторите попытку позже', 'error');
            }
        }

        function getShareInfo(note) {
            var templStr = "<div class='form-group modal-body-2'><label for='share-ref' class='control-label'>Ссылка для обзего доступа</label>";
            templStr += '<input type="text" name="share-ref" class="form-control" value="http://localhost:8000/published_notes/' + note.pub_token + '" name="ref"></div>';
            ngDialog.open({
                template: templStr,
                className: 'ngdialog-theme-default',
                plain: true
            });
        }
    }
})();