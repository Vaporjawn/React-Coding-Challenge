import { act } from "react-dom/test-utils";

// makes runAllTimers() work for tests
jest.useFakeTimers();

export const flushPromises = () => new Promise(setImmediate);

/**
 * Synchronously runs all the fake timers, i.e. flushes GraphQL callbacks/etc.
 *
 * It's not clear yet if using fakeTimers + runAllTimers is better or worse than leaving in
 * real timers and doing 'await wait(0)' type hacks.
 */
export async function runAllTimers(promise?: Promise<unknown> | void): Promise<void> {
  // Wrap runAllTimers in act() to force React to run side-effects triggered by hooks.
  await act(async () => {
    jest.runOnlyPendingTimers();
    await flushPromises();

  });
  if (promise) {
    await promise;
  }
}
