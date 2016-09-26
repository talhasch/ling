(() => {
    'use strict';

    window.app.filter('objLength', () => {
        return (object) => {
            return  Object.keys(object).length;
        }
    });

})();