# TOC
   - [draw.js - spec](#drawjs---spec)
     - [start](#drawjs---spec-start)
       - [when the minimum tickets are not sold](#drawjs---spec-start-when-the-minimum-tickets-are-not-sold)
       - [when the minimum tickets are sold](#drawjs---spec-start-when-the-minimum-tickets-are-sold)
   - [purchase.js - spec](#purchasejs---spec)
     - [ticket](#purchasejs---spec-ticket)
       - [when pot is not full](#purchasejs---spec-ticket-when-pot-is-not-full)
       - [when pot is full](#purchasejs---spec-ticket-when-pot-is-full)
   - [winners.js - spec](#winnersjs---spec)
     - [display](#winnersjs---spec-display)
<a name=""></a>
 
<a name="drawjs---spec"></a>
# draw.js - spec
<a name="drawjs---spec-start"></a>
## start
<a name="drawjs---spec-start-when-the-minimum-tickets-are-not-sold"></a>
### when the minimum tickets are not sold
should display error.

```js
var obj = { people: [] };
draw.start(obj, function () {
	expect(console.log.args[0][0]).to.contain("Unable to draw.");
});
done();
```

<a name="drawjs---spec-start-when-the-minimum-tickets-are-sold"></a>
### when the minimum tickets are sold
should draw winners on draw confirmation.

```js
promptStub.onCall(0).returns({ drawConfirm: true });
draw.start(obj, function () {
	expect(obj.winners.length).to.equal(3);
	expect(obj.pot).to.equal(120);
	expect(console.log.args[0][0]).to.contain('Tickets sold since last draw: 4');
	expect(console.log.args[1][0]).to.contain('Total money in the pot: 240$');
});
done();
```

should cancel draw if draw is not confirmed.

```js
promptStub.onCall(0).returns({ drawConfirm: false });
draw.start(obj, function () {
	expect(obj.winners).to.equal(undefined);
	expect(obj.pot).to.equal(240);
	expect(console.log.args[0][0]).to.contain('Draw cancelled!');
});
done();
```

<a name="purchasejs---spec"></a>
# purchase.js - spec
<a name="purchasejs---spec-ticket"></a>
## ticket
<a name="purchasejs---spec-ticket-when-pot-is-not-full"></a>
### when pot is not full
should purchase ticket by adding customer to the list and increase the pot money.

```js
var obj = { people: [] };
promptStub.onCall(0).returns({ customerName: 'customer-1' });
purchase.ticket(obj, function () {
	expect(obj.people).to.deep.equal(['customer-1']);
	expect(console.log.args[0][0]).to.contain("Ball number of customer-1 is: 1");
});
done();
```

should display error if customer already exists.

```js
var obj = { people: ['customer-1'] };
promptStub.onCall(0).returns({ customerName: 'customer-1' });
purchase.ticket(obj, function () {
	expect(obj.people).to.deep.equal(['customer-1']);
	expect(console.log.args[0][0]).to.contain("Customer already exists!");
});
done();
```

<a name="purchasejs---spec-ticket-when-pot-is-full"></a>
### when pot is full
should display error if there are enough customers for current draw.

```js
promptStub.onCall(0).returns({ customerName: 'customer-1' });
purchase.ticket(obj, function () {
	expect(console.log.args[0][0]).to.contain("You cannot purchase ticket.");
});
done();
```

<a name="winnersjs---spec"></a>
# winners.js - spec
<a name="winnersjs---spec-display"></a>
## display
should display winners of the draw.

```js
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
```

should not display winners if winners list is empty.

```js
var obj = {
	winners: [],
	drawDate: 'today'
};
winners.display(obj);
assert.isTrue(console.log.called, "log should have been called.");
assert.equal(console.log.callCount, 1);
expect(console.log.args[0][0]).to.contain("Winners list is empty");
done();
```

