const drivers_data = [
  // McLaren
  {
    name: "Oscar Piastri",
    number: 81,
    team: "McLaren",
    country: "Australia",
    flag: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/mclaren/oscpia01/2025mclarenoscpia01right.webp",
    link: "https://www.formula1.com/en/drivers/oscar-piastri",
    color: "rgb(255, 128, 0)"
  },
  {
    name: "Lando Norris",
    number: 4,
    team: "McLaren",
    country: "United Kingdom",
    flag: "https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/mclaren/lannor01/2025mclarenlannor01right.webp",
    link: "https://www.formula1.com/en/drivers/lando-norris",
    color: "rgb(255, 128, 0)"
  },
  // Mercedes
  {
    name: "George Russell",
    number: 63,
    team: "Mercedes",
    country: "United Kingdom",
    flag: "https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/mercedes/georus01/2025mercedesgeorus01right.webp",
    link: "https://www.formula1.com/en/drivers/george-russell",
    color: "teal"
  },
  {
    name: "Kimi Antonelli",
    number: 12,
    team: "Mercedes",
    country: "Italy",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/mercedes/andant01/2025mercedesandant01right.webp",
    link: "https://www.formula1.com/en/drivers/kimi-antonelli",
    color: "teal"
  },
  // Ferrari
  {
    name: "Charles Leclerc",
    number: 16,
    team: "Ferrari",
    country: "Monaco",
    flag: "https://cdn.britannica.com/50/2750-050-688E6E49/Flag-Monaco.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/ferrari/chalec01/2025ferrarichalec01right.webp",
    link: "https://www.formula1.com/en/drivers/charles-leclerc",
    color: "rgb(220,0,0)"
  },
  {
    name: "Lewis Hamilton",
    number: 44,
    team: "Ferrari",
    country: "United Kingdom",
    flag: "https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/ferrari/lewham01/2025ferrarilewham01right.webp",
    link: "https://www.formula1.com/en/drivers/lewis-hamilton",
    color: "rgb(220,0,0)"
  },
  // Red Bull
  {
    name: "Max Verstappen",
    number: 1,
    team: "Red Bull Racing",
    country: "Netherlands",
    flag: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/redbullracing/maxver01/2025redbullracingmaxver01right.webp",
    link: "https://www.formula1.com/en/drivers/max-verstappen",
    color: "rgb(6, 0, 239)"
  },
  {
    name: "Yuki Tsunoda",
    number: 22,
    team: "Red Bull Racing",
    country: "Japan",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/redbullracing/yuktsu01/2025redbullracingyuktsu01right.webp",
    link: "https://www.formula1.com/en/drivers/yuki-tsunoda",
    color: "rgb(6, 0, 239)"
  },
  // Williams
  {
    name: "Alexander Albon",
    number: 23,
    team: "Williams",
    country: "Thailand",
    flag: "https://cdn.britannica.com/38/4038-050-BDDBA6AB/Flag-Thailand.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/williams/alealb01/2025williamsalealb01right.webp",
    link: "https://www.formula1.com/en/drivers/alexander-albon",
    color: "rgb(0, 0, 136)"
  },
  {
    name: "Carlos Sainz",
    number: 55,
    team: "Williams",
    country: "Spain",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/williams/carsai01/2025williamscarsai01right.webp",
    link: "https://www.formula1.com/en/drivers/carlos-sainz",
    color: "rgb(0, 0, 136)"
  },
  // Haas
  {
    name: "Esteban Ocon",
    number: 31,
    team: "Haas",
    country: "France",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/haas/estoco01/2025haasestoco01right.webp",
    link: "https://www.formula1.com/en/drivers/esteban-ocon",
    color: "rgb(94, 94, 94)"
  },
  {
    name: "Oliver Bearman",
    number: 87,
    team: "Haas",
    country: "United Kingdom",
    flag: "https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/haas/olibea01/2025haasolibea01right.webp",
    link: "https://www.formula1.com/en/drivers/oliver-bearman",
    color: "rgb(94, 94, 94)"
  },
  // Racing Bulls
  {
    name: "Liam Lawson",
    number: 30,
    team: "Racing Bulls",
    country: "New Zealand",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/1920px-Flag_of_New_Zealand.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/racingbulls/lialaw01/2025racingbullslialaw01right.webp",
    link: "https://www.formula1.com/en/drivers/liam-lawson",
    color: "rgb(23, 77, 220)"
  },
  {
    name: "Isack Hadjar",
    number: 6,
    team: "Racing Bulls",
    country: "France",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/racingbulls/isahad01/2025racingbullsisahad01right.webp",
    link: "https://www.formula1.com/en/drivers/isack-hadjar",
    color: "rgb(23, 77, 220)"
  },
  // Aston Martin
  {
    name: "Lance Stroll",
    number: 18,
    team: "Aston Martin",
    country: "Canada",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1920px-Flag_of_Canada_%28Pantone%29.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/astonmartin/lanstr01/2025astonmartinlanstr01right.webp",
    link: "https://www.formula1.com/en/drivers/lance-stroll",
    color: "rgb(0, 36, 32)"
  },
  {
    name: "Fernando Alonso",
    number: 14,
    team: "Aston Martin",
    country: "Spain",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/astonmartin/feralo01/2025astonmartinferalo01right.webp",
    link: "https://www.formula1.com/en/drivers/fernando-alonso",
    color: "rgb(0, 36, 32)"
  },
  // Kick Sauber
  {
    name: "Nico Hulkenberg",
    number: 27,
    team: "Kick Sauber",
    country: "Germany",
    flag: "https://cdn.britannica.com/97/897-050-0BFECDA5/Flag-Germany.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/kicksauber/nichul01/2025kicksaubernichul01right.webp",
    link: "https://www.formula1.com/en/drivers/nico-hulkenberg",
    color: "green"
  },
  {
    name: "Gabriel Bortoleto",
    number: 5,
    team: "Kick Sauber",
    country: "Brazil",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/kicksauber/gabbor01/2025kicksaubergabbor01right.webp",
    link: "https://www.formula1.com/en/drivers/gabriel-bortoleto",
    color: "green"
  },
  // Alpine
  {
    name: "Pierre Gasly",
    number: 10,
    team: "Alpine",
    country: "France",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/alpine/piegas01/2025alpinepiegas01right.webp",
    link: "https://www.formula1.com/en/drivers/pierre-gasly",
    color: "rgb(0, 92, 169)"
  },
  {
    name: "Franco Colapinto",
    number: 43,
    team: "Alpine",
    country: "Argentina",
    flag: "https://www.countryflags.com/wp-content/uploads/flag-jpg-xl-7-2048x1283.jpg",
    img: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000000/common/f1/2025/alpine/fracol01/2025alpinefracol01right.webp",
    link: "https://www.formula1.com/en/drivers/franco-colapinto",
    color: "rgb(0, 92, 169)"
  }
];

let drivershtml='';

drivers_data.forEach((driver)=>{
    drivershtml+=`
<div class="driver-card" style="background-color: ${driver.color};">
    <div class="card-body">
        <div class="driver-info">
            <h5 class="driver-name">${driver.name} #${driver.number}
                <img src="${driver.flag}" class="img-fluid flag-img" alt="${driver.country} Flag">
            </h5>
            <div class="team-name">${driver.team}</div>
        </div>
        <img src="${driver.img}" class="img-fluid driver-img" alt="${driver.name}">
    </div>
    <a target="_blank" href="${driver.link}">${driver.name}</a>
</div>

`
});

document.querySelector('.driver-row').innerHTML=drivershtml

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");
});