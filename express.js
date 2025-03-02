const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db.js')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
const bcrypt = require('bcrypt')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(helmet())

app.use(session({

    secret: "#TERCES",
    cookie: {maxAge: 60 * 60 * 48 * 1000},
    secure: false,
    saveUninitialized: false,
    resave: false,
    sameSite: "none"

}))

app.use(passport.initialize());
app.use(passport.session())
require('./config/passport')

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}))

app.set('view engine','ejs')
app.set('views','./views')

app.get('/wordle/',(req,res,next) => {

    res.render('wordle')

})

app.get('/',(req,res,next) => {

    res.render('home-page')

})

app.get('/register/',(req,res,next) => {

    res.render('register')

})

app.get('/login/',(req,res,next) => {

    res.render('login')

})

app.post('/register/',async (req,res,next) => {

    const {username,password} = req.body


    const user = new Promise(async (resolve,reject) => {

        try {

            const u = await db.checkIfUserExists(username)

            if(u === 'No user exists') {

                resolve()
            } else {

                reject()
            }
        } catch(error) {

            reject(error)
        }

    })

    user.then(async () => {

        try {

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password,salt)

            await db.registerUser(username,hash)

            res.redirect('../')
        } catch(error) {

            res.status(500).send('Server error')
        }
        

    }).catch(() => {

        res.redirect('./')

    })

})

app.post('/login/', passport.authenticate('local',{successRedirect: '../wordle', failureRedirect: './'}))

app.get('/words/',db.getWords)

app.get('/words/:word',db.getWord)

app.get('/randomword/',db.selectRandomWord)

app.listen(PORT, () => {

    console.log('Listening on port ' + PORT)

})