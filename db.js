const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: 'postgresql://programmer:91zBAq9yStMfCYnxkmC3E9BQKQ6gJ784@dpg-ctmtjrrv2p9s73fev0ng-a.oregon-postgres.render.com/user_coordinates_database_9c9z',
    ssl: {

        rejectUnauthorized: false
    }
})

const getWord = (request,response) => {

    const word = request.params.word

    pool.query('SELECT * FROM Words WHERE Word = $1',[word],

        (error,results) => {

            if(error) {

                throw(error)
            } else {

                return results.rows[0];

            }
 
        }
    )

}

const getWords = (request,response) => {

    pool.query('SELECT * FROM Words;',

        (error,results) => {

            if(error) {

                throw(error)
            } else {

                return results.rows;

            }
 
        }
    )

}

const getNumWords = () => {

    let numWords = 0

    pool.query('SELECT COUNT(*) FROM Words;',(error,results) => {

        if(error)
        {

            throw(error)
        } else {

            return results.rows[0];

        }
        

    })

}
const selectRandomWord = (request,response) => {

    let numWords = getNumWords();

    let randomWordId = Math.ceil(Math.random() * numWords);

    pool.query('SELECT * FROM Words WHERE id = $1',[randomWordId],

        (error,results) => {

            if(error) {

                throw(error)
            } else {

                return results.rows[0];

            }
 
        }
    )

}

module.exports = {selectRandomWord, getWord, getWords}

