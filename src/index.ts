/**
 *  A function that starts an asynchronous pulse sequence that invokes a handler function at the specified interval until either the specified duration has elapsed, or the sequence is cancelled.
 * @param handler The function that is invoked when the pulse event fires. Returning a "truthy" value from this function cancels the pulse sequence.
 * @param duration The duration (in milliseconds) for which the pulse sequence should persist.
 * @param interval The frequency (in milliseconds) that pulse events will be raised at. The default value is 100.
 * @param state Optional state which will be passed to the handler function on each pulse event.
 */
export async function pulse(handler: (state?: any) => boolean, duration: number, interval?: number, state?: any) {
    if (!duration)
        duration = 0;

    if (interval == null)
        interval = 100;

    let s: number = Date.now();
    let resolveFn: () => void;
    let rejectFn: (reason?: any) => void;
    let elapsed: number = 0;

    let timeout = () => {
        setTimeout(() => {
            try {
                elapsed = Date.now() - s;
                if (elapsed >= duration || (handler && handler(state)))
                    resolveFn();
                else {
                    duration = Math.max(duration, 10);
                    timeout();
                }
            } catch (e) {
                rejectFn(e);
            }
        }, Math.min(duration - elapsed, interval));
    };

    await new Promise<void>((r, rj) => {
        resolveFn = r;
        rejectFn = rj;
        timeout();
    });
}
