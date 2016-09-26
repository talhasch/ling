(() => {
    'use strict';

    window.app.controller('HistoryCtrl', ['$scope', '$rootScope', 'historyService', ($scope, $rootScope, historyService) => {

        const loadData = () => {
            historyService.getHistory((docs) => {
                $scope.data = docs;
                $scope.$apply();
            });
        }

        $scope.data = [];
        loadData();

        $scope.$on('history', (event) => {
            loadData();
        });

        $scope.clearHistory = () => {
            historyService.clearHistory((numRemoved) => {
                loadData();
            })
        }

        $scope.use = (historyItem) => {
            $rootScope.$broadcast('clear');
            $rootScope.$broadcast('useHistory', historyItem);
        }
    }]);
})();