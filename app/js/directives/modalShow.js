(() => {
    'use strict';

    window.app.directive('modalShow', () => {
        return {
            restrict: 'A',
            scope: {
                modalVisible: '='
            },
            link: (scope, element, attrs) => {

                //Hide or show the modal
                scope.showModal = (visible) => {
                    if (visible) {
                        element.modal('show');
                    }
                    else {
                        element.modal('hide');
                    }
                }

                //Check to see if the modal-visible attribute exists
                if (!attrs.modalVisible) {
                    //The attribute isn't defined, show the modal by default
                    scope.showModal(true);
                }
                else {
                    //Watch for changes to the modal-visible attribute
                    scope.$watch('modalVisible', (newValue, oldValue) => {
                        scope.showModal(newValue);
                    });

                    //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
                    element.bind('hide.bs.modal', () => {
                        scope.modalVisible = false;
                        if (!scope.$$phase && !scope.$root.$$phase)
                            scope.$apply();
                    });
                }
            }
        };
    });
})();