const { ipcRenderer } = require("electron");

const resetButton = document.querySelector("#resetBtn");
const startButton = document.querySelector("#startBtn");
const toggleButton = document.querySelector("#cheakbox");
var printMode = false;

window.onload = () => {
	console.log("시작");
	document.getElementById("table").classList.add("transition");
	document.getElementsByClassName("top")[0].classList.add("transition");
	document.getElementsByClassName("bottom")[0].classList.add("transition");
};

ipcRenderer.on("print", (e, ...args) => {
	console.log("ddddddddd");
	pdfDownload(getTableData());
});

// JSON.parse = string to boolean
var shuffle = JSON.parse(localStorage.getItem("shuffle")) || false;

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
function readFile(a,c){var b=new XMLHttpRequest();b.overrideMimeType("application/json");b.open("GET",a,true);b.onreadystatechange=function(){if(b.readyState===4&&b.status=="200"){c(b.responseText)}};b.send(null)}

function divText(i, j, num, data) {
	var x = document.getElementsByName(`${i}-${j}`);

	if (i == 4 && j == 2) {
		x[0].innerText = "장세연";
		x[1].innerText = "27번";
	} else {
		x[0].innerText = data[num]["name"];
		x[1].innerText = data[num]["number"] + "번";
	}
}

function getTableData() {
	const tableData = [];
	const table = document.querySelectorAll("#column");
	table.forEach(column => {
		const row = column.querySelectorAll("#item");
		row.forEach(div => {
			tableData.push(div.innerText);
		});
	});
	return tableData;
}

// toggleDiv.addEventListener("click", function () {
// 	toggleButton.click();
// });
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
function isDuplicate(arr) {
	const isDup = arr.some(function (x) {
		return arr.indexOf(x) !== arr.lastIndexOf(x);
	});
	return isDup;
}

function change(range) {
	if (range == "all") {
		readFile("dist/data.json", data => {
			var input = JSON.parse(data);
			var output = [];

			while (input.length > 0) {
				var temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
				output.push(temp);
			}
			console.log(output);

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
				console.log(d);
			}
			console.log(isDuplicate(output));
		});
		// 	d = 0;
		// 	for (var i = 1; i < 7; i++) {
		// 		// 분단별 반복
		// 		for (var j = 1; j < 6; j++) {
		// 			// 세로 자리별 반복
		// 			if (i == 3 || i == 4) {
		// 				for (var j = 1; j < 7; j++) {
		// 					// 장세연
		// 					if (i == 4 || j == 2) {
		// 						divText(i, j, d, output);
		// 						continue;
		// 					}
		// 					divText(i, j, d, output);
		// 					d++;
		// 				}
		// 			} else {
		// 				for (var j = 1; j < 6; j++) {
		// 					divText(i, j, d, output);
		// 					d++;
		// 				}
		// 			}
		// 		}
		// 	}
		// });
	} else if (range == "notall") {
		// 남자
		readFile("dist/m.json", data => {
			var input = JSON.parse(data);
			var output = [];

			while (input.length > 0) {
				var temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
				output.push(temp);
			}
			console.log(output);

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
			console.log(isDuplicate(output), " 남");
		});

		// 여자
		readFile("dist/f.json", data => {
			var input = JSON.parse(data);
			var output = [];

			while (input.length > 0) {
				var temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
				output.push(temp);
			}
			console.log(output);

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
			console.log(1111111111111111);

			console.log(isDuplicate(output), " 여");
		});
	}
}
