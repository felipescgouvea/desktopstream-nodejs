const express = require('express')
const app = express()
const path = require('path')
const appServer = require('./server.js').createServer(app)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')


app.use('/', (req,res) => {
    res.render('index.html')
    res.end()
})

appServer.startStream()

appServer.listen()