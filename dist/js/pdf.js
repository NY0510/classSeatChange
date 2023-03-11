// function formatTime(time) {
// 	return time < 10 ? "0" + time : time;
// }
function pdfDownload(tableData) {
	let today = new Date();

	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let date = today.getDate();

	// console.log(tableData);
	pdfMake.fonts = {
		Pretendard: {
			normal: "https://raw.githubusercontent.com/orioncactus/pretendard/main/packages/pretendard/dist/public/static/alternative/Pretendard-Regular.ttf",
			bold: "https://raw.githubusercontent.com/orioncactus/pretendard/main/packages/pretendard/dist/public/static/alternative/Pretendard-Bold.ttf",
		},
	};
	const data = {
		content: [
			{ width: "*", text: "" },
			// { text: `1-4 자리 배치표 (${formatTime(month)} / ${formatTime(date)}~)`, fontSize: 19, bold: true, margin: [0, 0, 0, 5] },
			{
				style: "table",
				table: {
					body: [
						[
							{
								border: [false, false, false, true],
								text: "",
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								border: [false, false, false, true],
								text: "",
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								border: [false, false, false, true],
								text: "",
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								border: [false, false, false, true],
								text: "",
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[4],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[20],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[16],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[12],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[8],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[3],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[19],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[15],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[11],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[7],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[2],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[18],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[14],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[10],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[6],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[1],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[17],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[13],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[9],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[5],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },

							{
								text: tableData[0],
								margin: [13, 4.5],
							},
							{ text: " ", margin: [0, 7], border: [false, false, false, false] },
						],
					],
				},
			},
			{ width: "*", text: "" },
			{
				style: "table2",
				table: {
					body: [
						[
							{
								text: "교탁",
								color: "#3d3d3d",
								margin: [170, 8],
							},
						],
					],
				},
				layout: {
					hLineColor: function (i, node) {
						return "#808080";
					},
					vLineColor: function (i, node) {
						return "#808080";
					},
					hLineWidth: function (i, node) {
						return 1.5;
					},
					vLineWidth: function (i, node) {
						return 1.5;
					},
				},
			},
			{ text: `10401 김가온 개발 (자리변경 프로그램 및 배치표 자동생성)`, fontSize: 9, color: "#3d3d3d", margin: [0, 5, 0, 0] },
			{ width: "*", text: "" },
		],
		styles: {
			table: {
				fontSize: 12.5,
				margin: [0, 0, 0, 0],
				alignment: "center",
			},
			table2: {
				fontSize: 13,
				margin: [0, 15, 0, 0],
				alignment: "center",
			},
		},
		defaultStyle: {
			// alignment: "center",
			font: "Pretendard",
		},

		pageSize: "A4",
		pageOrientation: "landscape",
	};

	pdfMake.createPdf(data).download(`${year}년${month}월${date}일 자리배치도.pdf`);
	// pdfMake.createPdf(data).print();
}
