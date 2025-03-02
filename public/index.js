
let currentSlot = 0
let wordleSlots = [];
let word = "";

async function getRandomWord() {

    const response = await fetch('./randomword/')

    if(response.ok) {

        const result = response.json()

        word = result["word"]

    } else {

        word = "ERROR"

    }

}

document.addEventListener("DOMContentLoaded", async () => {

    await getRandomWord();
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
                    currentSlot--    
                }
                break;
        }
    
    })
})

