
var plano2 = document.getElementById('plano2')
var plano3 = document.getElementById('plano3')
var plano1 = document.getElementById('plano1')
var conjuntoEngrena = document.getElementById('conjunto-engrena')
var conjuntoEngrena2 = document.getElementById('conjunto-engrena-2')

window.addEventListener('scroll', function () {
  var rolagemPos = this.window.scrollY
})


//Questões

let currentQuestion = 0;
let correctAnswers = 0;
let totalScore = 0;

let questions = [
  {
    question: "1",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "1",
    answered: false,
    userAnswer: null
  },
  {
    question: "2",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "3",
    answered: false,
    userAnswer: null
  },
  {
    question: "3",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "2",
    answered: false,
    userAnswer: null
  },
  {
    question: "4",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "2",
    answered: false,
    userAnswer: null
  },
  {
    question: "5",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "3",
    answered: false,
    userAnswer: null
  },
  {
    question: "6",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "1",
    answered: false,
    userAnswer: null
  },
  {
    question: "7",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "3",
    answered: false,
    userAnswer: null
  },
  {
    question: "8",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "1",
    answered: false,
    userAnswer: null
  },
  {
    question: "9",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "2",
    answered: false,
    userAnswer: null
  },
  {
    question: "10",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "2",
    answered: false,
    userAnswer: null
  },
  {
    question: "11",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "1",
    answered: false,
    userAnswer: null
  },
  {
    question: "12",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "3",
    answered: false,
    userAnswer: null
  },
  {
    question: "13",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "1",
    answered: false,
    userAnswer: null
  },
  {
    question: "14",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "3",
    answered: false,
    userAnswer: null
  },
  {
    question: "15",
    contabilizado: false,
    opaco: false,
    options: ["1", "2", "3"],
    correctAnswer: "2",
    answered: false,
    userAnswer: null
  }
];

function displayQuestion(index) {
  const currentQuestionData = questions[index];
  const currentQuestionDiv = document.getElementById(`question${index + 1}`);

  currentQuestionDiv.style.display = "block";
  if (currentQuestionData.answered) {
    const selectedOption = Array.from(currentQuestionDiv.querySelector(".options").getElementsByTagName("button"))
      .find(option => option.innerText === currentQuestionData.userAnswer);

    selectedOption.classList.add("correct");
    disableOptions(selectedOption.parentElement);
  }
}

function checkAnswer(button) {
  const selectedAnswer = button.innerText;
  const currentQuestionData = questions[currentQuestion];
  let options = button.parentElement.querySelectorAll('button');
  if (!currentQuestionData.contabilizado){
    options.forEach(option => {
      option.classList.remove('marcado')
      if(!currentQuestionData.opaco){
        option.classList.add('opaco')
      }
    });
    button.classList.add('marcado')
    currentQuestionData.userAnswer = selectedAnswer;
  }
}

function disableOptions(optionsContainer) {
  Array.from(optionsContainer.getElementsByTagName("button")).forEach(option => {
    option.disabled = true;
  });
}

function nextQuestion() {
  const currentQuestionDiv = document.getElementById(`question${currentQuestion + 1}`);
  currentQuestionDiv.style.display = "none";
  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion(currentQuestion);
  } else {
    const boxResultado = document.querySelector(".box-resultado");
    boxResultado.style.display = "flex";
    showResult();
  }
  updateQuestionPosition();
}

function updateQuestionPosition() {
  const questionPosition = document.querySelector('.question-position');
  const totalQuestions = questions.length;

  const filledCircles = '<i class="fas fa-circle"></i>'.repeat(currentQuestion + 1);
  const emptyCircles = '<i class="far fa-circle"></i>'.repeat(totalQuestions - currentQuestion - 1);

  const progressIcons = filledCircles + emptyCircles;

  questionPosition.innerHTML = progressIcons;
}

function showResult() {
  questions.forEach(question => {
    //Faz a totalização 
    if(question.correctAnswer == question.userAnswer && !(question.contabilizado)){
      totalScore++
      question.contabilizado = true
    }
    if(!question.contabilizado){
      let query = '#question' + question.question + ' button';
      let buttons = document.querySelectorAll(query)
      buttons.forEach(button => {
        button.classList.remove('opaco')
        button.classList.remove('marcado')
      });
    }
    else{
      let query = '#question' + question.question + ' button';
      let buttons = document.querySelectorAll(query)
      buttons.forEach(button => {
        if(button.classList.contains('marcado')){
          button.classList.add('correto')
          button.classList.remove('opaco')
        }
        button.classList.remove('marcado')
      });
    }
  });
  const resultContainer = document.getElementById("resultContainer");
  const resultText = document.getElementById("resultText");
  const totalScoreDisplay = document.getElementById("totalScore");
  const confirmButton = document.getElementById("confirmButton");
  const questionPosition = document.querySelector(".question-position");
  questionPosition.style.display = "none"

  resultText.textContent = ``;
  totalScoreDisplay.innerHTML = `Você acertou <span>${totalScore}</span> de 15 questões!` ;
  resultContainer.style.display = "block";

  // Oculta o botão Confirmar/Continuar
  confirmButton.style.display = "none";

  showFeedback();
}

function restartQuiz() {
  currentQuestion = 0;

  questions.forEach((question, index) => {
    let questionDiv = document.getElementById(`question${index + 1}`);
    let optionsContainer = questionDiv.querySelector(".options");
    let buttons = optionsContainer.getElementsByTagName("button");
    
    //Desliga os botões
    if(question.contabilizado){
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener('click', checkAnswer, true);
      }
    }
   

    // Array.from(optionsContainer.getElementsByTagName("button")).forEach(option => {
    //   option.disabled = false;
    //   option.classList.remove("correct");
    // });

    // if (question.answered && question.userAnswer !== question.correctAnswer) {
    //   question.answered = false;
    //   question.userAnswer = null;
    // }
    // questionDiv.style.display = "none";
  });

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.style.display = "none";

  const confirmButton = document.getElementById("confirmButton");
  confirmButton.style.display = "block";  // Exibe o botão Confirmar/Continuar

  const boxResultado = document.querySelector(".box-resultado");
  boxResultado.style.display = "none";

  const questionPosition = document.querySelector(".question-position");
  questionPosition.style.display = "block"

  displayQuestion(currentQuestion);

  updateQuestionPosition()
}

function showFeedback() {
  const feedbackContainer = document.querySelector(".feedback-container");
  const feedbackText = document.querySelector(".feedback-text");

  if (totalScore <= 5) {
      feedbackText.textContent = "Não foi dessa vez, mas não se preocupe! Estude um pouco mais as contribuições de cada teórico e tente novamente!";
  } else if (totalScore <= 10) {
      feedbackText.textContent = "Quase lá! Faltou pouco para gabaritar. Que tal rever as contribuições de cada teórico e tentar novamente?";
  } else if (totalScore <= 14) {
      feedbackText.textContent = "Muito bem! Você está quase no topo! Seus conhecimentos sobre os teóricos estão acima da média.";
  } else if (totalScore === 15) {
      feedbackText.textContent = "Parabéns! Você acertou todas! Seus conhecimentos sobre os teóricos estão excelentes.";
  }

  feedbackContainer.style.display = "block";
}

// Exemplo de chamada da função:
updateQuestionPosition();

displayQuestion(currentQuestion);







// Imprimir o resumo
const gerarResumo = document.getElementById('gerar-resumo');

gerarResumo.addEventListener('click', function () {
  printPDF();
});

function printPDF() {
  const pdfUrl = './Resumo_teoricos_da_sociologia.pdf'; 
  window.open(pdfUrl, '_blank');
}


