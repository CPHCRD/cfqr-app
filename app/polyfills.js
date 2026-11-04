// Minimal Node globals expected by some CommonJS dependencies
// (the `util` polyfill used by @seald-io/nedb calls process.nextTick).
// A partial `process` object may already exist (e.g. created by other deps
// or the dev server), so each member is added only when missing.
window.global = window.global || window;
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.browser = true;
if (typeof window.process.nextTick !== 'function') {
  window.process.nextTick = (fn, ...args) => queueMicrotask(() => fn(...args));
}
