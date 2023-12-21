const jsQuestions = [
    {
      question: "What is the result of 2 + 2?",
      options: [
        { text: "3", correct: false },
        { text: "4", correct: true },
        { text: "5", correct: false },
        { text: "6", correct: false },
      ],
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: [
        { text: "var", correct: false },
        { text: "let", correct: true },
        { text: "const", correct: false },
        { text: "variable", correct: false },
      ],
    },
    {
      question: "What does 'NaN' stand for?",
      options: [
        { text: "Not a Number", correct: true },
        { text: "New and Null", correct: false },
        { text: "Now and Never", correct: false },
        { text: "None and No", correct: false },
      ],
    },
    {
      question: "Is JavaScript a case-sensitive language?",
      options: [
        { text: "Yes", correct: true },
        { text: "No", correct: false },
        { text: "Maybe", correct: false },
        { text: "I don't know", correct: false },
      ],
    },
    {
      question: "Which method is used to add a new element to an array in JavaScript?",
      options: [
        { text: "insertElement", correct: false },
        { text: "addElement", correct: false },
        { text: "push", correct: false },
        { text: "pushElement", correct: true },
      ],
    },
    {
      question: "What is the purpose of the 'typeof' operator in JavaScript?",
      options: [
        { text: "Check the type of a variable", correct: true },
        { text: "Create a new variable", correct: false },
        { text: "Change the type of a variable", correct: false },
        { text: "Remove a variable", correct: false },
      ],
    },
    {
      question: "Are functions in JavaScript first-class citizens?",
      options: [
        { text: "Yes", correct: true },
        { text: "No", correct: false },
        { text: "Sometimes", correct: false },
        { text: "I'm not sure", correct: false },
      ],
    },
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: [
        { text: "//", correct: true },
        { text: "/*", correct: false },
        { text: "--", correct: false },
        { text: "#", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      options: [
        { text: "Refer to the current function", correct: false },
        { text: "Refer to the global object", correct: false },
        { text: "Refer to the calling object", correct: true },
        { text: "Refer to a specific variable", correct: false },
      ],
    },
    {
      question: "Does JavaScript support multi-threading?",
      options: [
        { text: "Yes", correct: false },
        { text: "No", correct: false },
        { text: "It depends", correct: false },
        { text: "Yes, using Web Workers", correct: true },
      ],
    },
  ];
  

const questions = document.getElementById('questions');
const options = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const msg = document.getElementById('msg');

let currentIndex = 0;
let score = 0;

const buttons = []


function startQuiz() {
    score = 0;
    currentIndex = 0;
    options.style.display = 'block'
    showQuiz()
  }
  
  function showQuiz() {
  nextBtn.style.display = 'none'
    let currentQuestion = jsQuestions[currentIndex]
    let qNo = currentIndex + 1;
    questions.innerHTML = `${qNo}. ${currentQuestion.question}`
    // creating the currentQuestion button to display options on the page 
    currentQuestion.options.forEach((option, index) => {
        let button = document.createElement('button');
        button.classList.add('btn')
        button.innerHTML = currentQuestion.options[index].text;
        options.appendChild(button);
        // pushing all the button we created (4) inside the empty array buttons 
        buttons.push(button)

        // setting up the custom data attribute to the buttons by checking its true or false based on condition
        button.dataset.correct = currentQuestion.options[index].correct
        button.addEventListener('click', () => {
            nextBtn.style.display = 'block'
            CheckAns(button, option.correct)
        })
    })
}

// function to check the correct ans 

function CheckAns(button, isCorrect) {
    if(isCorrect) {
        button.classList.add('correct')
        score++;
    } else {
        button.classList.add('wrong')
    }
    // as we set custom data attribute now here we access and select the true or false 
    Array.from(options.children).forEach(btn => {
      if (btn.dataset.correct === 'true') {
        btn.classList.add('correct')
      }
      btn.style.cursor = 'no-drop'
      btn.disabled = true;
    })

}

// function to reset the the quiz for the nextBtn 


function resetState() {
  options.innerHTML = '';
  msg.innerHTML = ''

  buttons.forEach(button => {
    button.classList.remove('correct', 'wrong');
    button.style.cursor = 'pointer';
    button.disabled = false;
  })
}

// adding the next button feature 

nextBtn.addEventListener('click', e => {
    currentIndex++

    if (currentIndex < jsQuestions.length) {
      resetState()
      showQuiz()
      // startQuiz()
    } else {
      options.style.display = 'none'
      questions.innerHTML = `You got ${score} points out of ${jsQuestions.length}`
      nextBtn.style.display = 'none'
      startBtn.style.display = 'block'

      if (score === 10) {
        msg.innerHTML = `Exelent! 🥳`
      } else if (score >= 7 && score < 10) {
        msg.innerHTML = `Great! 😍`
      } else if (score >= 5 && score < 7) {
        msg.innerHTML = `Nice try! 👌`
      } else {
        msg.innerHTML = `Better luck next time! 👍`
      }
    }
})

// adding the startBtn feature and calling the resetState in it 

startBtn.addEventListener('click', e => {
  resetState()
  startQuiz()
  startBtn.style.display = 'none'
})


// calling the start quiz function 
startQuiz();