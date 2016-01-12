(function() {
    'use strict';

    angular.module('notesea.routes')
           .config(config);

    config.$injet = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            controller: 'AboutController',
            templateUrl: '/static/templates/about/index.html'
        }).when('/register', {
            controller: 'RegisterCtrl',
            controllerAs: 'rg',
            templateUrl: '/static/templates/authentication/register.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            teplateUrl: '/static/templates/authentication/login.html'
        }).when('/notes', {
            controller: 'NotesCtrl',
            templateUrl: '/static/templates/notes/index.html'
        }).when('/notes/new', {
            controller: 'NewNoteController',
            templateUrl: '/static/templates/notes/new-note.html'
        }).when('/notes/:uuid', {
            controller: 'NotePreviewController',
            templateUrl: '/static/templates/notes/single-note.html'
        }).when('/notes/:uuid/edit', {
            controller: 'EditNoteController',
            templateUrl: '/static/templates/notes/edit-note.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        }).otherwise('/');
    }
})();