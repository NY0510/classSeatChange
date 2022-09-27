function formatTime(time) {
	return time < 10 ? "0" + time : time;
}

function pdfDownload(tableData) {
	let today = new Date();

	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let date = today.getDate();

	// console.log(tableData);
	pdfMake.fonts = {
		Pretendard: {
			normal: "https://file.ny64.kr/font/Pretendard-Regular.ttf",
			bold: "https://file.ny64.kr/font/Pretendard-Bold.ttf",
		},
	};
	const data = {
		content: [
			{ width: "*", text: "" },
			{ text: `3-2 자리 배치표 (${formatTime(month)} / ${formatTime(date)}~)`, fontSize: 19, bold: true, margin: [0, 0, 0, 5] },
			{
				style: "table",
				table: {
					body: [
						[
							{
								border: [false, false, false, true],
								text: "",
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[14],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[9],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[4],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[18],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[13],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[8],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[3],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[17],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[12],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[7],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[2],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[16],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[11],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[6],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[1],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },
						],
						[
							{
								text: tableData[15],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[10],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[5],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },

							{
								text: tableData[0],
								margin: [13, 2.5],
							},
							{ text: " ", margin: [4, 5], border: [false, false, false, false] },
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
								text: "교탁\n[ 남 9 / 여 10 ]",
								margin: [50, 5],
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
				},
			},
			{ text: `30218 김가온 제작 (자리변경 프로그램 및 PDF 자동생성)`, fontSize: 8, color: "#3d3d3d", margin: [0, 5, 0, 0] },
			{ width: "*", text: "" },
		],
		styles: {
			table: {
				fontSize: 12.5,
				margin: [222.5, 15, 0, 0],
				alignment: "center",
			},
			table2: {
				fontSize: 14,
				margin: [284, 15, 0, 0],
				alignment: "center",
			},
		},
		defaultStyle: {
			alignment: "center",
			font: "Pretendard",
		},

		pageSize: "A4",
		pageOrientation: "landscape",
	};

	pdfMake.createPdf(data).download(`${year}년${month}월${date}일 자리배치도.pdf`);
	// pdfMake.createPdf(data).print();
}
