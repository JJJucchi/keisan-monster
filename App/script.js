const monsters = [
  {id:1,name:"メタモン",image:"images/メタモン.png"},
  {id:2,name:"レックウザ",image:"images/レックウザ.png"},
  {id:3,name:"カイオーガ",image:"images/カイオーガ.png"},
  {id:4,name:"ルカリオ",image:"images/ルカリオ.png"},
  {id:5,name:"ミュウ",image:"images/ミュウ.png"},
  {id:6,name:"チルタリス",image:"images/チルタリス.png"},
  {id:7,name:"ゲンガー",image:"images/ゲンガー.png"},

];

let currentMonster = null;
let currentAnswer = 0;

let enemyHP = 100;
let maxHP = 100;

let level = 1;
let score = 0;
let combo = 0;

let isRare = false;

let monsterBook = [];

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startGame);

function startGame(){

  startBtn.style.display = "none";

  loadBook();

  level = 1;
  score = 0;
  combo = 0;

  updateInfo();

  newMonster();

  nextQuestion();
}

function newMonster(){

  currentMonster =
    monsters[Math.floor(Math.random()*monsters.length)];

  document.getElementById("enemyName").textContent =
    currentMonster.name;

  const monsterEl =
    document.getElementById("monster");

  monsterEl.src =
    currentMonster.image;

  monsterEl.classList.remove("rare");

  isRare = Math.random() < 0.15;

  if(isRare){

    monsterEl.classList.add("rare");

    document.getElementById("rareLabel")
      .style.display = "block";

  }else{

    document.getElementById("rareLabel")
      .style.display = "none";
  }

  maxHP = isRare
    ? 180 + level * 30
    : 80 + level * 20;

  enemyHP = maxHP;

  updateHP();
}

function updateHP(){

  const percent =
    (enemyHP/maxHP)*100;

  document.getElementById("hpBar").style.width =
    percent + "%";
}

function nextQuestion(){

  const a = randomNumber();
  const b = randomNumber();

  currentAnswer = a + b;

  document.getElementById("question").textContent =
    `${a} + ${b} = ?`;

  generateChoices();
}

function randomNumber(){

  const min =
    Math.max(10,10 + level * 2);

  const max =
    Math.min(99,30 + level * 5);

  return Math.floor(
    Math.random()*(max-min+1)
  ) + min;
}

function generateChoices(){

  const answers = [currentAnswer];

  while(answers.length < 4){

    const fake =
      currentAnswer +
      Math.floor(Math.random()*20)-10;

    if(
      fake !== currentAnswer &&
      fake > 0 &&
      !answers.includes(fake)
    ){
      answers.push(fake);
    }
  }

  answers.sort(()=>Math.random()-0.5);

  const buttons =
    document.getElementById("buttons");

  buttons.innerHTML = "";

  answers.forEach(answer=>{

    const btn =
      document.createElement("button");

    btn.className = "answer-btn";

    btn.textContent = answer;

    btn.onclick = ()=>checkAnswer(answer);

    buttons.appendChild(btn);
  });
}

function checkAnswer(answer){

  const msg =
    document.getElementById("message");

  if(answer === currentAnswer){

    combo++;

    let damage =
      25 + combo * 3;

    if(combo >= 5){
      damage += 20;
    }

    enemyHP -= damage;

    msg.textContent =
      `こうげき！ ${damage}ダメージ！`;

    msg.className =
      "message correct";

    if(combo >= 3){

      document.getElementById("combo")
        .textContent =
        `${combo}れんぞくコンボ！`;

    }

    if(combo === 5){

      const monsterEl =
        document.getElementById("monster");

      monsterEl.classList.add("evolution");

      msg.textContent =
        "しんかパワー はつどう！";

      setTimeout(()=>{

        monsterEl.classList.remove(
          "evolution"
        );

      },2500);
    }

    if(enemyHP <= 0){

      addToBook(currentMonster);

      score++;

      if(isRare){

        msg.textContent =
          "✨レアモンスターをたおした！✨";

      }else{

        msg.textContent =
          "モンスターをたおした！";
      }

      if(score % 3 === 0){
        level++;
      }

      updateInfo();

      setTimeout(()=>{

        newMonster();

        nextQuestion();

      },1000);

    }else{

      updateHP();

      setTimeout(nextQuestion,500);
    }

  }else{

    combo = 0;

    document.getElementById("combo")
      .textContent = "";

    msg.textContent =
      "ざんねん！";

    msg.className =
      "message wrong";
  }

  updateInfo();
}

function updateInfo(){

  document.getElementById("level")
    .textContent = level;

  document.getElementById("score")
    .textContent = score;

  updateHP();
}

function addToBook(monster){

  if(!monsterBook.includes(monster.id)){

    monsterBook.push(monster.id);

    saveBook();

    renderBook();
  }
}

function renderBook(){

  const area =
    document.getElementById("monsterBook");

  area.innerHTML = "";

  monsters.forEach(monster=>{

    const card =
      document.createElement("div");

    if(monsterBook.includes(monster.id)){

      card.className = "book-card";

        card.innerHTML = `
        <img
            class="book-image"
            src="${monster.image}"
        >

        <div>
            ${monster.name}
        </div>
        `;

    }else{

      card.className =
        "book-card unknown";

      card.innerHTML = `
        <div class="book-emoji">
          ❓
        </div>

        <div>
          ？？？
        </div>
      `;
    }

    area.appendChild(card);
  });
}

function saveBook(){

  localStorage.setItem(
    "monsterBook",
    JSON.stringify(monsterBook)
  );
}

function loadBook(){

  const data =
    localStorage.getItem("monsterBook");

  if(data){
    monsterBook = JSON.parse(data);
  }

  renderBook();
}