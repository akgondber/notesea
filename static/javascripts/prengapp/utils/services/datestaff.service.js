(function() {
    'use strict';

    angular.module('notesea.utils.services')
           .factory('DateStaff', DateStaff);

    function DateStaff() {
        var DateStaff = {
            getCurrentDate: getCurrentDate,
            incrDateByMonth: incrDateByMonth
        }

        return DateStaff;

        function getCurrentDate(delimeter) {
            var delimeter = delimeter || '-';
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();

            dd = appendStartZero(dd);
            mm = appendStartZero(mm);

            var result = yyyy + delimeter + mm + delimeter + dd;
            return result;
        }

        function incrDateByMonth(srcDate, incrValue) {
            var srcDate = srcDate || new Date();
            srcDate.setMonth(srcDate.getMonth() + incrValue);
            return formatDate(srcDate);
        }

        function formatDate(date, pattern, delimeter) {
            var pattern = pattern || 'yyyy-mm-dd';
            var delimeter = delimeter || '-';
            var parsedPattern = pattern.split(delimeter);
            var resultArr = [];
            for(var i = 0, len = parsedPattern.length; i < len; i++) {
                if(parsedPattern[i] === 'yyyy') {
                    resultArr.push(appendStartZero(date.getFullYear()));
                }
                else if(parsedPattern[i] === 'mm') {
                    resultArr.push(date.getMonth() + 1);
                }
                else if(parsedPattern[i] === 'dd') {
                    resultArr.push(appendStartZero(date.getDate()));
                }
                else {
                    resultArr.push('');
                }
            }
            return resultArr.join(delimeter);
        }

        function appendStartZero(value) {
            if(value.length < 2) {
                return '0' + value;
            }
            return value + '';
        }
    }
})();