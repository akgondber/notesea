(function() {
    'use strict';

    angular.module('notesea.notes.services')
           .factory('Notes', Notes);

    Notes.$inject = ['$http'];

    function Notes($http) {
        var filteredUrl = '/api/v1/filterednotes/';
        var Notes = {
            all: all,
            destroy: destroy,
            create: create,
            getByUUid: getByUUid,
            update: update,
            filterBySeveralFields: filterBySeveralFields,
            sortByMultipleFields: sortByMultipleFields
        }

        return Notes;

        function all() {
            return $http.get('/api/v1/notes/');
        }

        function create(note) {
            return $http.post('/api/v1/notes/', {
                title: note.title,
                content: note.content,
                is_featured: note.is_featured,
                category: note.category
            });
        }

        function filterBySeveralFields(fields) {
            var qStr = '';
            var queryParams = [];
            for(var field in fields) {
                if(!(field === 'category' && fields[field] === 'AL')) {
                    queryParams.push(field + "=" + fields[field]);
                }
            }
            if(queryParams.length > 0) {
                qStr = '?' + queryParams.join('&');
            }
            return $http.get(filteredUrl + qStr);
        }

        function getByUUid(uuid){
            return $http.get('/api/v1/notes-in-uuid-scope/' + uuid + '/');
        }

        function sortByMultipleFields(fields) {
            var q = '';
            q += fields.join(';');
            return $http.get(filteredUrl + '?sort=' + q);
        }

        function update(note, get_public_token) {
            var url = '/api/v1/notes/' + note.id + '/';
            if(get_public_token) {
                if(get_public_token === 't') {
                    url += '?togglepublish=t';
                }
                else {
                    url += '?togglepublish=f';
                }
            }
            return $http.put(url, note);
        }

        function destroy(noteId) {
            return $http.delete('api/v1/notes/' + noteId +'/');
        }
    }
})();