const qustionDataBase = [
  {
    question: "Which driver set the fastest lap at the 2024 Monaco Grand Prix but finished outside the top 10?",
    option1: "Lewis Hamilton",
    option2: "Max Verstappen",
    option3: "Zhou Guanyu",
    option4: "Yuki Tsunoda",
    ans: "answer1"
  },
  {
    question: "Which team achieved its first 1–2 finish since 2021 at the 2024 Hungarian Grand Prix?",
    option1: "Mercedes",
    option2: "Red Bull",
    option3: "McLaren",
    option4: "Ferrari",
    ans: "answer3"
  },
  {
    question: "Which driver recorded their first F1 fastest lap at the 2024 Canadian Grand Prix?",
    option1: "Lando Norris",
    option2: "Max Verstappen",
    option3: "Charles Leclerc",
    option4: "Kevin Magnussen",
    ans: "answer4"
  },
  {
    question: "Who officially took over as Ferrari’s team principal in 2025?",
    option1: "Mattia Binotto",
    option2: "Fred Vasseur",
    option3: "Toto Wolff",
    option4: "Andrea Stella",
    ans: "answer2"
  },
  {
    question: "Which circuit rejoined the F1 calendar in 2025 after a previous drop off?",
    option1: "German Grand Prix (Hockenheim)",
    option2: "South African Grand Prix",
    option3: "Chinese Grand Prix",
    option4: "Turkish Grand Prix",
    ans: "answer3"
  },
  {
    question: "Which rookie secured their first podium at the 2024 Belgian Grand Prix?",
    option1: "Oscar Piastri",
    option2: "Liam Lawson",
    option3: "Logan Sargeant",
    option4: "Theo Pourchaire",
    ans: "answer2"
  },
  {
    question: "During the 2024 season, which driver made his 200th Formula 1 podium?",
    option1: "Lewis Hamilton",
    option2: "Fernando Alonso",
    option3: "Sebastian Vettel",
    option4: "Kimi Räikkönen",
    ans: "answer1"
  },
  {
    question: "Which team used the 'zero‑pod' concept before abandoning it during 2022–23 development?",
    option1: "Mercedes",
    option2: "Red Bull",
    option3: "Ferrari",
    option4: "Aston Martin",
    ans: "answer1"
  },
  {
    question: "At the 2025 Singapore Grand Prix, which reserve driver replaced Logan Sargeant at Williams?",
    option1: "Doriane Pin",
    option2: "Franco Colapinto",
    option3: "Oliver Bearman",
    option4: "Vasiliy Aleshin",
    ans: "answer2"
  },
  {
    question: "How many sprint races were held in the 2024 F1 season?",
    option1: "4",
    option2: "5",
    option3: "6",
    option4: "8",
    ans: "answer3"
  }
]

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
    if (score >= 6) {
      resultMessage += `<h4>You are a true F1 fan!</h4>`;
    }
    if (score < 6 && score>=3) {
      resultMessage += `<h4>You're not a true fan, but you're almost there!</h4>`;
    }
    if (score < 3) {
      resultMessage += `<h4>Go Watch more F1!! </h4>`; }
    resultMessage += `<button class='btn' onclick='location.reload()'>Play Again</button>`;
    scoreArea.innerHTML = resultMessage;
  }
});