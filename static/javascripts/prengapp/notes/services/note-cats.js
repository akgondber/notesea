(function() {
    'use strict';

    angular.module('notesea.notes.services')
           .service('NoteCats', NoteCats);


    function NoteCats() {
        var NoteCats = {
            pairs: [
                {short: 'N', value: "Заметка"},
                {short: 'R', value: "Ссылка"},
                {short: 'P', value: "TODO"},
                {short: 'J', value: "Mемо"}
            ];
        }

        return NoteCats;
    }
})();
