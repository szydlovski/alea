type AleaState = [number, number, number, number];

export default class Alea {
	#state: AleaState;
	constructor(seed: any = Date.now()) {
		this.#state = initializeState(seed);
	}
	exportState(): AleaState {
		return [...this.#state];
	}
	importState(state: AleaState): Alea {
		this.#state = state;
		return this;
	}
	next() {
		const [value, state] = advanceState(this.#state);
		this.#state = state;
		return value;
	}
	random() {
		return this.next();
	}
	clone() {
		return new Alea().importState(this.exportState());
	}
}

function initializeState(seeds: any): AleaState {
	if (!Array.isArray(seeds)) {
		seeds = [seeds];
	}
	const mash = createMasher();
	let s0 = mash();
	let s1 = mash();
	let s2 = mash();
	let c = 1;
	for (const seed of seeds) {
		s0 -= mash(seed);
		if (s0 < 0) {
			s0 += 1;
		}
		s1 -= mash(seed);
		if (s1 < 0) {
			s1 += 1;
		}
		s2 -= mash(seed);
		if (s2 < 0) {
			s2 += 1;
		}
	}
	return [s0, s1, s2, c];
}

function advanceState(state: AleaState): [number, AleaState] {
	let [s0, s1, s2, c] = state;
	const t = 2091639 * s0 + c * 2.3283064365386963e-10;
	s0 = s1;
	s1 = s2;
	const value = (s2 = t - (c = t | 0));
	return [value, [s0, s1, s2, c]];
}

function createMasher() {
	let n = 0xefc8249d;
	return function (data: any = ' ') {
		data = data.toString();
		for (let i = 0; i < data.length; i++) {
			n += data.charCodeAt(i);
			let h = 0.02519603282416938 * n;
			n = h >>> 0;
			h -= n;
			h *= n;
			n = h >>> 0;
			h -= n;
			n += h * 0x100000000;
		}
		return (n >>> 0) * 2.3283064365386963e-10;
	};
}
