# @brycemarshall/pulse

A function that starts an asynchronous pulse sequence that invokes a handler function at the specified interval until either the specified duration has elapsed, or the sequence is cancelled.

## Installation (Latest Build)

npm install @brycemarshall/pulse

## IMPORTANT! Installation (Versioned Builds)

The @brycemarshall/pulse function is published on NPM with the following builds:

version 3 -- Full native support for the ES2017 async keyword and await expression (the most compact build).
npm install @brycemarshall/pulse@latest 
OR
npm install @brycemarshall/pulse@es2017
OR
npm install @brycemarshall/pulse@"^3"

version 2 -- Downlevelled to support ES2015 runtimes using generator functions and the yield keyword.
npm install @brycemarshall/pulse@es2015 
OR
npm install @brycemarshall/pulse@"^2"

version 1 -- Downlevelled to support ES3/ES5 runtimes using generator and awaiter functions (the least compact build - you'll probably need this build if you're targeting a browser).
npm install @brycemarshall/pulse@es5 
OR
npm install @brycemarshall/pulse@"^1"

## The module exports the following:

```ts
/**
 *  A function that starts an asynchronous pulse sequence that invokes a handler function at the specified interval until either the specified duration has elapsed, or the sequence is cancelled.
 * @param handler The function that is invoked when the pulse event fires. Returning a "truthy" value from this function cancels the pulse sequence.
 * @param duration The duration (in milliseconds) for which the pulse sequence should persist.
 * @param interval The frequency (in milliseconds) that pulse events will be raised at. The default value is 100.
 * @param state Optional state which will be passed to the handler function on each pulse event.
 */
export declare function pulse(handler: (state?: any) => boolean, duration: number, interval?: number, state?: any): Promise<void>;
```

## Usage

``` ts
import { pulse } from '@brycemarshall/pulse';

tests();

async function tests() {
    await testPulse();
    await testCancelPulse();
}

async function testPulse() {
    console.log("Entering testPulse");
    let count = 0;
    await pulse((): boolean => {
        count++;
        console.log("Pulsed x " + count);
        return false;
    }, 1000);

    console.log("After pulse");
}

async function testCancelPulse() {
    console.log("Entering testCancelPulse");
    let count = 0;
    await pulse((): boolean => {
        count++;
        console.log("Pulsed x " + count);
        return count >= 2;
    }, 10000);

    console.log("After pulse");
}
```
## Contributors

 - Bryce Marshall

## MIT Licenced
