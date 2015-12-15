(function() {
    'use strict';

    angular.module('notesea.notes.services')
           .service('NoteCats', NoteCats);


    function NoteCats() {
        var NoteCats = {
            pairs: [
                {short: 'NO', value: "Заметка"},
                {short: 'RE', value: "Ссылка"},
                {short: 'PT', value: "TODO"},
                {short: 'JO', value: "Mемо"}
            ]
        }

        return NoteCats;
    }
})();
