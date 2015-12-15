(function() {
    'use strict';

    angular
        .module('notesea.layout.directives')
        .directive('elemReady', elemReady);

    function elemReady($parse) {
       return {
           restrict: 'A',
           link: function($scope, elem, attrs ) {
              elem.ready(function(){

              });
           }
        }
    }
})();