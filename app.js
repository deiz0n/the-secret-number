let numbersRandonsExisting = [];
let numberMax = 10; 
let number = randomNumber();
let tentativas = 0;

function getMessage(tag, msg) {
    let title = document.querySelector(tag);
    title.innerHTML = msg;
    responsiveVoice.speak(msg, 'Brazilian Portuguese Female', {rate:1.2})
}

function sourceText() {
    getMessage('h1', 'The Secret Number');
    getMessage('p', 'Escolha um número entre 1 e 10');
}

sourceText();

function verificarChute() {
    let input = document.querySelector('input').value;
    if (input == number) {
        tentativas++;
        getMessage('h1', 'Acertou');
        let nameTent = tentativas == 1 ? 'tentativa' : 'tentativas';
        getMessage('p', `Você descobriu o número secreto com ${tentativas} ${nameTent}`)

        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        getMessage('h1', 'Errou');
        tentativas++;
        number > input ? getMessage('p', 'O número secreto é maior') : getMessage('p', 'O número secreto é menor')
        clearField()
    }
}

function randomNumber() {
    let numberSorted = parseInt(Math.random() * numberMax + 1);
    let listSize = numbersRandonsExisting.length;

    if (listSize == numberMax) {
        numbersRandonsExisting = [];
    }
    
    if (numbersRandonsExisting.includes(numberSorted)) {
        return randomNumber();
    } else {
        numbersRandonsExisting.push(numberSorted);
        return numberSorted;
    }
}

function clearField() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    number = randomNumber();
    clearField();
    tentativas = 0;
    sourceText();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
