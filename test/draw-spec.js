var expect = require('chai').expect;
var sinon = require('sinon');
var inquirer = require('inquirer');

var draw = require('../lib/draw.js');

describe('draw.js - spec', function () {

	describe('start', function () {
		var promptStub;

		context('when the minimum tickets are not sold', function () {
			beforeEach(function (done) {
				sinon.stub(console, "log").returns(void 0);
				done();
			});

			afterEach(function (done) {
				console.log.restore();
				done();
			});

			it('should display error', function (done) {
				var obj = { people: [] };
				draw.start(obj, function () {
					expect(console.log.args[0][0]).to.contain("Unable to draw.");
				});
				done();
			});
		});

		context('when the minimum tickets are sold', function () {
			var obj = {};
			beforeEach(function (done) {
				obj.people = ['customer-1', 'customer-2', 'customer-3', 'customer-4'];
				obj.pot = 240;
				promptStub = sinon.stub(inquirer, "prompt");
				sinon.stub(console, "log").returns(void 0);
				done();
			});

			afterEach(function (done) {
				inquirer.prompt.restore();
				console.log.restore();
				done();
			});

			it('should draw winners on draw confirmation', function (done) {
				promptStub.onCall(0).returns({ drawConfirm: true });

				draw.start(obj, function () {
					expect(obj.winners.length).to.equal(3);
					expect(obj.pot).to.equal(120);
					expect(console.log.args[0][0]).to.contain('Tickets sold since last draw: 4');
					expect(console.log.args[1][0]).to.contain('Total money in the pot: 240$');
				});
				done();
			});

			it('should cancel draw if draw is not confirmed', function (done) {
				promptStub.onCall(0).returns({ drawConfirm: false });

				draw.start(obj, function () {
					expect(obj.winners).to.equal(undefined);
					expect(obj.pot).to.equal(240);
					expect(console.log.args[0][0]).to.contain('Draw cancelled!');
				});
				done();
			});
		});
	});
});