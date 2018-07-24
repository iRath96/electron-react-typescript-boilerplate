/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { spawn } = require('child_process');
const tscWatch = require('tsc-watch/client');
const treeKill = require('tree-kill');

let electronProcess;

const config = require('./webpack.config.development');

const argv = require('minimist')(process.argv.slice(2));

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3000;

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

function createHotElectronProcess(cb) {
  const electronProcess = spawn('npm', ['run', 'start-hot'], { /* shell: true, */ env: process.env, stdio: 'inherit' });
  electronProcess.on('error', spawnError => console.error(spawnError));
  return electronProcess;
}

const server = app.listen(PORT, 'localhost', serverError => {
  if (serverError) {
    return console.error(serverError);
  }

  if (argv['start-hot']) {
    tscWatch.on('first_success', () => {
      console.log('typescript watcher ready, start electron...');
      electronProcess = createHotElectronProcess();
    });

    tscWatch.on('subsequent_success', () => {
      console.log('restarting electron...');
      treeKill(electronProcess.pid, 'SIGKILL', createHotElectronProcess);
    });

    tscWatch.on('compile_errors', () => {
      console.log('compile main error!!!!!!!!!');
    });

    tscWatch.start('-p', 'app');
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
