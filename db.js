const Pool = require('pg').Pool;
require('dotenv').config()

const connectionString = 'postgresql://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

// WORDLE RELATED QUERIES

const getWord = (request,response) => {

    const word = request.params.word

    pool.query('SELECT * FROM Words WHERE Word = $1',[word],

        (error,results) => {

            if(error) {

                response.status(500).json({error: error.message});
            } else {

                response.json(results.rows[0]);

            }
 
        }
    )

}

const getWords = (request,response) => {

    pool.query('SELECT * FROM Words;',

        (error,results) => {

            if(error) {

                results.status(500).json({ error: error.message })
            } else {

                response.json(results.rows);

            }
 
        }
    )

}

const getNumWords = async () => {

    try {
        const results = await pool.query('SELECT COUNT(*) FROM Words;');
        return results.rows[0]; // ✅ Returns an object like { count: '5' }
    } catch (error) {
        console.error(error);
        throw error;
    }

}
const selectRandomWord = async (request,response) => {

    try {
        let numWords = await getNumWords();
        let numWordCount = Number(numWords.count); // Convert to number

        let randomWordId = Math.ceil(Math.random() * Math.max(numWordCount, 1));

        const results = await pool.query('SELECT * FROM Words WHERE id = $1', [randomWordId]);

        response.json(results.rows[0]); // Send JSON response

    } catch (error) {
        response.status(500).json({ error: error.message });
    }

}

//USER RELATED QUERIES

const registerUser = async (username,password) => {


    try {

        await pool.query('INSERT INTO WordleUsers VALUES ($1, $2, 0, 0, 0, 0, 0);',[username,password],

            (error,results) => {

                if(error) {

                    throw(error)
                }
            }
        )

    } catch(error) {

        throw(error)

    }

}

const checkIfUserExists = async (username) => {
    try {
        const results = await pool.query('SELECT * FROM WordleUsers WHERE Username = $1;', [username]);

        if (results.rows.length === 0) {
            return 'No user exists'; // Resolve with a message
        }

        return results.rows[0]; // Resolve with user data
    } catch (error) {

        throw error; // Reject with error
    }
};

async function getUserStreak(username) {

    try {

        const results = await pool.query('SELECT CurrentStreak FROM WordleUsers WHERE Username = $1',[username])

        return results.rows[0].currentstreak;

    } catch(err) {

        throw err;
    }

}

async function updateUserStreak(username,succeeded) {

    try {

        let bestStreakJSON = await pool.query('SELECT BestStreak FROM WordleUsers WHERE Username = $1',[username])
        let bestStreak = bestStreakJSON.rows[0].beststreak
        let currStreak = await getUserStreak(username)

        if(succeeded) {

            currStreak++
        } else { currStreak = 0 }

        const results = await pool.query('UPDATE WordleUsers SET CurrentStreak = $1 WHERE Username = $2',[currStreak,username])

        if(currStreak > bestStreak) {

            await pool.query('UPDATE WordleUsers SET BestStreak = $1 WHERE Username = $2',[currStreak,username])

        }

    } catch(err) {

        throw(err)
    }

}

async function increaseNumPlays(username) {

    try {

        let numPlays = 0

        const results = await pool.query('SELECT NumPlays FROM WordleUsers WHERE Username = $1',[username]);

        numPlays = results.rows[0].numplays;
        numPlays++

        await pool.query('UPDATE WordleUsers SET NumPlays = $1 WHERE Username = $2',[numPlays,username])


    } catch(err) {  throw(err) }

}

async function getWinRate(username) {

    try {

        const result = await pool.query('SELECT WinRate FROM WordleUsers WHERE Username = $1',[username])

        const winRate = result.rows[0].winrate

        return winRate

    } catch(err) { throw(err) }

}

async function updateWinRate(username) {

    try {

        let numPlays = 0
        let numWins = 0

        const resultsOne = await pool.query('SELECT NumWins FROM WordleUsers WHERE Username = $1',[username])
        const resultsTwo = await pool.query('SELECT NumPlays FROM WordleUsers WHERE Username = $1',[username])
        
        numWins = resultsOne.rows[0].numwins;
        numPlays = resultsTwo.rows[0].numplays;

        const newWinRate = numWins/numPlays

        await pool.query('UPDATE WordleUsers SET WinRate = $1 WHERE Username = $2',[newWinRate,username])

    } catch(err) { throw(err) }

}

async function increaseWins(username) {

    try {

        let numWins = 0
        const results = await pool.query('SELECT NumWins FROM WordleUsers WHERE Username = $1',[username])

        numWins = results.rows[0].numwins
        numWins++

        await pool.query('UPDATE WordleUsers SET NumWins = $1 WHERE Username = $2',[numWins,username])

    } catch(err) { 
        
        console.log('Error happened here')
        throw(err) 
    }

}

async function showTopTenPlusCurrent(username) {

    try {

        let topTen = {}

        const resultsOne = await pool.query('SELECT BestStreak FROM WordleUsers WHERE Username = $1',[username])

        const userBestStreak = results.rows[0].userBestStreak

        const resultsTwo = await pool.query('SELECT Username,BestStreak FROM WordleUsers ORDER BY BestStreak DESC LIMIT 10;')

        for (let i = 0; i < resultsTwo.rows.length; i++) {

            topTen[i] = {username: resultsTwo.rows[i].username, streak: resultsTwo.rows[i].beststreak}

        }

        return { userBestStreak, topTen }

    } catch(err) { throw(err) }

}

module.exports = {
    selectRandomWord, 
    getWord, 
    getWords, 
    registerUser, 
    checkIfUserExists, 
    getUserStreak, 
    updateUserStreak, 
    increaseNumPlays, 
    increaseWins, 
    getWinRate, 
    updateWinRate, 
    showTopTenPlusCurrent
};

