let mongoose = require('mongoose')
let options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
};

let url = CONFIG.mongoDB.url;
if (process.env.MONGO_HOST != undefined) {
    url = 'mongodb://host.docker.internal:27017/exampledb'
}
let conn = mongoose.createConnection(url, options)


const fs = require('fs')
const files = fs.readdirSync('./db/models/')

let models = {};
files.forEach(name => {
    if (!name.match(/\.js$/)) return;
    if (name === 'index.js') return;
    let model = require('./' + name)(conn)
    models[name.replace('.js', '')] = model;
})

module.exports = models;
