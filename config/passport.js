const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../db.js')

passport.use(new LocalStrategy(async function(username,password,done) {

    console.log('Authenticating')
    try {

        let u = ''
        const user = new Promise(async (resolve,reject) => {
        
            try {
        
                u = await db.checkIfUserExists(username)
        
                if(u === 'No user exists') {
        
                    reject()
                } else {
        
                    resolve()
                }
            } catch(error) {
        
                reject(error)
            }
        
        })

        user.then(async () => {

            const match = await bcrypt.compare(password, u.password)
            if(match) {

                return done(null,u)
            }
            
            return done(null,false)

        }).catch(() => {

            return done(null,false)

        })

        

    } catch(error) {

        return done(null, false)
    }

}))

passport.serializeUser((user,done) => {

    done(null,user.username)

})

passport.deserializeUser(async (username,done) => {

    const user = await db.checkIfUserExists(username)

    done(null,user)
})