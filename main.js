const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const path = require("path");
const url = require("url");
const updater = require("./updater");

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		backgroundColor: "#272727",
		width: 900,
		height: 850,
		minWidth: 900,
		minHeight: 850,
		icon: path.join(__dirname, "assets", "icon.ico"),
	});
	const templete = [
		{
			label: "Edit",
			submenu: [
				{
					role: "zoomIn",
					accelerator: "CommandOrControl+=",
				},
				{
					role: "zoomOut",
				},
				{
					role: "resetZoom",
				},
				{
					role: "reload",
				},
				{
					type: "separator",
				},
				{
					id: "print",
					label: "PDF로 내보내기",
					accelerator: "CommandOrControl+P",
					click: e => {
						mainWindow.webContents.send("print", e.checked);
					},
				},
			],
		},
	];
	const newMenu = Menu.buildFromTemplate(templete);
	Menu.setApplicationMenu(newMenu);

	// mainWindow.setTitle("자리자리자리");
	const version = app.getVersion();
	mainWindow.setTitle(`자리자리자리 v${version}`);

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file:",
			slashes: true,
		})
	);
	contents = mainWindow.webContents;
	// contents.openDevTools();
};

app.on("ready", createWindow);

console.log("update start");
updater();

app.on("closed", () => {
	mainWindow = null;
});
