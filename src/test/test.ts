import { pulse } from '../index';

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