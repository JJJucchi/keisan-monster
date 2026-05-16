const monsters = [
  {id:1,name:"メタモン",image:"images/metamon.png",rare:"normal"},
  {id:2,name:"レックウザ",image:"images/rekkuuza.png",rare:"epic"},
  {id:3,name:"カイオーガ",image:"images/kaioga.png",rare:"epic"},
  {id:4,name:"ルカリオ",image:"images/rukario.png",rare:"rare"},
  {id:5,name:"ミュウ",image:"images/myuu.png",rare:"rare"},
  {id:6,name:"チルタリス",image:"images/tirutarisu.png",rare:"normal"},
  {id:7,name:"ゲンガー",image:"images/genga.png",rare:"normal"},
  {id:8,name:"ピカチュウ",image:"images/pikachuu.png",rare:"normal"},
  {id:9,name:"キャプテンピカチュウ",image:"images/capttainpikachuu.png",rare:"normal"},
  {id:10,name:"メガカイリュー",image:"images/megakairyu.png",rare:"epic"},
  {id:11,name:"色違いのメガメタグロス",image:"images/megametagurosu.png",rare:"epic"},
  {id:12,name:"メガガブリアス",image:"images/megagaburiasu.png",rare:"epic"},
  {id:13,name:"ニャオハ",image:"images/nyaoha.png",rare:"normal"},
  {id:14,name:"ケルディオ",image:"images/kerudelio.png",rare:"normal"},
  {id:15,name:"イーブイ",image:"images/i-bui.png",rare:"normal"},
  {id:16,name:"ニンフィア",image:"images/ninfia.png",rare:"rare"},
  {id:17,name:"リーフィア",image:"images/ri-fia.png",rare:"rare"},
  {id:18,name:"サンダース",image:"images/sannda-su.png",rare:"rare"},
  {id:19,name:"ブースター",image:"images/bu-suta.png",rare:"rare"},
  {id:20,name:"ファイヤー",image:"images/faiyaa.png",rare:"rare"},
  {id:21,name:"サンダー",image:"images/sandaa.png",rare:"rare"},
  {id:22,name:"フリーザー",image:"images/huri-za.png",rare:"rare"},
  {id:23,name:"色違いのジガルデ",image:"images/jigarude.png",rare:"rare"},
  {id:24,name:"色違いのジガルデ",image:"images/jigarude2.png",rare:"legend"},
  {id:25,name:"ダークライ",image:"images/da-kurai.png",rare:"epic"},

  {id:26,name:"すずなのピカチュウ",image:"images/yowaipikachuu.png",rare:"normal"},
  {id:27,name:"すずなのフワテテとメタモン",image:"images/huwatete.png",rare:"normal"},
  {id:28,name:"すずなのプリン",image:"images/suzunanopurin.png",rare:"normal"},
  {id:29,name:"ガラルのファイヤー",image:"images/faiya2.png",rare:"epic"},
  {id:30,name:"ギャラドス",image:"images/gyaradosu.png",rare:"rare"},
  {id:31,name:"カビゴン",image:"images/kabigon.png",rare:"rare"},
  {id:32,name:"色違いのメガハッサム",image:"images/megahassamu2.png",rare:"epic"},
  {id:33,name:"パルキア",image:"images/parukia.png",rare:"legend"},
  {id:34,name:"ミュウツー",image:"images/myuu2.png",rare:"epic"},

  {id:35,name:"レジアイス",image:"images/rejiaisu.png",rare:"rare"},
  {id:36,name:"レジギガス",image:"images/rejigigasu.png",rare:"epic"},
  {id:37,name:"エースバーン",image:"images/e-suba-n.png",rare:"rare"},
  {id:38,name:"ラティオス",image:"images/ratiosu.png",rare:"rare"},
  {id:39,name:"ラティアス",image:"images/ratiasu.png",rare:"rare"},
  {id:40,name:"レジロック",image:"images/rejirokku.png",rare:"rare"},
  {id:41,name:"ヒバニー",image:"images/hibani.png",rare:"normal"},
  {id:42,name:"アチャモ",image:"images/atyamo.png",rare:"normal"},
  {id:43,name:"ルギア",image:"images/rugia.png",rare:"legend"},
  {id:44,name:"ホウオウ",image:"images/houou.png",rare:"legend"},
  {id:45,name:"チコリータ",image:"images/tikori-ta.png",rare:"normal"},
  {id:46,name:"メガニウム",image:"images/meganiumu.png",rare:"rare"},
  {id:47,name:"メガリザードンY",image:"images/riza-donY.png",rare:"epic"},
  {id:48,name:"メガリザードンX",image:"images/riza-donX.png",rare:"epic"},
  {id:49,name:"リザードン",image:"images/riza-don.png",rare:"rare"},
  {id:50,name:"メガフシギバナ",image:"images/megahusigibana.png",rare:"epic"},
  {id:51,name:"ヒトカゲ",image:"images/hitokage.png",rare:"normal"},
  {id:52,name:"ゼニガメ",image:"images/zenigame.png",rare:"normal"},
  {id:53,name:"フシギダネ",image:"images/husigidane.png",rare:"normal"},
  {id:54,name:"メガチルタリス",image:"images/megatirutarisu.png",rare:"epic"}
];
let currentMonster = null;
let currentAnswer = 0;
let currentOperator = "+";
let nextForcedRare = null;

let enemyHP = 100;
let maxHP = 100;

let level = 1;
let score = 0;
let combo = 0;

let monsterBook = [];

let currentQuestionType = "add";
let gameMode = "math";

async function newMonster(){

  let forcedRare = nextForcedRare;

  let availableMonsters =
    monsters.filter(monster=>{

      if(forcedRare){
        return monster.rare === forcedRare;
      }

      if(combo < 10){
        return monster.rare === "normal";
      }

      else if(combo < 20){

        return (
          monster.rare === "normal" ||
          monster.rare === "rare"
        );
      }

      else if(combo < 40){

        return (
          monster.rare === "normal" ||
          monster.rare === "rare" ||
          monster.rare === "epic"
        );
      }

      else{
        return true;
      }
    });

  currentMonster =
    availableMonsters[
      Math.floor(
        Math.random()*availableMonsters.length
      )
    ];

  nextForcedRare = null;

  if(currentMonster.rare === "legend"){
    await showBossWarning();
  }

  document.getElementById("enemyName").textContent =
    currentMonster.name;

  const monsterEl =
    document.getElementById("monster");

  monsterEl.src =
    currentMonster.image;

  monsterEl.classList.remove(
    "rare-monster",
    "epic-monster",
    "legend-monster"
  );

  const rareLabel =
    document.getElementById("rareLabel");

  if(currentMonster.rare === "rare"){

    rareLabel.style.display = "block";
    rareLabel.textContent = "✨レア✨";

    monsterEl.classList.add("rare-monster");
  }

  else if(currentMonster.rare === "epic"){

    rareLabel.style.display = "block";
    rareLabel.textContent = "💎エピック💎";

    monsterEl.classList.add("epic-monster");
  }

  else if(currentMonster.rare === "legend"){

    rareLabel.style.display = "block";
    rareLabel.textContent = "👑レジェンド👑";

    monsterEl.classList.add("legend-monster");
  }

  else{

    rareLabel.style.display = "none";
  }

  if(currentMonster.rare === "legend"){
    maxHP = 400 + level * 50;
  }

  else if(currentMonster.rare === "epic"){
    maxHP = 250 + level * 35;
  }

  else if(currentMonster.rare === "rare"){
    maxHP = 160 + level * 25;
  }

  else{
    maxHP = 80 + level * 20;
  }

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

  if(gameMode === "length"){

    generateLengthQuestion();
    return;
  }

  const types = [
    "add",
    "sub"
  ];

  currentQuestionType =
    types[
      Math.floor(Math.random()*types.length)
    ];

  if(currentQuestionType === "add"){
    generateAddQuestion();
  }

  else{
    generateSubQuestion();
  }
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

    let fake;

    // 数字問題
    if(typeof currentAnswer === "number"){

      fake =
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

    // cm mm問題
    else{

      const cm =
        Math.floor(Math.random()*10);

      const mm =
        Math.floor(Math.random()*10);

      fake =
        `${cm}cm${mm}mm`;

      if(
        fake !== currentAnswer &&
        !answers.includes(fake)
      ){
        answers.push(fake);
      }
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

    if(combo === 10){
      nextForcedRare = "rare";
    }

    else if(combo === 20){
      nextForcedRare = "epic";
    }

    else if(combo === 40){
      nextForcedRare = "legend";
    }

    showAttackEffect();

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

    if(enemyHP <= 0){

      addToBook(currentMonster);

      score++;

      if(score % 3 === 0){
        level++;
      }

      updateInfo();

      setTimeout(async ()=>{

        await newMonster();

        nextQuestion();

      },1000);
    }

    else{

      updateHP();

      setTimeout(nextQuestion,500);
    }
  }

  else{

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

      <div>${monster.name}</div>
      `;
    }

    else{

      card.className =
        "book-card unknown";

      card.innerHTML = `
      <div class="book-emoji">❓</div>
      <div>？？？</div>
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

function showAttackEffect(){

  const effect =
    document.getElementById("attackEffect");

  effect.className =
    "attack-effect";

  if(currentOperator === "+"){

    effect.textContent =
      "✨ まほうこうげき！ ✨";

    effect.classList.add("magic");
  }

  else{

    effect.textContent =
      "⚔️ ざんげきこうげき！ ⚔️";

    effect.classList.add("slash");
  }

  setTimeout(()=>{
    effect.classList.add("attack-show");
  },10);

  setTimeout(()=>{
    effect.className = "attack-effect";
  },700);
}

function showBossWarning(){

  return new Promise(resolve=>{

    const warning =
      document.getElementById("bossWarning");

    warning.classList.add(
      "warning-show"
    );

    setTimeout(()=>{

      warning.classList.remove(
        "warning-show"
      );

      resolve();

    },2500);
  });
}

function generateAddQuestion(){

  currentOperator = "+";

  let a = randomNumber();
  let b = randomNumber();

  currentAnswer = a + b;

  document.getElementById("question")
    .textContent =
    `${a} + ${b} = ?`;

  generateChoices();
}

function generateSubQuestion(){

  currentOperator = "-";

  let a = randomNumber();
  let b = randomNumber();

  if(b > a){

    let temp = a;
    a = b;
    b = temp;
  }

  currentAnswer = a - b;

  document.getElementById("question")
    .textContent =
    `${a} - ${b} = ?`;

  generateChoices();
}

function generateLengthQuestion(){

  const patterns = [];

  // 複合単位 → mm
  {
    const cm =
      Math.floor(Math.random()*9)+1;

    const mm =
      Math.floor(Math.random()*9)+1;

    patterns.push({
      q:`${cm}cm ${mm}mm = ?mm`,
      a:cm*10 + mm
    });
  }

  // mm → cmとmm
  {
    const total =
      Math.floor(Math.random()*90)+10;

    const cm =
      Math.floor(total/10);

    const mm =
      total%10;

    patterns.push({
      q:`${total}mm = ?cm?mm`,
      a:`${cm}cm${mm}mm`
    });
  }

  const p =
    patterns[
      Math.floor(
        Math.random()*patterns.length
      )
    ];

  currentAnswer = p.a;

  document.getElementById("question")
    .textContent = p.q;

  generateChoices();
}

async function startGame(mode){

  gameMode = mode;

  loadBook();

  level = 1;
  score = 0;
  combo = 0;

  updateInfo();

  document.getElementById(
    "modeSelect"
  ).style.display = "none";

  document.getElementById(
    "gameContainer"
  ).style.display = "block";

  await newMonster();

  nextQuestion();
}