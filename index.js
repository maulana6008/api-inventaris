const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const app = express()

app.use(cors())

const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
//     next()  
// })

require("./routes/peminjamRoute")(app)
require("./routes/inventarisRoute")(app)
require("./routes/authRoute")(app)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})