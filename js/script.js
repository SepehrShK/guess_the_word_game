function getRandomWord() {
    const words = [
        // 4-letter words
        "tree", "fish", "wolf", "rock", "moon", "lamp", "book", "star", "snow", "frog", "door", "wind",
        
        // 5-letter words
        "apple", "house", "table", "chair", "piano", "phone", "water", "cloud", "bread", "river", "stone", "light", "heart", "brush", "grass", "tiger", "zebra", "earth", "stars", "ocean",

        // 6-letter words
        "guitar", "flower", "bottle", "candle", "mouse", "planet", "stream", "ticket", "forest", "bridge", 
        "silver", "summer", "window", "island", "rocket",

        // 7-letter words
        "picture", "glasses", "holiday", "journey", "freedom", "adviser", "teacher", "library", "meeting", "warning"
    ];

    const randomWord = words[Math.floor(Math.random() * words.length)];

    return randomWord;
}

function shuffle(word) {
    let lettersArray = word.split('');

    for (let i = lettersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
    }
    return lettersArray.join('');
}

let randomWord = getRandomWord();
console.log(`the answer is (${randomWord}) you cheater`);

let shuffledWord = shuffle(randomWord);


const scramblleWord = document.querySelector('.scramblle_word p')
scramblleWord.innerHTML = ""

const input = document.querySelector('.input')

for (let i = 0; i < shuffledWord.length; i++) {
    scramblleWord.innerHTML += ` ${shuffledWord[i]}`

    const input_box = document.createElement('input')
    input_box.className = "input_box";
    input_box.setAttribute('type', 'text')
    input_box.setAttribute('maxlength', '1')
    input_box.setAttribute('title', `Letter ${i+1}`)
    input_box.disabled = true;
    input.appendChild(input_box);
}


const inputBoxes = document.querySelectorAll('.input_box');
const mistakeText = document.querySelector('.mistake_text');
const tryText = document.querySelector('.try_text');
const tryCircle = document.querySelectorAll('.try_circle');
let counter = 1;

window.addEventListener('load', () => {
    inputBoxes[0].disabled = false;
    inputBoxes[0].focus();
});

inputBoxes.forEach((box, index) => {
    box.addEventListener('input', (event) => {
        const currentBox = event.target;
        const nextBox = inputBoxes[index + 1];

        if (currentBox.value.length === 1 && nextBox) {
            nextBox.disabled = false;
            nextBox.focus();
            currentBox.disabled = true;
        }
        if (index === randomWord.length - 1 && currentBox.value.length === 1) {
            let guessedWord = ''
            inputBoxes.forEach((input) => {
                guessedWord += input.value
            });
            console.log(guessedWord);

            if (guessedWord === randomWord) {
                window.location.reload();
                alert('🎉 Success');
            } else {
                counter += 1;
                tryText.textContent = `Tries(${counter}/6):`
                tryCircle[counter-1].style.backgroundColor = "#7429C6";
                mistakeText.textContent += ` ${guessedWord},`
                inputBoxes.forEach((box, index) => {
                    box.value = '';
                    if (index === 0) {
                        box.disabled = false;
                        box.focus();
                    } else {
                        box.disabled = true;
                    }
                });
            }
        }
    });

    box.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && box.value === '' && index > 0) {
            inputBoxes[index - 1].disabled = false;
            inputBoxes[index - 1].focus();
            inputBoxes[index].disabled = true;
        }
    });
});



const reloadButton = document.querySelectorAll('.button')[0]
const resetButton = document.querySelectorAll('.button')[1]

// Reload button functionality: Reload the page
reloadButton.addEventListener('click', () => {
    window.location.reload();
});

// Reset button functionality: Clear all inputs and disable them except the first one
resetButton.addEventListener('click', () => {
    mistakeText.textContent = 'Mistakes:'
    tryText.textContent = `Tries(1/6):`
    for (let i = 1; i < 6; i++) {
        tryCircle[i].style.backgroundColor = "#4A5567";
    }
    counter = 1;
    inputBoxes.forEach((box, index) => {
        box.value = '';
        if (index === 0) {
            box.disabled = false;
            box.focus();
        } else {
            box.disabled = true;
        }
    });
});




