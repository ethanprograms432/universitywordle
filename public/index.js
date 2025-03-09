
let currentSlot = 0
let wordleSlots = [];
let word = "";
let guessed = false;

let failureScreen = null
let successScreen = null
let viewLeaderboardButtons = []
let playAgainButtons = []

async function getRandomWord() {

    const response = await fetch('./randomword/')

    if(response.ok) {

        const result = await response.json()

        word = result.word

    } else {

        word = "ERROR"

    }
}

document.addEventListener("DOMContentLoaded", async () => {

    await getRandomWord();
    successScreen = document.getElementById('success-screen')
    failureScreen = document.getElementById('failure-screen')

    playAgainButtons = Array.from(document.getElementsByClassName('play-again'))

    playAgainButtons.forEach((button) => {

        button.addEventListener('click', () => {

            window.location.href = '/'

        })

    })

    const rowOneElements = Array.from(document.getElementById("not-included-1").children);
    const rowTwoElements = Array.from(document.getElementById("not-included-2").children);
    const rowThreeElements = Array.from(document.getElementById("not-included-3").children);
    const rowFourElements = Array.from(document.getElementById("not-included-4").children);
    const rowFiveElements = Array.from(document.getElementById("not-included-5").children);
    rowOneElements.forEach((slot) => {

        wordleSlots.push(slot);

    })

    rowTwoElements.forEach((slot) => {

        wordleSlots.push(slot);

    })

    rowThreeElements.forEach((slot) => {

        wordleSlots.push(slot);

    })

    rowFourElements.forEach((slot) => {

        wordleSlots.push(slot);

    })

    rowFiveElements.forEach((slot) => {

        wordleSlots.push(slot);

    })

    document.addEventListener("keydown", function(event) {

        if(currentSlot <= 24 && guessed === false) {

            switch(event.code) {
        
                case "KeyA":
        
                    wordleSlots[currentSlot].innerText = "A";
                    currentSlot++
                    break;
        
                case "KeyB":
        
                    wordleSlots[currentSlot].innerText = "B";
                    currentSlot++    
                    break;
        
                case "KeyC":
        
                    wordleSlots[currentSlot].innerText = "C";
                    currentSlot++    
                    break;
        
                case "KeyD":
        
                    wordleSlots[currentSlot].innerText = "D";
                    currentSlot++    
                    break;
        
                case "KeyE":
        
                    wordleSlots[currentSlot].innerText = "E";
                    currentSlot++    
                    break;
        
                case "KeyF":
        
                    wordleSlots[currentSlot].innerText = "F";
                    currentSlot++    
                    break;
        
                case "KeyG":
        
                    wordleSlots[currentSlot].innerText = "G";
                    currentSlot++    
                    break;
        
                case "KeyH":
        
                    wordleSlots[currentSlot].innerText = "H";
                    currentSlot++    
                    break;
        
                case "KeyI":
        
                    wordleSlots[currentSlot].innerText = "I";
                    currentSlot++    
                    break;
        
                case "KeyJ":
        
                    wordleSlots[currentSlot].innerText = "J";
                    currentSlot++    
                    break;
        
                case "KeyK":
        
                    wordleSlots[currentSlot].innerText = "K";
                    currentSlot++    
                    break;
        
                case "KeyL":
        
                    wordleSlots[currentSlot].innerText = "L";
                    currentSlot++    
                    break;
        
                case "KeyM":
        
                    wordleSlots[currentSlot].innerText = "M";
                    currentSlot++    
                    break;
        
                case "KeyN":
        
                    wordleSlots[currentSlot].innerText = "N";
                    currentSlot++    
                    break;
        
                case "KeyO":
        
                    wordleSlots[currentSlot].innerText = "O";
                    currentSlot++    
                    break;
        
                case "KeyP":
        
                    wordleSlots[currentSlot].innerText = "P";
                    currentSlot++    
                    break;
        
                case "KeyQ":
        
                    wordleSlots[currentSlot].innerText = "Q";
                    currentSlot++    
                    break;
        
                case "KeyR":
        
                    wordleSlots[currentSlot].innerText = "R";
                    currentSlot++    
                    break;
        
                case "KeyS":
        
                    wordleSlots[currentSlot].innerText = "S";
                    currentSlot++    
                    break;
        
                case "KeyT":
        
                    wordleSlots[currentSlot].innerText = "T";
                    currentSlot++    
                    break;
        
                case "KeyU":
        
                    wordleSlots[currentSlot].innerText = "U";
                    currentSlot++    
                    break;
        
                case "KeyV":
        
                    wordleSlots[currentSlot].innerText = "V";
                    currentSlot++    
                    break;
        
                case "KeyW":
        
                    wordleSlots[currentSlot].innerText = "W";
                    currentSlot++    
                    break;
        
                case "KeyX":
        
                    wordleSlots[currentSlot].innerText = "X";
                    currentSlot++    
                    break;
        
                case "KeyY":
        
                    wordleSlots[currentSlot].innerText = "Y";
                    currentSlot++    
                    break;
        
                case "KeyZ":
        
                    wordleSlots[currentSlot].innerText = "Z";
                    currentSlot++    
                    break;
        
                case "Backspace":
        
                    if(currentSlot !== 0 && currentSlot % 5 !== 0) {
        
                        wordleSlots[currentSlot-1].innerText = "";
                        wordleSlots[currentSlot-1].style.backgroundColor = 'white';
                        currentSlot--    
                    }
                    break;
            }
        }
    
        if(currentSlot === 5 || currentSlot === 10 || currentSlot === 15 || currentSlot === 20 || currentSlot === 25)
        {

            colorLetters(currentSlot)

        }
    })
})

function colorLetters(num) {

    let guessedWord = ''
    let j = 0
    let correctlyGuessed = 0

    for (let i = num - 5; i < num; i++) {

        guessedWord += wordleSlots[i].innerText

    }

    for (let i = num - 5; i < num; i++)
    {

        if(guessedWord.charAt(j) !== word.charAt(j)) {

            if(word.includes(guessedWord.charAt(j))) {

                wordleSlots[i].style.backgroundColor = 'yellow'

            }

        } else {

             wordleSlots[i].style.backgroundColor = 'green'
             correctlyGuessed++

        }
        j++

    }

    if(correctlyGuessed === 5) {

        guessed = true

    }

}

const showSuccessMessage = (callback) => {

    const interval = setInterval(() => {

        if(guessed) {

            clearInterval(interval)
            callback()
        }

    }, 100)
 
}

const showFailureMessage = (callback) => {

    const interval = setInterval(() => {

        if(guessed === false && currentSlot >= 24) {

            clearInterval(interval)
            callback()
        }

    }, 100)

}

async function getUser() {

    try {

        const response = await fetch('./profile/')

        if(response.ok) {

            const result = response.json()

            result.then(result => {

                return result.user.username

            }).catch(() => {

                return 'Error retrieving user (once again)'
            })

        }
        return 'Error retrieving user (route error)'

    } catch(error) {

        throw(error)
        return 'Error retrieving user (server error)'
    }

}

showSuccessMessage(async () => {

    try {

        failureScreen.style.display = 'none'
        const username = await getUser()
        let currStreak = 0

        await fetch('./plays/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        })

        await fetch('/streak/',{
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                increase: true
            })
        })
        

        await fetch('/wins/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        })

        await fetch('/winrate/',{
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
            })
        })

        const streakResponse = await fetch('./streak/')
        const streakJSON = await streakResponse.json()
        currStreak = streakJSON.streak

        const streakMessage = document.getElementById('current-streak')
        const winRateMessage = document.getElementById('current-win-rate-success')

        const winRateResponse = await fetch('./winrate/')
        const winRateJSON = await winRateResponse.json()
        let userWinRate = winRateJSON.winRate
        userWinRate *= 100
    
        successScreen.style.display = 'block'
        successScreen.style.color = 'green'
        streakMessage.innerText = `Your current streak is ${currStreak}`
        winRateMessage.innerText = `Your current win rate is ${userWinRate}%`
        

    } catch(err) { throw(err) }

})

showFailureMessage(async () => {

    try {

        const user = await getUser()

        await fetch('./plays/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user
            })
        })

        await fetch('./streak/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                increase: false
            })
        })

        await fetch('/winrate/',{
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
            })
        })

        const winRateResponse = await fetch('./winrate/')
        const winRateJSON = await winRateResponse.json()
        let userWinRate = winRateJSON.winRate
        userWinRate *= 100

        const failureMessage = document.getElementById('failure-message')
        const winRateMessage = document.getElementById('current-win-rate-failure')
        failureScreen.style.display = 'block'
        failureMessage.innerText = `The correct word was ${word}`
        winRateMessage.innerText = `Your win rate is ${userWinRate}%`

    } catch(err) { throw(err) }

})

