const express = require('express')
const app = express()
const { port } = require('./core/config')
const conn = require('./core/db')
const routes = require('./routes')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes)


app.listen(port, ()=>{
    console.log("connected on port %s", port);
});