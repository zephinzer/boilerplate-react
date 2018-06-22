const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const expressPrometheusBundle = require('express-prom-bundle');

const server = express();
const metrics = expressPrometheusBundle({
  autoregister: false,
  ignore: ['/healthz', '/readyz', '/metrics'],
  includePath: true,
  includeMethod: true,
  promClient: {
    collectDefaultMetrics: {
      timeout: 1000,
    },
  },
});

server.use(compression());
server.use(helmet());
server.use(metrics);
server.get('/healthz', (req, res) => res.send('ok'));
server.get('/readyz', (req, res) => res.send('ok'));
server.use('/metrics', metrics.metricsMiddleware);
server.use('/', express.static(path.join(__dirname, './dist')));

const serverInstance = server.listen(process.env.PORT || 8080, (err) => {
  console.info(`Listening on ${process.env.PORT || 8080}`);
});

const versionMetrics = new metrics.promClient.Gauge({
  name: 'version',
  help: 'Webpack build hash',
  labelNames: ['build', 'package', 'timestamp']
});

const now = (new Date());
const month = now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth();
const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
const minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
const second = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
const timestamp = `${now.getFullYear()}${month}${date}${hour}${minute}${second}`;
let buildHash;
try {
  buildHash = fs.readFileSync(path.join(__dirname, './dist/.version')).toString();
} catch (ex) {
  buildHash = 'unknown';
}
versionMetrics.labels(
  buildHash,
  require('./package.json').version,
  `${now.toDateString()} ${now.toTimeString()}`
).set(
  parseInt(timestamp)
);

process.on('SIGINT', () => {
  console.error('SIGINT received. Shutting down server gracefully...');
  serverInstance.close(() => {
    console.info('Exiting with status code 1.');
    process.exit(1);
  });
});
