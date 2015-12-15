(function() {
    'use strict';

    angular
        .module('notesea.layout.controllers')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$scope', 'Authentication'];

    function AboutController($scope, Authentication) {
        var vm=this;
        $scope.tv = 'translate(-120px, 0) translate(120px, 0) translate(28px, -17px) rotate(45deg)';
        $scope.introInfo = {
            p1: 'M20,20 L30,20 L30,10 L40,10 L40,20 L50,20 L50,30 L40,30 L40,40 L30,40 L30,30 L20,30',
            p2: 'M20,20 L50,20 L50,30 L20,30 Z',
            transform: 'translate(-120px, 0) translate(120px, 0) translate(28px, -17px) rotate(45deg)'
        }

        $scope.introductionActive = true;

    }
})();