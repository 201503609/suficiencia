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
    res.send('hola');
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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
