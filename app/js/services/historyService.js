(() => {
    'use strict';

    const db = new Nedb({
        filename: 'lingHistory.db',
        autoload: true
    });

    window.app.factory('historyService', () => {
        const addToHistory = (doc, cb) => {
            db.insert(doc, (err, doc) => {
                if (typeof cb === 'function') {
                    cb(doc);
                }
            });
        }

        const getHistory = (cb) => {
            db.find({}).sort({ created: -1 }).limit(50).exec((err, docs) => {
                if (typeof cb === 'function') {
                    cb(docs);
                }
            });
        }

        const clearHistory = (cb) => {
            db.remove({}, { multi: true }, (err, numRemoved) => {
                if (typeof cb === 'function') {
                    cb(numRemoved);
                }
            });
        }

        return {
            addToHistory: addToHistory,
            getHistory: getHistory,
            clearHistory: clearHistory
        };
    });

})();