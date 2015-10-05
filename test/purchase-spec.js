var expect = require('chai').expect;
var sinon = require('sinon');
var inquirer = require('inquirer');

var purchase = require('../lib/purchase.js');

describe('purchase.js - spec', function () {

	describe('ticket', function () {
		var promptStub;

		context('when pot is not full', function () {
			beforeEach(function (done) {
				promptStub = sinon.stub(inquirer, "prompt");
				sinon.stub(console, "log").returns(void 0);
				done();
			});

			afterEach(function (done) {
				inquirer.prompt.restore();
				console.log.restore();
				done();
			});

			it('should purchase ticket by adding customer to the list and increase the pot money', function (done) {
				var obj = { people: [] };
				promptStub.onCall(0).returns({ customerName: 'customer-1' });

				purchase.ticket(obj, function () {
					expect(obj.people).to.deep.equal(['customer-1']);
					expect(console.log.args[0][0]).to.contain("Ball number of customer-1 is: 1");
				});
				done();
			});

			it('should display error if customer already exists', function (done) {
				var obj = { people: ['customer-1'] };
				promptStub.onCall(0).returns({ customerName: 'customer-1' });

				purchase.ticket(obj, function () {
					expect(obj.people).to.deep.equal(['customer-1']);
					expect(console.log.args[0][0]).to.contain("Customer already exists!");
				});
				done();
			});
		});

		context('when pot is full', function () {
			var obj = { people: [] };

			beforeEach(function (done) {
				while (obj.people.length < 50) {
					obj.people.push('customer-' + obj.people.length);
				}
				sinon.stub(console, "log").returns(void 0);
				promptStub = sinon.stub(inquirer, "prompt");
				done();
			});

			afterEach(function (done) {
				console.log.restore();
				inquirer.prompt.restore();
				done();
			});

			it('should display error if there are enough customers for current draw', function (done) {
				promptStub.onCall(0).returns({ customerName: 'customer-1' });

				purchase.ticket(obj, function () {
					expect(console.log.args[0][0]).to.contain("You cannot purchase ticket.");
				});
				done();
			});
		});
	});
});