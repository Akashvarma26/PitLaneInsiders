const qustionDataBase = [
  {
    question: "Who won the 2021 Formula 1 Drivers' Championship?",
    option1: "Lewis Hamilton",
    option2: "Max Verstappen",
    option3: "Sebastian Vettel",
    option4: "Charles Leclerc",
    ans: "answer2",
  },
  {
    question: "Which team won the 2021 Constructors' Championship?",
    option1: "Mercedes",
    option2: "Red Bull",
    option3: "Ferrari",
    option4: "McLaren",
    ans: "answer1",
  },
  {
    question: "When did Formula 1 introduce the budget cap?",
    option1: "2019",
    option2: "2020",
    option3: "2021",
    option4: "2022",
    ans: "answer3",
  },
  {
    question: "Which race marked the controversial end of the 2021 season?",
    option1: "Brazilian Grand Prix",
    option2: "Italian Grand Prix",
    option3: "Abu Dhabi Grand Prix",
    option4: "Monaco Grand Prix",
    ans: "answer3",
  },
  {
    question: "Who is the team principal of Mercedes as of 2023?",
    option1: "Christian Horner",
    option2: "Toto Wolff",
    option3: "Mattia Binotto",
    option4: "Zak Brown",
    ans: "answer2",
  },
  // {
  //   question: "Which circuit returned to the F1 calendar in 2020 due to the COVID-19 pandemic?",
  //   option1: "Imola",
  //   option2: "Sepang",
  //   option3: "Istanbul",
  //   option4: "Nurburgring",
  //   ans: "answer1",
  // },
  // {
  //   question: "Who replaced Sebastian Vettel at Ferrari in 2021?",
  //   option1: "Carlos Sainz",
  //   option2: "Daniel Ricciardo",
  //   option3: "Sergio Perez",
  //   option4: "Pierre Gasly",
  //   ans: "answer1",
  // },
  // {
  //   question: "What significant technical change was introduced in the 2022 season?",
  //   option1: "Turbocharged engines",
  //   option2: "Ground effect aerodynamics",
  //   option3: "Hybrid power units",
  //   option4: "DRS",
  //   ans: "answer2",
  // },
  // {
  //   question: "Which driver made his debut with McLaren in 2019?",
  //   option1: "Lando Norris",
  //   option2: "George Russell",
  //   option3: "Charles Leclerc",
  //   option4: "Alexander Albon",
  //   ans: "answer1",
  // },
  // {
  //   question: "What is the main purpose of the Drag Reduction System (DRS) in F1?",
  //   option1: "Increase fuel efficiency",
  //   option2: "Enhance downforce",
  //   option3: "Reduce drag for overtaking",
  //   option4: "Improve tire wear",
  //   ans: "answer3",
  // },
];

// getting referrence
const questionContainer = document.querySelector("h2");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const submitButton = document.querySelector("button");
const usersAnswer = document.querySelectorAll(".answer");
const scoreArea = document.querySelector("#ShowScore");

// This function is rendering all the texts

let questionCount = 0;
let score = 0;
const mainFunc = () => {
  const list = qustionDataBase[questionCount];
  questionContainer.innerText = list.question;
  option1.innerText = list.option1;
  option2.innerText = list.option2;
  option3.innerText = list.option3;
  option4.innerText = list.option4;
};

mainFunc();

// this function is for answer checking

const goCheckAnswer = () => {
  let answers;
  usersAnswer.forEach((data) => {
    if (data.checked) {
      answers = data.id;
    }
  });
  return answers;
};

const deselectAll = () => {
  usersAnswer.forEach((data) => {
    data.checked = false;
  });
};

submitButton.addEventListener("click", () => {
  const checkAnswer = goCheckAnswer();
  console.log(checkAnswer);

  if (checkAnswer === qustionDataBase[questionCount].ans) {
    score++;
  }
  questionCount++;
  deselectAll();
  if (questionCount < qustionDataBase.length) {
    mainFunc();
  } else {
    scoreArea.style.display = "block";
    let resultMessage = `<h3>Your score is ${score} / ${qustionDataBase.length}</h3>`;
    if (score > 4) {
      resultMessage += `<h4>You are a true F1 fan!</h4>`;
    }
    if (score < 3) {
      resultMessage += `<h4>Go Watch more F1!! </h4>`; }
    resultMessage += `<button class='btn' onclick='location.reload()'>Play Again</button>`;
    scoreArea.innerHTML = resultMessage;
  }
});
