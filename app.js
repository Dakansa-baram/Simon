let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalID;
let strict = false;
let noise = false;
let on = false;
let win;

const startBtn = document.getElementById("button");
const turnIcon = document.getElementById("turn");
const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const strictBtn = document.getElementById("strict");
const powerBtn = document.querySelector("#power-on");

strictBtn.addEventListener("change", (event) => {
	if (strictBtn.checked == true) {
		strict = true;
	} else {
		strict = false;
	}
});

powerBtn.addEventListener("change", (event) => {
	if (powerBtn.checked == true) {
		on = true;
		turnIcon.textContent = "1";
	} else {
		on = false;
		turnIcon.innerHTML = "";
		clearColor();
		clearInterval(intervalID);
	}
});

startBtn.addEventListener("click", (event) => {
	if (on || win) {
		play();
	}
});

function play() {
	win = false;
	order = [];
	playerOrder = [];
	flash = 0;
	intervalID = 0;
	turn = 1;
	turnIcon.textContent = 1;
	good = true;
	for (let i = 0; i < 5; i++) {
		order.push(Math.floor(Math.random() * 4) + 1);
	}
	compTurn = true;
	intervalID = setInterval(gameTurn, 800);
}

function gameTurn() {
	on = false;
	if (flash == turn) {
		clearInterval(intervalID);
		compTurn = false;
		clearColor();
		on = true;
	}
	if (compTurn) {
		clearColor();
		setTimeout(() => {
			if (order[flash] == 1) one();
			if (order[flash] == 2) two();
			if (order[flash] == 3) three();
			if (order[flash] == 4) four();
			flash++;
		}, 200);
	}
}

function one() {
	if(!win) {
	if (noise) {
		let audio = document.getElementById("clip1");
		audio.play();
	}
	noise = true;
	topLeft.style.backgroundColor = "lightgreen";
} }
function two() {
	if(!win){
	if (noise) {
		let audio = document.getElementById("clip2");
		audio.play();
	}
	noise = true;
	topRight.style.backgroundColor = "tomato";
}}
function three() {
	if(!win){
	if (noise) {
		let audio = document.getElementById("clip3");
		audio.play();
	}
	noise = true;
	bottomLeft.style.backgroundColor = "yellow";
}}
function four() {
	if(!win){
	if (noise) {
		let audio = document.getElementById("clip4");
		audio.play();
	}
	noise = true;
	bottomRight.style.backgroundColor = "#50b2d3";
}}
function clearColor() {
	topLeft.style.backgroundColor = "darkgreen";
	topRight.style.backgroundColor = "darkred";
	bottomLeft.style.backgroundColor = "goldenrod";
	bottomRight.style.backgroundColor = "rgb(25, 187, 237)";
}
function flashColor() {
	topLeft.style.backgroundColor = "lightgreen";
	topRight.style.backgroundColor = "tomato";
	bottomLeft.style.backgroundColor = "yellow";
	bottomRight.style.backgroundColor = "#50b2d3";
}
function winColor() {
	topLeft.style.backgroundColor = "#f5c516";
	topRight.style.backgroundColor = "#f5c516";
	bottomLeft.style.backgroundColor = "#f5c516";
	bottomRight.style.backgroundColor = "#f5c516";
}
topLeft.addEventListener("click", (event) => {
	if (on) {
		playerOrder.push(1);
		check();
		one();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 500);
		}
	}
});
topRight.addEventListener("click", (event) => {
	if (on) {
		playerOrder.push(2);
		check();
		two();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 500);
		}
	}
});
bottomLeft.addEventListener("click", (event) => {
	if (on) {
		playerOrder.push(3);
		check();
		three();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 500);
		}
	}
});
bottomRight.addEventListener("click", (event) => {
	if (on) {
		playerOrder.push(4);
		check();
		four();
		if (!win) {
			setTimeout(() => {
				clearColor();
			}, 500);
		}
	}
});
function check() {
	if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
		good = false;
	if (playerOrder.length === 3 && good) {
		winGame();
	}
	if (good == false) {
		flashColor();
		turnIcon.textContent = "NO!";
		setTimeout(() => {
			// turnIcon.textContent = turn;
			clearColor();
			if (strict) {
				play();
			} else {
				compTurn = true;
				flash = 0;
				playerOrder = [];
				good = true;
				intervalID = setInterval(gameTurn, 800);
			}
		},800);
		noise = false;
	}
	if (turn === playerOrder.length && good && !win) {
		turn++;
		compTurn = true;
		flash = 0;
		playerOrder = [];
		turnIcon.innerHTML = turn;
		intervalID = setInterval(gameTurn, 800);
	}
}

function winGame() {
	winColor();
	turnIcon.textContent = "WIN";
	on = false;
	win = true;
    
}
