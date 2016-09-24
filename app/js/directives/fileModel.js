(() => {
    'use strict';

    window.app.directive('fileModel', [() => {
        return {
            scope: {
                fileModel: '='
            },
            link: (scope, element, attributes) => {
                element.bind('change', (changeEvent) => {
                    scope.fileModel = changeEvent.target.files;
                });
            }
        }
    }]);
})();