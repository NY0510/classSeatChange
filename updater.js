const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const ProgressBar = require("electron-progressbar");

autoUpdater.autoDownload = false;

module.exports = () => {
	autoUpdater.checkForUpdates();

	let progressBar;
	autoUpdater.on("update-available", () => {
		dialog
			.showMessageBox({
				type: "info",
				title: "Update available",
				message: "자리자리자리의 새 버전이 검색되었습니다\n[ 확인 ] 버튼을 눌러 지금 새 버전으로 업데이트 하세요",
				buttons: ["확인", "취소"],
			})
			.then(result => {
				const buttonIndex = result.response;

				if (buttonIndex === 0) autoUpdater.downloadUpdate();
			});
	});

	autoUpdater.once("download-progress", progressObj => {
		progressBar = new ProgressBar({
			text: "다운로드 중...",
			detail: "업데이트에 필요한 데이터를 다운로드 중입니다",
		});

		progressBar
			.on("completed", function () {
				console.info(`completed...`);
				progressBar.detail = "다운로드 완료";
			})
			.on("aborted", function () {
				console.info(`aborted...`);
			});
	});

	autoUpdater.on("update-downloaded", () => {
		progressBar.setCompleted();
		dialog
			.showMessageBox({
				type: "info",
				title: "Update ready",
				message: "다운로드가 완료되었습니다\n[ 확인 ] 버튼을 눌러 지금 새 버전을 설치하세요",
				buttons: ["확인", "취소"],
			})
			.then(result => {
				const buttonIndex = result.response;

				if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
			});
	});
};
