const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: 'postgresql://programmer:91zBAq9yStMfCYnxkmC3E9BQKQ6gJ784@dpg-ctmtjrrv2p9s73fev0ng-a.oregon-postgres.render.com/user_coordinates_database_9c9z',
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

        await pool.query('INSERT INTO WordleUsers VALUES ($1, $2);',[username,password],

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

module.exports = {selectRandomWord, getWord, getWords, registerUser, checkIfUserExists };

