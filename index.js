
const questionEl = document.getElementById("questions");
const questionFormEl = document.getElementById("questionForm");
const resetEl = document.getElementById('resetButton');
const scoreEl = document.getElementById("score");
const hiScoreEl = document.getElementById("hi-score");
let storedAnswer;
let score = Number.parseInt(localStorage.getItem("score")) || 0;
let highestScore = Number.parseInt(localStorage.getItem('highestScore')) || 0;


const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

//Generate questions and its answers.

const generateQuestions =() =>{

    const randomNumber1 = randomNumber(1,10);
    const randomNumber2 = randomNumber(1,10);
    const questionType = randomNumber(1,6); //Randomize question selection.
    let question;
    let answer;

    // For subtraction and division.

    let bigNumber;
    let smallNumber;

    if (questionType > 3){
        bigNumber = randomNumber1 > randomNumber2 ? randomNumber1 : randomNumber2;
        smallNumber = randomNumber1 < randomNumber2 ? randomNumber1 : randomNumber2;
    }else{
        bigNumber = randomNumber1;
        smallNumber = randomNumber2;
    }
    
    switch(questionType){
        case 1:
            question = `Q. What is ${bigNumber} multiplied by ${smallNumber}?`;
            answer = bigNumber * smallNumber;
            break;

        case 2:
            question = `Q. What is square of ${bigNumber}?`;
            answer = bigNumber ** 2;
            break;
        
        case 3:
            question = `Q. What is ${bigNumber} added to ${smallNumber}?`;
            answer = bigNumber + smallNumber;
            break;

        case 4:
            question = `Q. How many time ${smallNumber} goes into ${bigNumber}?`;
            answer = Math.floor(bigNumber / smallNumber);
            break;

        case 5:
            question = `Q. When ${bigNumber} is divided by ${smallNumber}, what is the remainder?`;
            answer = bigNumber % smallNumber;
            break;

        case 6:
            question = `Q. What is ${smallNumber} subtracted from ${bigNumber}?`;
            answer = bigNumber - smallNumber;
            break;     
    }


    return { question, answer };
    
};

//Render questions and score in webpage.

const showQuestion = () =>{
    const { question, answer } = generateQuestions();
    questionEl.innerText = question;
    hiScoreEl.innerText = highestScore;
    scoreEl.innerText = score;
    storedAnswer = answer;
};

//Check Answer and increase or decrease score.

const checkAnswer = (event) =>{
    event.preventDefault();

    const formData = new FormData(questionFormEl);
    const userAnswer = Number.parseInt(formData.get("answer"));

    if(userAnswer == storedAnswer){
        score += 1;
        Toastify({
            text: `You are right. The answer is ${storedAnswer}`,
            className: "info",
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    }
    else{
        score -= 1;
        Toastify({
            text: `You are Wrong. The answer is ${storedAnswer}`,
            className: "info",
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #b00015, #703dc9)",
            }
          }).showToast();
    }
    scoreEl.innerText = score;
    localStorage.setItem('score', score);

    //Highest score calculator.

    if(score > highestScore){
        highestScore = score;
        localStorage.setItem('highestScore', highestScore);
    }


    event.target.reset();
    showQuestion();
};

//Reset score feature.

resetEl.addEventListener('click', () => {
    score = 0;
    localStorage.setItem('score', score);
    scoreEl.innerText = score;
});


showQuestion();