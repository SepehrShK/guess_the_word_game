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
console.log(randomWord);

let shuffledWord = shuffle(randomWord);
console.log(shuffledWord);


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
    });

    box.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && box.value === '' && index > 0) {
            inputBoxes[index - 1].disabled = false;
            inputBoxes[index - 1].focus();
            inputBoxes[index].disabled = true;
        }
    });
});






