const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const logger = require('morgan')
const methodOverride = require('method-override')



// ------------------------------------------------------------------------------
// CONFIG
// ------------------------------------------------------------------------------

let config = require('./config/default')
if (process.env.NODE_ENV === 'development') {
    config = require('./config/development')
} else if (process.env.NODE_ENV === 'production') {
    config = require('./config/production')
}


const app = express()
const auth = express()
const apiV1 = express()
const adminV1 = express()




// ------------------------------------------------------------------------------
// GLOBAL VARIABLE
// ------------------------------------------------------------------------------

global.GLOBAL_PATH = path.resolve(__dirname)
global.CONFIG = config;
global.MODELS = require(GLOBAL_PATH + '/db/models')
global.OUT = require(GLOBAL_PATH + '/utils/output')


app.use(logger('dev'))
app.use(bodyParser.json({ limit: '5mb' })) //For parse body from API received
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' })) //part of body parser
app.use(cors()) // Cross-origin resource sharing (CORS)
app.use(methodOverride('X-HTTP-Method-Override'))//Content type
app.use(express.static(path.join(__dirname, 'public')))//Read default dir



// ------------------------------------------------------------------------------
// ENDPOINT ROUTE
// ------------------------------------------------------------------------------
app.use('/auth', auth)
app.use('/api/v1', apiV1)
app.use('/admin/v1', adminV1)

require('./routes/auth')(auth) // load our routes and pass in our app
require('./routes/api/v1/index.js')(apiV1) // load our routes and pass in our app
require('./routes/admin/v1/index.js')(adminV1) // load our routes and pass in our app


app.get('/', (req, res) => res.status(200).send('App Running'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err)
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
    res.json({
        error: err
    })

})


// ------------------------------------------------------------------------------
// ESTABLISH CONNECTION NON-SSL AND SSL
// ------------------------------------------------------------------------------
let port = CONFIG.app.port;
if (process.env.NODE_ENV == 'production') {
    let sslSettings = {
        key: fs.readFileSync(CONFIG.sslSettings.key).toString(),
        cert: fs.readFileSync(CONFIG.sslSettings.cert).toString(),
        ca: [
            fs.readFileSync(CONFIG.sslSettings.cert_g).toString(),
            fs.readFileSync(CONFIG.sslSettings.cert_g1).toString(),
            fs.readFileSync(CONFIG.sslSettings.cert_g2).toString()
        ]
    };

    https.createServer(sslSettings, app).listen(443, function () {
        console.log('App is listening on secure port 443')
    })
    http.createServer(function (req, res) {
        // Redirect from http port to https
        if (req.headers['host'].includes('domain.com') === true || req.headers['host'].includes('www.domain.co.id') === true) {
            res.writeHead(301, {
                'Location': 'https://domain.co.id' + req.url
            })
        } else {
            res.writeHead(301, {
                'Location': 'https://' + req.headers['host'] + req.url
            })
        }
        res.end()
    }).listen(config.port)
} else {
    http.createServer(app).listen(port, function () {
        console.log('App is listening to port ' + port)
    })
}





// ------------------------------------------------------------------------------
// SEED AND MIGRATION
// ------------------------------------------------------------------------------
const seeds = require('./db/seeds')
seeds.runAll()


// ------------------------------------------------------------------------------
// TASK SCHEDULER
// ------------------------------------------------------------------------------
const worker = require('./utils/worker')

// run for first time for development only
if (process.env.NODE_ENV !== 'production') {
    worker.runElasticTask()
    worker.runRedisTask()
}


const cron = require('cron')

new cron.CronJob({
    cronTime: '00 1 01 * * *', //runs everyday at 01.01.01
    onTick: worker.runElasticTask,
    start: false,
    timeZone: 'Asia/Jakarta'
})

new cron.CronJob({
    cronTime: '00 2 01 * * *', //runs everyday at 02.01.01
    onTick: worker.runRedisTask,
    start: false,
    timeZone: 'Asia/Jakarta'
})





exports = module.exports = app;