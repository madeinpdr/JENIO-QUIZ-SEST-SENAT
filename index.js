const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}


function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = " PARABÉNS! VOCÊ FOI MUITO BEM! :)"
      break
    case (performance >= 70):
      message = " VOCÊ CONHECE BEM MAS PODE MELHORAR!:/"
      break
    case (performance >= 50):
      message = ""
      break
    default:
      message = "VOCÊ FOI MAL! VAMOS ESTUDAR? :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

const questions = [
  {
    question: "Qual software da Microsoft é amplamente utilizado para criar apresentações de slides, com recursos como transições, animações e design de slides??",
    answers: [
      { text: " a) Microsoft Excel", correct: false },
      { text: " b) Microsoft Word", correct: false },
      { text: " c) Microsoft PowerPoint", correct: true },
      { text: " d) Microsoft Access", correct: false }
    ]
  },
  {
    question: "O que você usaria para criar um documento de texto no Microsoft Office?    ",
    answers: [
        { text: "a) Microsoft PowerPoint", correct: false },
        { text: "b) Microsoft Excel", correct: false },
        { text: "c) Microsoft Word", correct: true },
        { text: "d) Microsoft Outlook", correct: false }
    ]
  },
  {
    question: 'No Microsoft Excel, como é chamada a função que automaticamente soma um intervalo de células? ',
    answers: [
        { text: "a) SOMAR", correct: true },
        { text: "b) CONCATENAR", correct: false },
        { text: "c) MÉDIA", correct: false },
        { text: "d) PROCV", correct: false }
    ]
  },
  {
    question: 'No Microsoft Word, ao pressionar a tecla Enter, você cria automaticamente uma quebra de linha, mantendo o texto no mesmo parágrafo.',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Qual recurso do Microsoft Excel é usado para procurar um valor específico em uma planilha??',
    answers: [
        { text: "a) PROCV ", correct: true },
        { text: "b) SOMAR", correct: false },
        { text: "c) MÉDIA", correct: false },
        { text: "d) FILTRAR", correct: false }
    ]
  },
  {
    question: 'Qual opção você escolheria para ajustar as margens de documento no Microsoft Word?',
    answers: [
        { text: "A) guia design", correct: false },
        { text: "B) guia início", correct: false },
        { text: "C) guia layout", correct: true },
        { text: "D) guia revisão", correct: false }
    ]
  },
  {
    question: 'Qual atalho de teclado é usado para copiar um texto no Word?',
    answers: [
        { text: "A) Ctrl + C", correct: true },
        { text: "B) Ctrl + X ", correct: false },
        { text: "C) Ctrl + V", correct: false },
        { text: "D) Ctrl + Z", correct: false }
    ]
  },
  {
    question: 'No Microsoft Excel, qual função é usada para arredondar um número para o número inteiro mais próximo?',
    answers: [
        { text: "a) ARRED", correct: true },
        { text: "b) TRUNCAR", correct: false },
        { text: "c) ARREDONDAR.PARA.CIMA", correct: false },
        { text: "d) ARREDONDAR.PARA.BAIXO", correct: false }
    ]
  },
  {
    question: 'No Microsoft PowerPoint, qual recurso permite que você adicione um efeito sonoro a um slide específico durante uma apresentação?',
    answers: [
        { text: "a) Música de Fundo", correct: false },
        { text: "b) Efeito de Áudio", correct: true },
        { text: "c) Transição Sonora", correct: false },
        { text: "d) Animação de Som", correct: false }
    ]
  },
  {
    question: 'No Microsoft Excel, qual função é usada para encontrar a mediana de um conjunto de números?',
    answers: [
        { text: "a) MED", correct: false },
        { text: "b) MÉDIA", correct: false },
        { text: "c) MEDIANA", correct: true },
        { text: "d) CENTRO", correct: false }
    ]
  },
]