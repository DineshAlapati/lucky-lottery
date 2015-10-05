var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var winners = require('../lib/winners.js');

describe('winners.js - spec', function () {

	describe('display', function (done) {

		beforeEach(function (done) {
			sinon.stub(console, "log").returns(void 0);
			done();
		});

		afterEach(function (done) {
			console.log.restore();
			done();
		});

		it('should display winners of the draw', function (done) {
			var obj = {
				winners: ['winner1:90$', 'winner2:40$', 'winner3:20$'],
				drawDate: 'today'
			};
			winners.display(obj);

			assert.isTrue(console.log.called, "log should have been called.");
			assert.equal(console.log.callCount, 3);
			expect(console.log.args[0][0]).to.contain("Winners of the draw");
			expect(console.log.args[1][0]).to.contain("winner1:90$");
			expect(console.log.args[1][0]).not.to.contain("nowinners");
			done();
		});

		it('should not display winners if winners list is empty', function (done) {
			var obj = {
				winners: [],
				drawDate: 'today'
			};
			winners.display(obj);

			assert.isTrue(console.log.called, "log should have been called.");
			assert.equal(console.log.callCount, 1);
			expect(console.log.args[0][0]).to.contain("Winners list is empty");
			done();
		});

	});
});