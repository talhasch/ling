(() => {
    'use strict';

    window.app.controller('ResponseCtrl', ['$scope',  ($scope) => {

        const isBinaryContentType = function (contentType) {
            let p = contentType.match(/([^\/]+)\/([^;]+)/),
                type = p && p[1],
                subtype = p && p[2];

            if (type === 'text') {
                return false;
            }
            else if (type === 'application' && (subtype == 'javascript' || subtype == 'json' || subtype == 'xml')) {
                return false;
            }
            return true;
        }

        const isJsonContentType = function (contentType) {
            let p = contentType.match(/([^\/]+)\/([^;]+)/),
                type = p && p[1],
                subtype = p && p[2];

            if (subtype == 'json') {
                return true;
            }

            return false;
        }

        $scope.selectedTab = 'headers';
        $scope.selectTab = (tab) => {
            $scope.selectedTab = tab;
        }

        $scope.reset = () => {
            $scope.headers = {};
            $scope.body = null;
            $scope.statusCode = null;
            $scope.isBinary = false;
            $scope.isJson = false;
            $scope.formatted = false;
            $scope.flag = false;
        }

        $scope.format = () => {
            try {
                let obj = JSON.parse($scope.body);
                $scope.body = JSON.stringify(obj, null, 4);
                $scope.formatted = true;
            } catch (e) {
                return;
            }
        }

        $scope.reset();

        $scope.$on("response", (event, headers, body, statusCode) => {
            $scope.headers = headers;
            $scope.statusCode = statusCode;
            
            let contentType = headers['content-type'];

            if(contentType!==undefined){
                $scope.isBinary = isBinaryContentType(headers['content-type']);
            } else {
                $scope.isBinary = false;
            }
            
            if (!$scope.isBinary) {
                $scope.body = body;
            }

            if(contentType !== undefined){
                $scope.isJson = isJsonContentType(headers['content-type']);
            } else {
                $scope.isJson = false;
            }
            
            $scope.flag = true;
        });

        $scope.$on('beforeRequest', (event) => {
            $scope.reset();
        });

        $scope.$on('requestError', (event) => {
            $scope.reset();
        });

        $scope.$on('clear', (event) => {
            $scope.reset();
        });

        $scope.$on('xhrDone', (event, xhr) => {
            $scope.responseUrl = xhr.responseURL;
        });
    }]);
})();