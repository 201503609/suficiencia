const express = require('express');
const app = express();

const PORT = 3000;
const HOST = '0.0.0.0' || process.env.IP;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json({'message':'hola'});
});

const testRouter = require('./api-routes/test');
app.use('/test', testRouter);

const dataRouter = require('./api-routes/stored-data');
app.use('/data', dataRouter);

const graphsRouter = require('./api-routes/graphs');
app.use('/graphs', graphsRouter);

const countryRouter = require('./api-routes/country');
app.use('/country', countryRouter);

const covidRouter = require('./api-routes/covid-vaccinated');
app.use('/vaccinated', covidRouter);

const ramRouter = require('./api-routes/ram');
app.use('/ram', ramRouter);

const procsRouter = require('./api-routes/procs');
app.use('/procs', procsRouter);

const cpuRouter = require('./api-routes/cpu');
app.use('/cpu', cpuRouter);

const redisRouter = require('./api-routes/redis-service');
app.use('/redis', redisRouter);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
