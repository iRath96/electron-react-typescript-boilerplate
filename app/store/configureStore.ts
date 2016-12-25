let configureStore: any;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.production');
} else {
  configureStore = require('./configureStore.development');
}

export = configureStore;
