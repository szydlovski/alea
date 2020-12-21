# alea

Seedable random, an implementation of Johannes Baagøe's Alea algorithm. Mostly a refactored copy paste with the addition of  some convenience methods.

# Usage

```
npm install @szydlovski/alea
```
```javascript
const Alea = require('@szydlovski/alea');

// will always produce the same numbers for the same seed
new Alea('seed1').next() // 0.061422935919836164
new Alea('seed1').next() // 0.061422935919836164
new Alea('seed2').next() // 0.37036016467027366

const generator = new Alea('seed');
for (let i = 0; i++ < 100;) {
  generator.next();
}
// two ways to clone an existing generator
const clone1 = new Alea().importState(generator.exportState());
const clone2 = generator.clone();

generator.next(); // 0.6304205257911235
clone1.next(); // 0.6304205257911235
clone2.next(); // 0.6304205257911235
```

# API

## new Alea([, seed])

Creates a new instance, optionally using a `seed`, otherwise the current date is used. The seed will be stringified using `toString`.

## Alea.next()

Generates and returns the next random number between `0` and `1`.

## Alea.random()

Alias of `Alea.next`.

## Alea.exportState()

Returns a copy of the instance's internal state, in the form of an array containing four numbers.

## Alea.importState(state)

Imports a given state into the instance. The state should be an array containing four numbers, like the array returned by `Alea.exportState`. Returns the instance, allowing for chained calls like:
```javascript
const generator = new Alea().importState(state);
```

## Alea.clone()

Clones the instance. This is the equivalent of:
```javascript
const clone = new Alea().importState(instance.exportState());
```



# License

Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>

Copyright (C) 2020 by Kamil Szydlowski <kamil.szydlovski@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.