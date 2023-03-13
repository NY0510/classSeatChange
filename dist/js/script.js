const { ipcRenderer } = require("electron");

const resetButton = document.querySelector("#resetBtn");
const startButton = document.querySelector("#startBtn");
const toggleButton = document.querySelector("#cheakbox");

let hana = false;

window.onload = () => {
	document.getElementById("table").classList.add("transition");
	document.getElementsByClassName("top")[0].classList.add("transition");
	document.getElementsByClassName("bottom")[0].classList.add("transition");
};

ipcRenderer.on("print", (e, ...args) => {
	pdfDownload(getTableData());
});

ipcRenderer.on("hana", (e, ...args) => {
	hana = args[0];
	console.log(`hana is ${hana}`);
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
	// toggleButton.checked = shuffle;

	resetButton.disabled = true; // 초기화버튼 비활성화
	// 키 입력 이벤트 리스너
	window.addEventListener("keydown", function (e) {
		if (e.keyCode == 13 || e.keyCode == 32) startButton.click(); // enter / space
		if (e.keyCode == 8 || e.keyCode == 46) resetButton.click(); // backspace / del
	});
});

// prettier-ignore
const readFile = (a,c) => {let b=new XMLHttpRequest();b.overrideMimeType("application/json");b.open("GET",a,true);b.onreadystatechange=function(){if(b.readyState===4&&b.status=="200"){c(b.responseText)}};b.send(null)}

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

// toggleButton.addEventListener("click", function () {
// 	shuffle = !shuffle;
// 	// localStorage.setItem("shuffle", shuffle); // 로컬 DB에 토글버튼 값 저장
// });

startButton.addEventListener("click", function () {
	change("all");

	// 초기화버튼 활성화
	resetButton.disabled = false;
});

resetButton.addEventListener("click", function () {
	d = 0;
	for (let i = 1; i < 6; i++) {
		if (i != 1) {
			for (let j = 1; j < 5; j++) {
				let x = document.getElementsByName(`${i}-${j}`);
				console.log(x);
				x[0].innerText = "???";
				x[1].innerText = "?";
				d++;
				// console.log(i, j);
			}
		}
		// 나머지
		else {
			for (let j = 1; j < 6; j++) {
				let x = document.getElementsByName(`${i}-${j}`);
				console.log(x);
				x[0].innerText = "???";
				x[1].innerText = "?";
				d++;
				// console.log(i, j);
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
	readFile("dist/data.json", data => {
		let input = JSON.parse(data);
		let output = [];

		while (input.length > 0) {
			let temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
			output.push(temp);
		}

		console.log(output);

		d = 0;
		if (hana) {
			let i = 1;
			function loop() {
				setTimeout(() => {
					if (i != 1) {
						for (let j = 1; j < 5; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
					// 나머지
					else {
						for (let j = 1; j < 6; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
					i++;
					if (i < 6) loop();
				}, 500);
			}

			loop();
		} else {
			for (let i = 1; i < 6; i++) {
				if (i != 1) {
					for (let j = 1; j < 5; j++) {
						divText(i, j, d, output);
						d++;
					}
				}
				// 나머지
				else {
					for (let j = 1; j < 6; j++) {
						divText(i, j, d, output);
						d++;
					}
				}
			}
		}
	});

	// divText(1, 5, 10, output);
};
