// const Sentry = require('@sentry/node');
// or use es6 import statements
import * as Sentry from '@sentry/node';

// const Tracing = require('@sentry/tracing');
// or use es6 import statements
import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: 'https://b7651a433ff34a32bfca327b83ecd800@o571966.ingest.sentry.io/4504729566248960',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const oldConsoleError = console.error;
console.error = (...args) => {
  Sentry.captureException(...args);
  oldConsoleError(...args);
};

export { Sentry };
// const transaction = Sentry.startTransaction({
//   op: 'test',
//   name: 'My First Test Transaction',
// });

// setTimeout(() => {
//   try {
//     foo();
//   } catch (e) {
//     Sentry.captureException(e);
//   } finally {
//     transaction.finish();
//   }
// }, 99);
