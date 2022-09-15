let questions = [
    {
        "question": "Wie heißt die größte MMA-Organisation der Welt?",
        "answer_1": "NFC",
        "answer_2": "KFC",
        "answer_3": "KSW",
        "answer_4": "UFC",
        "rightAnswer": 4
    },
    {
        "question": "Wer ist der Präsident der UFC?",
        "answer_1": "Dana White",
        "answer_2": "Anderson Silva",
        "answer_3": "Walter White",
        "answer_4": "Hasbulla",
        "rightAnswer": 1
    },
    {
        "question": "Wie heißt der berühmte Ringsprecher?",
        "answer_1": "Anthony Pettis",
        "answer_2": "DC",
        "answer_3": "Bruce Buffer",
        "answer_4": "Joe Rogan",
        "rightAnswer": 3
    },
    {
        "question": "Zwar nicht der erfolgreichste, aber sicherlich der bekannteste UFC-Kämpfer ist...?",
        "answer_1": "Son Goku",
        "answer_2": "Tedros",
        "answer_3": "Conor McGregor",
        "answer_4": "Mike Tyson",
        "rightAnswer": 3
    },
    {
        "question": "Welche sind die drei Domänen des MMA-Sports?",
        "answer_1": "Sackhüpfen, Dosenwerfen und Tischtennis",
        "answer_2": "Beerpong, Flunky Ball und Flaschendrehen",
        "answer_3": "Kniebeugen, Bankdrücken und Kreuzheben",
        "answer_4": "Stand-Up, Wrestling und Grappling",
        "rightAnswer": 4
    },
    {
        "question": "Was ist ein Weight-Cut?",
        "answer_1": "Der Wellnessbesuch nach dem Kampf",
        "answer_2": "Eine Methode dem Körper Wasser zu entziehen",
        "answer_3": "Ein spaßiges Ritual vor den Kämpfen",
        "answer_4": "Das Interview nach den Kämpfen",
        "rightAnswer": 2
    },
    {
        "question": "Welche Schlagtechnik wurde nach einer Comic-Figur benannt",
        "answer_1": "Super Man",
        "answer_2": "Bat Man",
        "answer_3": "Spider Man",
        "answer_4": "Sponge Bob",
        "rightAnswer": 1
    },
    {
        "question": "Welche Hebeltechnik greift die Kreuzbänder an?",
        "answer_1": "Butterfly Guard",
        "answer_2": "Single Leg Takedown",
        "answer_3": "Heel Hook",
        "answer_4": "Omo- plata",
        "rightAnswer": 3
    }
]

let currentQuestion = 0;
let rightAnswerCount = 0;

function init() {
    showQuiz();
    showQuestion();
    showAnswers();
    showProgress();
}

function showQuiz() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('quizContainer').classList.remove('d-none');
}

function showQuestion() {
    let question = questions[currentQuestion]['question'];
    let questionField = document.getElementById('questionField');
    questionField.innerHTML = question;
}

function showAnswers() {
    let answerField1 = document.getElementById('answerField_1');
    let answerField2 = document.getElementById('answerField_2');
    let answerField3 = document.getElementById('answerField_3');
    let answerField4 = document.getElementById('answerField_4');

    let answer1 = questions[currentQuestion]['answer_1'];
    let answer2 = questions[currentQuestion]['answer_2'];
    let answer3 = questions[currentQuestion]['answer_3'];
    let answer4 = questions[currentQuestion]['answer_4'];

    answerField1.innerHTML = answer1;
    answerField2.innerHTML = answer2;
    answerField3.innerHTML = answer3;
    answerField4.innerHTML = answer4;
}

function showProgress() {
    let progressField = document.getElementById('questionNumber');
    let totalQuestionsField = document.getElementById('questionTotal');

    progressField.innerHTML = currentQuestion + 1;
    totalQuestionsField.innerHTML = questions.length;
}

function showNextQuestion() {
    currentQuestion++;
    if (currentQuestion == questions.length) {
        showEndScreen();
        updateProgressBar();
    } else {
        resetAnswers();
        showQuestion();
        showAnswers();
        showProgress();
        disableNextbtn();
        updateProgressBar();
    }


}

function answer(selectedAnswer) {

    let rightAnswer = questions[currentQuestion]['rightAnswer'];
    if (selectedAnswer == rightAnswer) {
        success(selectedAnswer);
        rightAnswerCount++;
    } else {
        fail(selectedAnswer, rightAnswer);
    }

    enableNextButtoon();
}

function success(selectedAnswer) {
    document.getElementById(`answerField_${selectedAnswer}`).classList.add('bg-success');
}

function fail(selectedAnswer, rightAnswer) {
    document.getElementById(`answerField_${selectedAnswer}`).classList.add('bg-danger');
    document.getElementById(`answerField_${rightAnswer}`).classList.add('bg-success');
}

function enableNextButtoon() {
    document.getElementById('nextBtn').disabled = false;
}

function resetAnswers() {
    document.getElementById('answerField_1').classList.remove('bg-danger');
    document.getElementById('answerField_1').classList.remove('bg-success');
    document.getElementById('answerField_2').classList.remove('bg-danger');
    document.getElementById('answerField_2').classList.remove('bg-success');
    document.getElementById('answerField_3').classList.remove('bg-danger');
    document.getElementById('answerField_3').classList.remove('bg-success');
    document.getElementById('answerField_4').classList.remove('bg-danger');
    document.getElementById('answerField_4').classList.remove('bg-success');
}

function disableNextbtn() {
    document.getElementById('nextBtn').disabled = true;
}

function showEndScreen() {
    document.getElementById('quizContainer').classList.add('d-none');
    document.getElementById('endScreen').classList.remove('d-none');
    showResult();
}

function showResult() {
    document.getElementById('questionAmount').innerHTML = questions.length;
    document.getElementById('rightAnswers').innerHTML = rightAnswerCount;
}


function replay() {
    currentQuestion = 0;
    rightAnswerCount = 0;
    closeEndScreenShowQuiz()
    showQuestion();
    showAnswers();
    resetAnswers();
    showProgress();
    updateProgressBar();
}

function closeEndScreenShowQuiz() {
    document.getElementById('endScreen').classList.add('d-none');
    document.getElementById('quizContainer').classList.remove('d-none');
}

function updateProgressBar() {
    let progress = determineProgress();
    let progressBar = document.getElementById('progressBar');
    progressBar.style =`width:${progress}`;
    progressBar.innerHTML = progress;
}

function determineProgress(){

  let progress = (currentQuestion / questions.length)*100;
  return progress = Math.round(progress)+'%';
}
