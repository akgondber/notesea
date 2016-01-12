(function() {
    'use strict';

    angular.module('notesea.authentication.services')
           .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', 'RandomStaff'];

    function Authentication($cookies, $http, RandomStaff) {
        var Authentication = {
            register: register,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate,
            getUserToken: getUserToken
        };

        return Authentication;

        function register(email, password, username) {
            return $http.post('api/v1/users/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(data, status, headers, config) {
                swal('Замечательно', 'Вы зарегистрировались в системе!', 'success');
                Authentication.login(username, password);
            };

            function registerErrorFn(data, status, headers, config) {
                swal('Что-то не так', 'Приносим свои извинения, ошибка сервера', 'warning');
            };
        }

        function login(username, password) {
            return $http.post('api/v1/auth/login/', {
                username: username,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount();
                window.location = '/notes';
            }

            function loginErrorFn(data, status, headers, config) {
                swal('Неудача', JSON.stringify(data.data.message), 'error');
            }
        }

        function logout() {
            return $http.post('api/v1/auth/logout/')
                .then(logoutSuccesFn, logoutErrorFn);

            function logoutSuccesFn(data, status, headers, config) {
                swal('Выход из системы', 'Ждем вас снова!','success');
                Authentication.unauthenticate();
                window.location = '/';
            }

            function logoutErrorFn(data, status, headers, config) {
                swal('', 'К сожалению данная операция завершилась неудачей', 'warning');

            }
        }

        function isAuthenticated() {
            return !!$cookies.get('authenticatedAccount');
        }

        function setAuthenticatedAccount() {
            $cookies.put('authenticatedAccount', RandomStaff.getSimpleToken(28, 'A#a'));
        }

        function unauthenticate() {
            $cookies.remove('authenticatedAccount');
        }

        function getUserToken() {
            if($cookies.get('authenticatedAccount')) {
                return $cookies.get('authenticatedAccount');
            }
            else {
                return 'dummy';
            }
        }

    }
})();