const ship = document.querySelector(".ship");
const bullet = document.querySelector(".bullet");

let player = {
  x: 0,
  y: 0,
  w: 30,
  h: 60
};

let projectile = {
  x: 0,
  y: 0,
  w: 10,
  h: 10
};

// let enemy = {
//   name: "enemy" + getRandom(999999999),
//   x: getRandom(150),
//   y: -50,
//   w: 40,
//   h: 40
// };

let enemiesArray = [];

window.onkeydown = function (e) {
  if (e.code === "ArrowLeft") {
    player.x = player.x - 15;
  } else if (e.code === "ArrowUp") {
    player.y = player.y - 15;
  } else if (e.code === "ArrowRight") {
    player.x = player.x + 15;
  } else if (e.code === "ArrowDown") {
    player.y = player.y + 15;
  } else if (e.code === "Space") {
    projectile.y = player.y - 10;
    projectile.x = player.x;
  }
};

function movePlayer() {
  if (keyState["ArrowLeft"]) {
    player.x = player.x - 15;
  }
  if (keyState["ArrowUp"]) {
    player.y = player.y - 15;
  }
  if (keyState["ArrowRight"]) {
    player.x = player.x + 15;
  }
  if (keyState["ArrowDown"]) {
    player.y = player.y + 15;
  }
  if (keyState["Space"]) {
    projectile.y = player.y - 10;
    projectile.x = player.x;
  }
}

const keyState = {};

window.onkeydown = (e) => {
  keyState[e.code] = true;
};
window.onkeyup = (e) => {
  keyState[e.code] = false;
};

function gameFrame(character) {
  if (character.x < -480) {
    character.x = -480;
  }
  if (character.y < -860) {
    character.y = -860;
  }
  if (character.x > 490) {
    character.x = 490;
  }
  if (character.y > 0) {
    character.y = 0;
  }
}


function getRandom(maxSize) {
  return parseInt(Math.random() * maxSize);
}



function enemies() {

  let enemy = {
    name: "enemy" + getRandom(999999999),
    x: getRandom(600),
    y: -50,
    w: 40,
    h: 40
  };

  if (getRandom(100) == 0) {
    var element = document.createElement("div");
    element.id = enemy.name;
    element.className = "enemy";
    document
      .querySelector("body")
      .insertBefore(element, document.querySelector("script"));

    enemiesArray.push(enemy);
    console.log(enemiesArray);

    let enemiesDiv = document.getElementsByClassName("enemy");
    console.log(enemiesDiv);


  }
}

// function setEnemies(square) {
//   var e = document.getElementById(square.name);
//   e.style.left = square.x + "px";
//   e.style.top = square.y + "px";
// }

function moveEnemies() {
  for (var i = 0; i < enemiesArray.length; i++) {
    enemiesArray[i].y += 2;
    enemiesArray[i].x += getRandom(9) - 4;
  }
}

function shoot() {
  projectile.y -= 15;
}

function intersects(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.h;
}

function checkCollisions() {
  for (var i = 0; i < enemiesArray.length; i++) {
    if (intersects(projectile, enemiesArray[i])) {
      var element = document.getElementById(enemiesArray[i].name);
      element.style.visibility = "hidden";
      element.parentNode.removeChild(element);
      enemiesArray.splice(i, 1);
      i--;
    } else if (intersects(ship, enemiesArray[i])) {
      var elementShip = document.getElementsByClassName("ship");
      elementShip.style.visibility = "hidden";
    } else if (enemiesArray[i].y >= 910) {
      var elementE = document.getElementById(enemiesArray[i].name);
      elementE.style.visibility = "hidden";
      elementE.parentNode.removeChild(elementE);
      enemiesArray.splice(i, 1);
      i--;
    }
  }
}

function gameLoop() {
  movePlayer();

  ship.style.transform =
    `translateX(${player.x}px)` + `translateY(${player.y}px)`;

  bullet.style.transform =
    `translateX(${projectile.x}px)` + `translateY(${projectile.y}px)`;

  let enemiesDiv = document.getElementsByClassName("enemy");
  // console.log("enemies div", enemiesDiv);
  enemiesArray.forEach((enemy, i) => {
    enemiesDiv[i].style.transform =
      `translateX(${enemiesArray[i].x}px)` + `translateY(${enemiesArray[i].y}px)`;
  });

  checkCollisions();
  gameFrame(player);
  // enemiesArray.forEach((enemy)=> gameFrame(enemy) );
  shoot();
  // setEnemies(enemiesArray[i]);
  enemies();
  moveEnemies();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);