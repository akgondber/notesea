(function() {
    'use strict';

    angular.module('notesea.utils.services')
           .factory('ArrayStaff', ArrayStaff);

    function ArrayStaff() {
        var ArrayStaff = {
            getItemsBySeparator: getItemsBySeparator,
            hasField: hasField,
            getIndexOfPositionByField: getIndexOfPositionByField
        }

        return ArrayStaff;

        /*
        * getItemsBySeparator(['title:asc', 'created_at:desc', 'category:asc']) returns ['title', 'created_at', 'category']
        * getItemsBySeparator(['title:asc', 'created_at:desc', 'category:asc'], {neededIndex: 1}) returns ['asc', 'desc', 'asc']
        */
        function getItemsBySeparator(srcArray, options) {
            var options = options || {};
            var delimeter = options['delimeter'] || ':';
            var neededIndex = options['neededIndex'] || 0;
            var result = [];

            for(var i = 0, len = srcArray.length; i < len; i++) {
                var splittedArray = srcArray[i].split(delimeter);
                if(neededIndex < splittedArray.length) {
                    result.push(splittedArray[neededIndex]);
                }
                else {
                    result.push('');
                }
            }

            return result;
        }
        /*
        * hasField(['title:asc', 'created_at:desc'], 'title') returns true
        * hasField(['title', 'created_at'], 'title') returns true
        * hasField(['title:asc', 'created_at:desc'], 'content') returns false
        */
        function hasField(srcArray, field) {
            for(var i = 0, len=srcArray.length; i < len; i++) {
                if(field == srcArray[i].split(':')[0]) {
                    return true;
                }
            }
            return false;
        }

        /*
        * getIndexOfPositionByField(['title:asc', 'created_at:desc', 'category:asc', 'title']) returns 1
        * getIndexOfPositionByField(['title:asc', 'created_at:desc', 'category:asc', 'content']) returns -1
        */
        function getIndexOfPositionByField(srcArray, field, delimeter) {
            var delimeter = delimeter || ':';
            for(var i = 0, len = srcArray.length; i < len; i++) {
                if(srcArray[i].split(delimeter)[0] == field) {
                    return i + 1;
                }
            }
            return -1;
        }
    }
})();