const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submitbtn");
const result = document.querySelector(".result");

const selected_questions = [];
let currentQuizData;

loadQuiz();

function loadQuiz() {
  deselectAnswer();
  currentQuizData = quizData[Math.floor(Math.random() * quizData.length)];

  while (true) {
    if (
      !selected_questions.some((question) => question.id === currentQuizData.id)
    ) {
      selected_questions.push(currentQuizData);
      break;
    } else {
      currentQuizData = quizData[Math.floor(Math.random() * quizData.length)];
    }
  }
  questionEl.innerText = currentQuizData.question;

  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function deselectAnswer() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

let score = 0;

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  selected_questions.forEach((question) => {
    if (question.id === currentQuizData.id) {
      question.studentAnswer = answer;
    }
  });
  if (answer) {
    if (answer === currentQuizData.correct) {
      score++;
    }
  }

  if (selected_questions.length < 10) {
    loadQuiz();
  } else {
    const allAnswers = document.createElement("UL");
    selected_questions.forEach((question) => {
      const quest = document.createElement("LI");
      quest.innerHTML = `
        <h3> <span class="test-4"> السؤال :  ${question.question}</h2></span>
        <h4><span class="test-4">a- ${question.a}</h3></span>
        <h4><span class="test-4">b- ${question.b}</h3></span>
        <h4><span class="test-4">c- ${question.c}</h3></span>
        <h4><span class="test-4">d- ${question.d}</h3></span>
        
        <h3><span class="test">إجابة الطالب : ${question.studentAnswer}</h3></span>
        <h3> <span class="test-2">الإجابة الصحيحة : ${question.correct}  </h3></span>
        <hr/>
      `;
      allAnswers.appendChild(quest);
    });
    result.appendChild(allAnswers);
    quiz.innerHTML = `
          <h2>You answered correctly at ${score}/${selected_questions.length} questions.</h2>
      `;
    quiz_reload.innerHTML = `
      <button onclick="location.reload()">Reload</button>
  `;
  }
});
