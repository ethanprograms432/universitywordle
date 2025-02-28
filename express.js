const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db.js')
const helmet = require('helmet')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(helmet())

app.use(cors())
app.use(bodyParser.json())

app.set('view engine','ejs')
app.set('views','./views')

app.get('/',(req,res,next) => {

    res.render('wordle')

})

app.get('/words/',db.getWords)

app.get('/words/:word',db.getWord)

app.get('/words/random/',db.selectRandomWord)

app.listen(PORT, () => {

    console.log('Listening on port ' + PORT)

})