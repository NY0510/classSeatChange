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

	if (i == 4 && j == 2) {
		x[0].innerText = "장세연";
		x[1].innerText = "27번";
	} else {
		x[0].innerText = data[num]["name"];
		x[1].innerText = data[num]["number"] + "번";
	}
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

function getItem(data, mode, findValue) {
	return data.filter(e => {
		if (mode == "index") return e.index == findValue;
		if (mode == "name") return e.name == findValue;
	});
}

function check(name_1, name_2) {
	let first = getItem(gettData(), "name", name_1)[0];
	let second = getItem(gettData(), "name", name_2)[0];

	let firstIndex = first.index.split("-");
	// let secondIndex = second.index.split("-");

	let checkIndex = [
		Number(firstIndex[0]) + "-" + (Number(firstIndex[1]) - 1),
		Number(firstIndex[0]) + 1 + "-" + Number(firstIndex[1]),
		Number(firstIndex[0]) + "-" + (Number(firstIndex[1]) + 1),
		Number(firstIndex[0]) - 1 + "-" + Number(firstIndex[1]),
	];

	return Boolean(checkIndex.includes(second.index));
}

function nearCheck() {
	const name = ["김채원", "서하윤", "박초연", "이은진", "김세현", "김주하"];
	let result = [];

	name.forEach(e => {
		name.forEach(f => {
			if (e == f) return;
			console.log(`${e} - ${f} : ${check(e, f)}`);
			result.push(check(e, f));
			// if (check(e, f)) {
			// 	console.log(`${e} ${f} 근처`);
			// } else {
			// 	console.log(e, f);
			// }
		});
	});

	return Boolean(result.includes(true));
}

function ifJujakMode(boolean) {
	shuffle = true;
	toggleButton.checked = shuffle;
	boolean ? document.getElementsByClassName("slider round")[0].classList.add("disabled") : document.getElementsByClassName("slider round")[0].classList.remove("disabled");
	toggleButton.disabled = boolean;
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
	for (var i = 1; i < 7; i++) {
		// 3분단
		if (i == 3 || i == 4) {
			for (var j = 1; j < 7; j++) {
				var x = document.getElementsByName(`${i}-${j}`);
				x[0].innerText = "???";
				x[1].innerText = "?";
				d++;
			}
		}
		// 나머지
		else {
			for (var j = 1; j < 6; j++) {
				var x = document.getElementsByName(`${i}-${j}`);
				x[0].innerText = "???";
				x[1].innerText = "?";
				d++;
			}
		}
	}
	resetButton.disabled = true; // 초기화버튼 비활성화
});

// 배열 안에중복된 값이 있는지 확인
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
			for (var i = 1; i < 7; i++) {
				// 분단별 반복
				for (var j = 1; j < 6; j++) {
					// 세로 자리별 반복
					if (i == 3 || i == 4) {
						for (var j = 1; j < 7; j++) {
							// 장세연
							if (i == 4 && j == 2) {
								divText(i, j, d, output);
								continue;
							}
							divText(i, j, d, output);
							d++;
						}
					} else {
						for (var j = 1; j < 6; j++) {
							divText(i, j, d, output);
							d++;
						}
					}
				}
			}
			if (jujakMode && nearCheck()) startButton.click();
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
			for (var i = 1; i < 7; i++) {
				for (var j = 1; j < 6; j++) {
					if (i % 2 == 0) {
						// 짝수일때만 (2,4,6분단)
						// 장세연
						if (i == 4 && j == 2) {
							divText(i, j, d, output);
							continue;
						}
						divText(i, j, d, output);
						d++;
					}
				}
			}
			if (jujakMode && nearCheck()) startButton.click();
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
			for (var i = 1; i < 7; i++) {
				for (var j = 1; j < 6; j++) {
					if (i % 2 != 0) {
						// 홀수일때만 (1,3,5분단)
						if (i == 3 || i == 4) {
							for (var j = 1; j < 7; j++) {
								divText(i, j, d, output);
								d++;
							}
						} else {
							for (var j = 1; j < 6; j++) {
								divText(i, j, d, output);
								d++;
							}
						}
					}
				}
			}
			// 4-6 한자리 남는거 (남자가 더 적어서)
			divText(4, 6, 16, output);

			if (jujakMode && nearCheck()) startButton.click();
		});
	}
};
