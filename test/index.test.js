import chai from 'chai';
const { expect } = chai;


import Alea from '../dist/alea.js';

describe('Alea', function () {
	it('generates random numbers based on a seed', function () {
		const gen1 = new Alea('seed1');
		const gen2 = new Alea('seed2');
		expect(gen1.next()).to.not.equal(gen2.next());
	});
	it('generates the same numbers for the same seed', function () {
		const gen1 = new Alea('seed');
		const gen2 = new Alea('seed');
		expect(gen1.next()).to.equal(gen2.next());
	});
	describe('#exportState', function () {
		it('returns the current state', function () {
			const gen = new Alea();
			const stateBefore = gen.exportState();
			gen.next();
			const stateAfter = gen.exportState();
			expect(stateBefore).to.not.deep.equal(stateAfter);
		});
	});
	describe('#importState', function () {
		it('imports a given state', function () {
			const gen1 = new Alea('seed1');
			const gen2 = new Alea('seed2');
			expect(gen1.next()).to.not.equal(gen2.next());
			gen2.importState(gen1.exportState());
			expect(gen1.next()).to.equal(gen2.next());
		});
		it('returns the instance, allowing for chained calls', function () {
			const gen1 = new Alea('seed1');
			const gen2 = new Alea().importState(gen1.exportState());
			expect(gen1.next()).to.equal(gen2.next());
		});
	});
	describe('#clone', function () {
		it('returns a new instance with the same state', function () {
			const gen1 = new Alea('seed');
			const gen2 = gen1.clone();
			expect(gen1.next()).to.equal(gen2.next());
		});
	});
	describe('#next', function () {
		it('returns the next random number between 0 and 1', function () {
			const gen = new Alea();
			const number1 = gen.next();
			const number2 = gen.next();
			expect(number1).to.not.equal(number2);
			expect(number1 > 0 && number1 < 1).to.be.true;
			expect(number2 > 0 && number2 < 1).to.be.true;
		});
	});
	describe('#random', function () {
		it('is an alias for #next', function () {
			const gen1 = new Alea('seed');
			const gen2 = new Alea('seed');
			expect(gen1.next()).to.equal(gen2.random());
		});
	});
});
