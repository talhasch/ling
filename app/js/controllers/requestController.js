(() => {
    'use strict'
    
    window.app.controller('RequestCtrl', ['$scope', '$rootScope', '$timeout', 'requestService', 'historyService', ($scope, $rootScope, $timeout, requestService, historyService) => {

        const contentTypeSelectionShouldVisible = () => {
            if ($scope.selectedMethod == METHOD_GET || $scope.selectedMethod == METHOD_HEAD) {
                return false;
            }
            return true;
        }

        const payloadFormShouldEnable = () => {
            if ($scope.selectedMethod == METHOD_GET || $scope.selectedMethod == METHOD_HEAD) {
                return false;
            }

            return true;
        }

        const paramsFormShouldEnable = () => {
            if ($scope.selectedMethod == METHOD_GET || $scope.selectedMethod == METHOD_HEAD) {
                return false;
            }
            let curContentTypeHeader = $scope.headers['Content-Type'];
            if (curContentTypeHeader == CONTENT_TYPE_FORM || curContentTypeHeader == CONTENT_TYPE_FILE) {
                return true;
            }

            return false;
        }

        const filesFormShouldEnable = () => {
            if ($scope.selectedMethod == METHOD_GET || $scope.selectedMethod == METHOD_HEAD) {
                return false;
            }
            let curContentTypeHeader = $scope.headers['Content-Type'];
            if (curContentTypeHeader == CONTENT_TYPE_FILE) {
                return true;
            }

            return false;
        }

        const payloadFromParams = () => {
            let payload = '';
            for (let i = 0; i < $scope.params.length; i += 1) {
                let paramName = encodeURIComponent($scope.params[i]['name']);
                let paramValue = encodeURIComponent($scope.params[i]['value']);
                payload += paramName + '=' + paramValue + '&';
            }
            return payload.replace(/&+$/, ''); // remove last &
        }

        const paramsFromPayload = (payload) => {
            let params = [];
            let _payload = payload.split('&');
            for (let i = 0; i < _payload.length; i++) {
                let element = _payload[i];
                let _param = element.split('=');
                let paramName = decodeURIComponent(_param[0]);
                let paramValue = _param[1] ? decodeURIComponent(_param[1]) : '';
                params.push({ 'name': paramName, 'value': paramValue });
            }

            return params;
        }

        // URL
        $scope.url = '';

        // METHOD
        $scope.methods = METHODS;
        $scope.selectedMethod = METHOD_GET;

        // TABS
        $scope.selectedTab = 'headers';
        $scope.selectTab = (tab) => {
            $scope.selectedTab = tab;

            if (tab == 'params') {
                if ($scope.payload != '') {
                    $scope.params = paramsFromPayload($scope.payload);
                }

            }
        }

        // HEADERS 
        $scope.headers = {};

        $scope.newHeaderName = '';
        $scope.newHeaderValue = '';

        $scope.resetHeadersForm = () => {
            $scope.headersForm.$setPristine();
            $scope.newHeaderName = '';
            $scope.newHeaderValue = '';
        }

        $scope.submitHeadersForm = (isValid) => {
            if (isValid) {
                let headerName = $scope.newHeaderName;
                let headerValue = $scope.newHeaderValue;

                $scope.headers[headerName] = headerValue;
                $scope.resetHeadersForm();
            }
        }

        $scope.editHeader = (headerName, headerValue) => {
            $scope.resetHeadersForm();

            $scope.newHeaderName = headerName;
            $scope.newHeaderValue = headerValue;

            delete $scope.headers[headerName]
        }

        $scope.removeHeader = (headerName) => {
            delete $scope.headers[headerName];

            if (headerName == 'Authorization') {
                $scope.authUser = '';
                $scope.authPass = '';
            }
        }

        // CONTENT TYPE HEADER
        $scope.contentTypes = CONTENT_TYPES;

        $scope.contentTypeSelectionShouldVisible = () => {
            return contentTypeSelectionShouldVisible();
        }

        $scope.contentTypeSelectionChanged = () => {
            if (!$scope.headers['Content-Type']) {
                delete $scope.headers['Content-Type'];
            }
        }

        // PAYLOAD 
        $scope.payload = '';

        $scope.payloadFormShouldEnable = () => {
            return payloadFormShouldEnable();
        }

        $scope.$watchCollection('params', () => {
            $scope.payload = payloadFromParams();
        });

        $scope.switchMethodForPayload = () => {
            $scope.selectedMethod = METHOD_POST;
        }

        // PARAMS (data)
        $scope.params = [];

        $scope.addParam = (paramName, paramValue) => {
            $scope.params.push({ 'name': paramName, 'value': paramValue });
        }

        $scope.removeParam = (param) => {
            let index = $scope.params.indexOf(param);
            $scope.params.splice(index, 1);
        }

        $scope.newParamName = '';
        $scope.newParamValue = '';

        $scope.resetParamsForm = () => {
            $scope.paramsForm.$setPristine();
            $scope.newParamName = '';
            $scope.newParamValue = '';
        }

        $scope.submitParamsForm = (isValid) => {
            if (isValid) {
                $scope.addParam($scope.newParamName, $scope.newParamValue)
                $scope.resetParamsForm();
            }
        }

        $scope.editParam = (param) => {
            $scope.resetParamsForm();

            $scope.newParamName = param.name;
            $scope.newParamValue = param.value;

            $scope.removeParam(param);
        }

        $scope.paramsFormShouldEnable = () => {
            return paramsFormShouldEnable();
        }

        $scope.switchContentTypeForParamsForm = () => {
            if ($scope.selectedMethod == METHOD_GET || $scope.selectedMethod == METHOD_HEAD) {
                $scope.selectedMethod = METHOD_POST;
            }

            $scope.headers['Content-Type'] = CONTENT_TYPE_FORM;
        }

        // FILES
        $scope.files = [];

        $scope.addFile = (fileName, fileValue, fileLabel) => {
            $scope.files.push({ 'name': fileName, 'value': fileValue, 'label': fileLabel });
        }

        $scope.removeFile = (file) => {
            let index = $scope.files.indexOf(file);
            $scope.files.splice(index, 1);
        }

        $scope.newFileName = '';
        $scope.newFileValue = '';

        $scope.resetFilesForm = () => {
            $scope.filesForm.$setPristine();
            $scope.newFileName = '';
            $scope.newFileValue = '';
        }

        $scope.submitFilesForm = () => {
            $scope.filesForm.$setValidity('required', true);
            if (!$scope.newFileName || !$scope.newFileValue) {
                $scope.filesForm.$setValidity('required', false);
                return;
            }

            $scope.addFile($scope.newFileName, $scope.newFileValue[0], $scope.newFileValue[0].name);
            $scope.resetFilesForm();
        }

        $scope.filesFormShouldEnable = () => {
            return filesFormShouldEnable();
        }

        $scope.switchContentTypeForFilesForm = () => {
            if ($scope.selectedMethod == METHOD_GET || $scope.selectedMethod == METHOD_HEAD) {
                $scope.selectedMethod = METHOD_POST;
            }

            $scope.headers['Content-Type'] = CONTENT_TYPE_FILE;
        }

        // AUTH 
        $scope.authUser = '';
        $scope.authPass = '';

        const watchAuth = () => {
            if ($scope.authUser || $scope.authPass) {
                $scope.headers['Authorization'] = 'Basic ' + btoa($scope.authUser + ':' + $scope.authPass);
            } else {
                delete $scope.headers['Authorization'];
            }
        }

        let watchAuthT = null;
        $scope.$watchGroup(['authUser', 'authPass'], () => {
            if (watchAuthT != null) {
                $timeout.cancel(watchAuthT);
                watchAuthT = null;
            }

            watchAuthT = $timeout(() => { watchAuth() }, 300);
        });

        let request = null;

        $scope.showProgressDialog = false;

        $scope.run = (isValid) => {

            if (isValid) {
                let url = angular.copy($scope.url);
                let method = angular.copy($scope.selectedMethod);
                let headers = angular.copy($scope.headers);
                let _data = payloadFormShouldEnable() ? angular.copy($scope.payload) : '';
                let files = $scope.files;

                if (headers['Content-Type'] == CONTENT_TYPE_FILE) {
                    headers['Content-Type'] = undefined;

                    let params = paramsFromPayload(_data);

                    _data = new FormData();

                    for (let i = 0; i < params.length; i++) {
                        let param = params[i];
                        _data.append(param.name, param.value);
                    }

                    for (let i = 0; i < files.length; i++) {
                        let file = files[i];
                        _data.append(file.name, file.value);
                    }
                }

                $scope.showProgressDialog = true;

                $rootScope.$broadcast('beforeRequest');
                let startDate = new Date();
                request = requestService.makeRequest(url, method, headers, _data, files);
                request.promise.then((response) => {
                    httpCallback(response, startDate);
                }, (reason) => {
                    $rootScope.$broadcast('requestError');

                    if (reason instanceof Error) {
                        alert(reason.message);
                    }

                    if (reason instanceof Object) {
                        if (reason.status != undefined) {
                            if (reason.status == -1) {
                                // cancelled
                                return;
                            }

                            httpCallback(reason, startDate);
                        }
                    }

                }).finally(() => {
                    $scope.showProgressDialog = false;
                    request = null;
                });
            }
        }

        const httpCallback = (responseObj, startDate) => {
            let endDate = new Date();
            let duration = endDate - startDate;

            let responseHeaders = responseObj.headers();
            let responseBody = responseObj.data;
            let responseStatusCode = responseObj.status;
            $rootScope.$broadcast('response', responseHeaders, responseBody, responseStatusCode);

            historyService.addToHistory(
                {
                    'url': $scope.url,
                    'method': $scope.selectedMethod,
                    'headers': $scope.headers,
                    'payload': $scope.payload,
                    'authUser': $scope.authUser,
                    'authPass': $scope.authPass,
                    'status': responseStatusCode,
                    'duration': duration,
                    'created': new Date()
                }, (doc) => {
                    $rootScope.$broadcast('history');
                });
        }

        $scope.cancelRequest = () => {
            request.cancel('User cancelled');
        }

        $scope.clear = () => {
            $rootScope.$broadcast('clear');
        }

        $scope.$on('clear', (event) => {

            $scope.url = '';
            $scope.selectedMethod = METHOD_GET;
            $scope.selectedTab = 'headers';
            $scope.headers = {};
            $scope.payload = '';
            $scope.params = [];
            $scope.files = [];
            $scope.authUser = '';
            $scope.authPass = '';

            $scope.runForm.$setPristine();
            $scope.headersForm.$setPristine();
            $scope.paramsForm.$setPristine();
        });

        $scope.$on('useHistory', (event, historyItem) => {
            $scope.url = historyItem.url;
            $scope.selectedMethod = historyItem.method;
            $scope.headers = historyItem.headers;
            $scope.payload = historyItem.payload;
            if (paramsFormShouldEnable) {
                $scope.params = paramsFromPayload($scope.payload);
            }
            $scope.authUser = historyItem.authUser;
            $scope.authPass = historyItem.authPass;
        });
    }]);
})();