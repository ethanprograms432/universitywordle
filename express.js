const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db.js')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
const bcrypt = require('bcrypt')

require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(helmet())

app.use(session({

    secret: process.env.SECRET_KEY || "fallback-secret",
    cookie: {maxAge: 1000 * 60 * 60 * 48},
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

    if(req.user !== undefined) {

        res.render('wordle')
    } else {

        res.render('home-page')
    }
    

})

app.get('/',(req,res,next) => {

    res.render('home-page')

})

app.get('/register/',(req,res,next) => {


    res.render('register', {errorText: ""})

})

app.get('/login/',(req,res,next) => {

    if(req.query.error) {

        res.render('login',{errorText: "Username and/or password is incorrect!"})

    } else {

        res.render('login',{errorText: ""})
    }
    

})

app.get('/profile/',(req,res) => {

    if(!req.isAuthenticated) {

        res.status(401).send("User wasn't successfully authenticated")
    }

    res.json({user: req.user})

})

app.post('/plays/',async (req,res,next) => {

    await db.increaseNumPlays(req.user.username)
    res.status(201).send()
})

app.get('/streak/',async (req,res,next) => {

    const currStreak = await db.getUserStreak(req.user.username)
    res.json({streak: currStreak})
})

app.post('/streak/',async (req,res,next) => {

    await db.updateUserStreak(req.user.username,req.body.increase)
    res.status(201).send()
})

app.post('/winrate/',async (req,res,next) => {

    await db.updateWinRate(req.user.username)
    res.status(201).send()

})

app.get('/winrate/',async (req,res,next) => {

    const winRate = await db.getWinRate(req.user.username)
    res.json({winRate: winRate})

})

app.post('/wins/',async (req,res,next) => {

    await db.increaseWins(req.user.username)
    res.status(201).send()
})


app.post('/register/',async (req,res,next) => {

    const {username,password} = req.body


    const user = new Promise(async (resolve,reject) => {

        try {

            const u = await db.checkIfUserExists(username)

            console.log(u)
            if(u === 'No user exists') {

                resolve()
            } else {

                reject()
            }
        } catch(error) {

            throw(error)
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

        res.render("register",{errorText: "User already exists!"})

    })

})

app.post('/login/', passport.authenticate('local',{successRedirect: '../wordle', failureRedirect: './?error=true'}))

app.get('/words/',db.getWords)

app.get('/words/:word',db.getWord)

app.get('/randomword/',db.selectRandomWord)

app.listen(PORT, () => {

    console.log('Listening on port ' + PORT)

})