const express = require('express')
const bodyparser = require('./bodyparser')
const app = express()
const port = 3000

app.use(bodyparser)

app.use('/', function (req, res) {
    console.log(req.body);
});
app.listen(port, () => console.log(`Example app listening on port port!`))