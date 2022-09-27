const { ipcRenderer } = require("electron");

const resetButton = document.querySelector("#resetBtn");
const startButton = document.querySelector("#startBtn");
const toggleButton = document.querySelector("#cheakbox");

window.onload = () => {
	document.getElementById("table").classList.add("transition");
	document.getElementsByClassName("top")[0].classList.add("transition");
	document.getElementsByClassName("bottom")[0].classList.add("transition");
};

ipcRenderer.on("print", (e, ...args) => {
	pdfDownload(getTableData());
});

let jujakMode = false;
ipcRenderer.on("jujakMode", (e, ...args) => {
	jujakMode = args[0];
	ifJujakMode(jujakMode);
	console.log("jujakMode", jujakMode);
});

// JSON.parse = string to boolean
let shuffle = JSON.parse(localStorage.getItem("shuffle")) || false;

window.addEventListener("DOMContentLoaded", function () {
	// 로컬 DB에 저장된 토글버튼 값 복원
	toggleButton.checked = shuffle;

	resetButton.disabled = true; // 초기화버튼 비활성화
	// 키 입력 이벤트 리스너
	window.addEventListener("keydown", function (e) {
		if (e.keyCode == 13 || e.keyCode == 32) startButton.click(); // enter / space
		if (e.keyCode == 8 || e.keyCode == 46) resetButton.click(); // backspace / del
	});
});

// prettier-ignore
const readFile = (a,c) => {var b=new XMLHttpRequest();b.overrideMimeType("application/json");b.open("GET",a,true);b.onreadystatechange=function(){if(b.readyState===4&&b.status=="200"){c(b.responseText)}};b.send(null)}

const divText = (i, j, num, data) => {
	let x = document.getElementsByName(`${i}-${j}`);
	x[0].innerText = data[num]["name"];
	x[1].innerText = data[num]["number"] + "번";
};

// =======================================================

function gettData() {
	let tableData = [];
	let table = document.querySelectorAll("#column");
	table.forEach(column => {
		let row = column.querySelectorAll("#item");
		row.forEach(div => {
			let name = div.querySelectorAll("#name");
			name.forEach(i => {
				tableData.push({ index: i.getAttribute("name"), name: i.innerText });
			});
		});
	});
	return tableData;
}

// ==================================================================

const getTableData = () => {
	const tableData = [];
	const table = document.querySelectorAll("#column");
	table.forEach(column => {
		const row = column.querySelectorAll("#item");
		row.forEach(div => {
			tableData.push(div.innerText);
		});
	});
	return tableData;
};

toggleButton.addEventListener("click", function () {
	shuffle = !shuffle;
	localStorage.setItem("shuffle", shuffle); // 로컬 DB에 토글버튼 값 저장
});

startButton.addEventListener("click", function () {
	if (shuffle) change("all");
	else change("notall");

	// 초기화버튼 활성화
	resetButton.disabled = false;
});

resetButton.addEventListener("click", function () {
	d = 0;
	for (var i = 1; i < 5; i++) {
		// 1 2 3 분단
		if (i == 1 || i == 2 || i == 3) {
			for (var j = 1; j < 6; j++) {
				var x = document.getElementsByName(`${i}-${j}`);
				x[0].innerText = "???";
				x[1].innerText = "?";
				d++;
			}
		}
		// 나머지
		else {
			for (var j = 1; j < 5; j++) {
				var x = document.getElementsByName(`${i}-${j}`);
				x[0].innerText = "???";
				x[1].innerText = "?";
				d++;
			}
		}
	}
	resetButton.disabled = true; // 초기화버튼 비활성화
});

// 배열 안 중복된 값 확인
const isDuplicate = arr => {
	const isDup = arr.some(function (x) {
		return arr.indexOf(x) !== arr.lastIndexOf(x);
	});
	return isDup;
};

const change = range => {
	if (range == "all") {
		readFile("dist/data.json", data => {
			var input = JSON.parse(data);
			var output = [];

			while (input.length > 0) {
				var temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
				output.push(temp);
			}

			d = 0;
			for (var i = 1; i < 5; i++) {
				//4
				// 분단별 반복
				for (var j = 1; j < 6; j++) {
					//5
					// 세로 자리별 반복
					if (i == 1 || i == 2 || i == 3) {
						for (var j = 1; j < 6; j++) {
							divText(i, j, d, output);
							d++;
						}
					} else {
						for (var j = 1; j < 5; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
				}
			}
		});
	} else if (range == "notall") {
		// 남자
		readFile("dist/m.json", data => {
			var input = JSON.parse(data);
			var output = [];

			while (input.length > 0) {
				var temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
				output.push(temp);
			}

			d = 0;
			for (var i = 1; i < 5; i++) {
				for (var j = 1; j < 6; j++) {
					if (i == 1) {
						for (var j = 1; j < 5; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
					if (i == 3) {
						for (var j = 1; j < 6; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
				}
			}
		});

		// 여자
		readFile("dist/f.json", data => {
			var input = JSON.parse(data);
			var output = [];

			while (input.length > 0) {
				var temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
				output.push(temp);
			}

			d = 0;
			for (var i = 1; i < 5; i++) {
				for (var j = 1; j < 6; j++) {
					if (i == 2) {
						for (var j = 1; j < 6; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
					if (i == 4) {
						for (var j = 1; j < 5; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
				}
			}

			divText(1, 5, 9, output);
		});
	}
};
