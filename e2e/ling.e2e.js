import { expect } from 'chai';
import testUtils from './utils';

describe('application launch', function () {

    beforeEach(testUtils.beforeEach);
    afterEach(testUtils.afterEach);

    it('Request section header', function () {
        return this.app.client.getText('.request .scope-header').then(function (text) {
            expect(text).to.equal('REQUEST');
        });
    });
});
