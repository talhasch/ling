(() => {
    'use strict';
    
    window.app.factory('$xhrFactory', ['$rootScope', ($rootScope) => {
        return function createXhr(method, url) {
            const xhr = new window.XMLHttpRequest({ mozSystem: true });
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.responseURL.startsWith('file://')) {
                        return;
                    }
                    $rootScope.$broadcast('xhrDone', xhr);
                }
            };
            return xhr;
        };
    }]);

    window.app.factory('requestService', ($http, $q) => {
        const makeRequest = (url, method, headers, data, files) => {
            let canceller = $q.defer();

            let cancel = (reason) => {
                canceller.resolve(reason);
            };

            let promise = $http({
                url: url,
                method: method,
                cache: false,
                headers: headers,
                data: data,
                timeout: canceller.promise,
                transformResponse: null
            });

            return {
                promise: promise,
                cancel: cancel
            };
        }

        return {
            makeRequest: makeRequest
        };
    });

})();